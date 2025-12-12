require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5001;

// Konfiguracja emaila (można ustawić przez zmienne środowiskowe)
// Dla testów można użyć Gmail, Outlook lub innych serwisów
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false, // true dla 465, false dla innych portów
  auth: {
    user: process.env.SMTP_USER || '', // Email nadawcy
    pass: process.env.SMTP_PASS || '' // Hasło aplikacji (nie hasło do konta!)
  }
};

// Utwórz transporter email (tylko jeśli są ustawione dane)
let emailTransporter = null;
if (emailConfig.auth.user && emailConfig.auth.pass) {
  emailTransporter = nodemailer.createTransport(emailConfig);
} else {
  console.log('⚠️  Email nie jest skonfigurowany. Ustaw SMTP_USER i SMTP_PASS w zmiennych środowiskowych.');
  console.log('   Na razie linki będą wyświetlane w konsoli zamiast wysyłania emaili.');
}

// Funkcja do generowania tokenu
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Funkcja do wysyłania emaila z linkiem ustawienia hasła
async function sendPasswordSetupEmail(email, name, token) {
  // Użyj APP_URL z .env lub domyślnie localhost
  // Jeśli APP_URL nie jest ustawiony, spróbuj wykryć adres IP sieciowy
  let baseUrl = process.env.APP_URL;
  
  if (!baseUrl || baseUrl === 'http://localhost:3000') {
    // Dla lokalnego rozwoju - użyj localhost
    // W produkcji ustaw APP_URL w .env na rzeczywisty adres
    baseUrl = 'http://localhost:3000';
    
    // Jeśli chcesz użyć adresu sieciowego (działa w sieci lokalnej):
    // baseUrl = 'http://192.168.31.167:3000'; // Zmień na swój adres IP
  }
  
  const setupUrl = `${baseUrl}?token=${token}`;

  const mailOptions = {
    from: `"System Prowizji" <${emailConfig.auth.user}>`,
    to: email,
    subject: 'Ustaw hasło do konta - System Prowizji Handlowców',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #667eea;">Witaj ${name}!</h2>
        <p>Administrator utworzył dla Ciebie konto w systemie prowizji handlowców.</p>
        <p>Aby ustawić hasło i rozpocząć korzystanie z systemu, kliknij w poniższy link:</p>
        <p style="margin: 30px 0;">
          <a href="${setupUrl}" 
             style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; 
                    padding: 15px 30px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    display: inline-block;
                    font-weight: bold;">
            Ustaw Hasło
          </a>
        </p>
        <p>Lub skopiuj i wklej ten link do przeglądarki:</p>
        <p style="color: #666; word-break: break-all;">${setupUrl}</p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          Link jest ważny przez 24 godziny. Jeśli nie prosiłeś o utworzenie konta, zignoruj tę wiadomość.
        </p>
      </div>
    `,
    text: `
Witaj ${name}!

Administrator utworzył dla Ciebie konto w systemie prowizji handlowców.

Aby ustawić hasło, kliknij w poniższy link:
${setupUrl}

Link jest ważny przez 24 godziny.
    `
  };

  if (emailTransporter) {
    try {
      const info = await emailTransporter.sendMail(mailOptions);
      console.log(`✅ Email wysłany do: ${email}`);
      console.log(`   Link: ${setupUrl}`);
      console.log(`   Message ID: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error('❌ Błąd wysyłania emaila:', error.message);
      console.error('   Pełny błąd:', error);
      console.error('   Sprawdź konfigurację SMTP w pliku .env');
      console.log('\n📧 LINK DO WYSŁANIA RĘCZNIE:');
      console.log(`   Do: ${email}`);
      console.log(`   Link: ${setupUrl}\n`);
      return false;
    }
  } else {
    // Jeśli email nie jest skonfigurowany, wyświetl link w konsoli
    console.log('\n📧 EMAIL NIE SKONFIGUROWANY - LINK DO WYSŁANIA:');
    console.log(`   Do: ${email}`);
    console.log(`   Temat: Ustaw hasło do konta`);
    console.log(`   Link: ${setupUrl}`);
    console.log(`\n   💡 Aby automatycznie wysyłać emaile, skonfiguruj SMTP w pliku server/.env\n`);
    return true;
  }
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Inicjalizacja bazy danych
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Tworzenie tabel
db.serialize(() => {
  // Tabela handlowców
  db.run(`CREATE TABLE IF NOT EXISTS salespeople (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    commission_rate REAL DEFAULT 0.1,
    password_hash TEXT
  )`, (err) => {
    if (err) {
      console.error('Błąd tworzenia tabeli salespeople:', err);
    } else {
      // Sprawdź czy kolumna password_hash istnieje, jeśli nie - dodaj ją
      db.all("PRAGMA table_info(salespeople)", (err, columns) => {
        if (!err && columns) {
          const hasPasswordHash = columns.some(col => col.name === 'password_hash');
          const hasManagerId = columns.some(col => col.name === 'manager_id');
          const hasDirectorBonus = columns.some(col => col.name === 'director_bonus');
          
          if (!hasPasswordHash) {
            console.log('📝 Dodaję kolumnę password_hash do tabeli salespeople...');
            db.run("ALTER TABLE salespeople ADD COLUMN password_hash TEXT", (alterErr) => {
              if (alterErr) {
                console.error('❌ Błąd dodawania kolumny password_hash:', alterErr);
              } else {
                console.log('✅ Kolumna password_hash dodana pomyślnie');
              }
            });
          }
          
          if (!hasManagerId) {
            console.log('📝 Dodaję kolumnę manager_id do tabeli salespeople...');
            db.run("ALTER TABLE salespeople ADD COLUMN manager_id INTEGER", (alterErr) => {
              if (alterErr) {
                console.error('❌ Błąd dodawania kolumny manager_id:', alterErr);
              } else {
                console.log('✅ Kolumna manager_id dodana pomyślnie');
              }
            });
          }
          
          if (!hasDirectorBonus) {
            console.log('📝 Dodaję kolumnę director_bonus do tabeli salespeople...');
            db.run("ALTER TABLE salespeople ADD COLUMN director_bonus INTEGER DEFAULT 0", (alterErr) => {
              if (alterErr) {
                console.error('❌ Błąd dodawania kolumny director_bonus:', alterErr);
              } else {
                console.log('✅ Kolumna director_bonus dodana pomyślnie');
              }
            });
          }
        }
      });
    }
  });

  // Tabela tokenów do ustawiania hasła
  db.run(`CREATE TABLE IF NOT EXISTS password_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    salesperson_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TEXT NOT NULL,
    used INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (salesperson_id) REFERENCES salespeople(id)
  )`);

  // Tabela administratorów
  db.run(`CREATE TABLE IF NOT EXISTS administrators (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabela umów
  db.run(`CREATE TABLE IF NOT EXISTS contracts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    salesperson_id INTEGER NOT NULL,
    client_name TEXT NOT NULL,
    contract_value REAL NOT NULL,
    commission_rate REAL,
    status TEXT DEFAULT 'signed',
    signed_date TEXT,
    paid_date TEXT,
    processed_date TEXT,
    salesperson_notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (salesperson_id) REFERENCES salespeople(id)
  )`);

  // Dodaj przykładowych handlowców jeśli baza jest pusta
  db.get("SELECT COUNT(*) as count FROM salespeople", (err, row) => {
    if (row.count === 0) {
      db.run(`INSERT INTO salespeople (name, email, commission_rate) VALUES 
        ('Jan Kowalski', 'jan.kowalski@firma.pl', 0.15),
        ('Anna Nowak', 'anna.nowak@firma.pl', 0.12),
        ('Piotr Wiśniewski', 'piotr.wisniewski@firma.pl', 0.10)`);
    }
  });

  // Dodaj przykładowe umowy jeśli baza jest pusta
  db.get("SELECT COUNT(*) as count FROM contracts", (err, row) => {
    if (row.count === 0) {
      const today = new Date().toISOString().split('T')[0];
      db.run(`INSERT INTO contracts (salesperson_id, client_name, contract_value, commission_rate, status, signed_date, paid_date, processed_date) VALUES 
        (1, 'Firma ABC Sp. z o.o.', 50000, 0.15, 'processed', '2024-01-15', '2024-01-20', '2024-01-25'),
        (1, 'XYZ Corporation', 75000, 0.15, 'paid', '2024-02-01', '2024-02-10', NULL),
        (2, 'Tech Solutions Ltd', 30000, 0.12, 'signed', '2024-02-15', NULL, NULL),
        (2, 'Global Industries', 100000, 0.12, 'processed', '2024-01-10', '2024-01-15', '2024-01-20'),
        (3, 'Startup Inc', 25000, 0.10, 'paid', '2024-02-20', '2024-02-25', NULL)`);
    }
  });

  // Utwórz konto administratora dla grzegorz.furmann@gmail.com jeśli nie istnieje
  db.get("SELECT * FROM administrators WHERE email = ?", ['grzegorz.furmann@gmail.com'], (err, existing) => {
    if (err) {
      console.error('Błąd sprawdzania konta administratora:', err);
      return;
    }
    
    if (!existing) {
      // Domyślne hasło: Admin123! (można zmienić później)
      const defaultPassword = 'Admin123!';
      bcrypt.hash(defaultPassword, 10, (err, hash) => {
        if (err) {
          console.error('❌ Błąd hashowania hasła:', err);
          return;
        }
        db.run(
          `INSERT INTO administrators (email, password_hash, name) VALUES (?, ?, ?)`,
          ['grzegorz.furmann@gmail.com', hash, 'Grzegorz Furmann'],
          function(err) {
            if (err) {
              console.error('❌ Błąd tworzenia konta administratora:', err);
            } else {
              console.log('✅ Utworzono konto administratora dla: grzegorz.furmann@gmail.com');
              console.log('🔑 Domyślne hasło: Admin123!');
              console.log('⚠️  Pamiętaj, aby zmienić hasło po pierwszym logowaniu!');
            }
          }
        );
      });
    } else {
      console.log('ℹ️  Konto administratora już istnieje: grzegorz.furmann@gmail.com');
    }
  });
});

// API Endpoints

// Uniwersalne logowanie - dla administratorów i handlowców
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email) {
    res.status(400).json({ error: 'Email jest wymagany' });
    return;
  }
  
  // Najpierw sprawdź czy to administrator
  db.get("SELECT * FROM administrators WHERE email = ?", [email], async (err, admin) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (admin) {
      // To administrator - wymaga hasła
      if (!password) {
        res.status(400).json({ error: 'Hasło jest wymagane dla administratora' });
        return;
      }
      
      try {
        const isValid = await bcrypt.compare(password, admin.password_hash);
        if (!isValid) {
          res.status(401).json({ error: 'Nieprawidłowy email lub hasło' });
          return;
        }
        
        // Zwróć dane administratora (bez hasła)
        res.json({
          id: admin.id,
          email: admin.email,
          name: admin.name,
          type: 'admin'
        });
      } catch (error) {
        res.status(500).json({ error: 'Błąd podczas weryfikacji hasła' });
      }
      return;
    }
    
    // Jeśli nie administrator, sprawdź czy to handlowiec
    db.get("SELECT * FROM salespeople WHERE email = ? AND email IS NOT NULL AND email != ''", [email], async (err, salesperson) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      if (!salesperson) {
        res.status(401).json({ error: 'Nieprawidłowy email lub konto nie istnieje' });
        return;
      }
      
      // Handlowiec - wymaga hasła jeśli zostało ustawione
      if (salesperson.password_hash) {
        if (!password) {
          res.status(400).json({ error: 'Hasło jest wymagane' });
          return;
        }
        
        try {
          const isValid = await bcrypt.compare(password, salesperson.password_hash);
          if (!isValid) {
            res.status(401).json({ error: 'Nieprawidłowy email lub hasło' });
            return;
          }
        } catch (error) {
          res.status(500).json({ error: 'Błąd podczas weryfikacji hasła' });
          return;
        }
      } else {
        // Jeśli handlowiec nie ma hasła, informuj że musi je ustawić
        res.status(401).json({ 
          error: 'Musisz najpierw ustawić hasło. Sprawdź email z linkiem do ustawienia hasła.' 
        });
        return;
      }
      
      res.json({
        id: salesperson.id,
        email: salesperson.email,
        name: salesperson.name,
        commission_rate: salesperson.commission_rate,
        type: 'salesperson',
        salesperson: salesperson
      });
    });
  });
});

// Logowanie administratora (zachowane dla kompatybilności)
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ error: 'Email i hasło są wymagane' });
    return;
  }
  
  db.get("SELECT * FROM administrators WHERE email = ?", [email], async (err, admin) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!admin) {
      res.status(401).json({ error: 'Nieprawidłowy email lub hasło' });
      return;
    }
    
    try {
      const isValid = await bcrypt.compare(password, admin.password_hash);
      if (!isValid) {
        res.status(401).json({ error: 'Nieprawidłowy email lub hasło' });
        return;
      }
      
      // Zwróć dane administratora (bez hasła)
      res.json({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        type: 'admin'
      });
    } catch (error) {
      res.status(500).json({ error: 'Błąd podczas weryfikacji hasła' });
    }
  });
});

// Utwórz nowe konto administratora
app.post('/api/admin/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ error: 'Email i hasło są wymagane' });
    return;
  }
  
  // Sprawdź czy email już istnieje
  db.get("SELECT id FROM administrators WHERE email = ?", [email], async (err, existing) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (existing) {
      res.status(400).json({ error: 'Konto z tym emailem już istnieje' });
      return;
    }
    
    try {
      const hash = await bcrypt.hash(password, 10);
      db.run(
        `INSERT INTO administrators (email, password_hash, name) VALUES (?, ?, ?)`,
        [email, hash, name || null],
        function(insertErr) {
          if (insertErr) {
            res.status(500).json({ error: insertErr.message });
            return;
          }
          res.json({
            id: this.lastID,
            email: email,
            name: name,
            message: 'Konto administratora utworzone pomyślnie'
          });
        }
      );
    } catch (error) {
      res.status(500).json({ error: 'Błąd podczas tworzenia konta' });
    }
  });
});

// Zmiana hasła administratora
app.put('/api/admin/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  
  if (!email || !oldPassword || !newPassword) {
    res.status(400).json({ error: 'Wszystkie pola są wymagane' });
    return;
  }
  
  if (newPassword.length < 6) {
    res.status(400).json({ error: 'Nowe hasło musi mieć co najmniej 6 znaków' });
    return;
  }
  
  db.get("SELECT * FROM administrators WHERE email = ?", [email], async (err, admin) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!admin) {
      res.status(404).json({ error: 'Administrator nie znaleziony' });
      return;
    }
    
    try {
      const isValid = await bcrypt.compare(oldPassword, admin.password_hash);
      if (!isValid) {
        res.status(401).json({ error: 'Nieprawidłowe stare hasło' });
        return;
      }
      
      const newHash = await bcrypt.hash(newPassword, 10);
      db.run(
        "UPDATE administrators SET password_hash = ? WHERE email = ?",
        [newHash, email],
        function(updateErr) {
          if (updateErr) {
            res.status(500).json({ error: updateErr.message });
            return;
          }
          res.json({ message: 'Hasło zostało zmienione pomyślnie' });
        }
      );
    } catch (error) {
      res.status(500).json({ error: 'Błąd podczas zmiany hasła' });
    }
  });
});

// Pobierz wszystkich handlowców
app.get('/api/salespeople', (req, res) => {
  db.all(`
    SELECT s.*, 
           m.name as manager_name 
    FROM salespeople s 
    LEFT JOIN salespeople m ON s.manager_id = m.id 
    ORDER BY s.name
  `, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Utwórz nowego handlowca
app.post('/api/salespeople', async (req, res) => {
  const { name, email, commission_rate, manager_id, director_bonus } = req.body;
  
  if (!name) {
    res.status(400).json({ error: 'Imię i nazwisko są wymagane' });
    return;
  }
  
  if (!email) {
    res.status(400).json({ error: 'Email jest wymagany' });
    return;
  }
  
  // Sprawdź czy email już istnieje
  db.get("SELECT id FROM salespeople WHERE email = ?", [email], async (err, existing) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (existing) {
      res.status(400).json({ error: 'Handlowiec z tym emailem już istnieje' });
      return;
    }
    
    const rate = commission_rate || 0.1;
    const managerId = manager_id ? parseInt(manager_id) : null;
    const hasDirectorBonus = director_bonus === true || director_bonus === 'true' ? 1 : 0;
    
    db.run(
      `INSERT INTO salespeople (name, email, commission_rate, manager_id, director_bonus) VALUES (?, ?, ?, ?, ?)`,
      [name, email, rate, managerId, hasDirectorBonus],
      async function(insertErr) {
        if (insertErr) {
          res.status(500).json({ error: insertErr.message });
          return;
        }
        
        const salespersonId = this.lastID;
        
        // Generuj token do ustawienia hasła
        const token = generateToken();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24); // Token ważny 24 godziny
        
        // Zapisz token w bazie
        db.run(
          `INSERT INTO password_tokens (salesperson_id, token, expires_at) VALUES (?, ?, ?)`,
          [salespersonId, token, expiresAt.toISOString()],
          async (tokenErr) => {
            if (tokenErr) {
              console.error('Błąd zapisywania tokenu:', tokenErr);
              // Kontynuuj nawet jeśli token nie został zapisany
            }
            
            // Wyślij email z linkiem
            const emailSent = await sendPasswordSetupEmail(email, name, token);
            
            let message = 'Handlowiec utworzony pomyślnie. ';
            if (emailSent && emailTransporter) {
              message += 'Email z linkiem do ustawienia hasła został wysłany na adres: ' + email;
            } else if (emailSent) {
              message += 'Link do ustawienia hasła został wygenerowany - sprawdź konsolę serwera.';
            } else {
              message += 'Wystąpił błąd podczas wysyłania emaila - sprawdź konsolę serwera dla linku.';
            }
            
            res.json({
              id: salespersonId,
              name: name,
              email: email,
              commission_rate: rate,
              message: message,
              emailSent: emailSent && emailTransporter ? true : false
            });
          }
        );
      }
    );
  });
});

// Aktualizuj handlowca
app.put('/api/salespeople/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, commission_rate, manager_id, director_bonus } = req.body;
  
  if (!name) {
    res.status(400).json({ error: 'Imię i nazwisko są wymagane' });
    return;
  }
  
  if (!email) {
    res.status(400).json({ error: 'Email jest wymagany' });
    return;
  }
  
  // Sprawdź czy email nie jest używany przez innego handlowca
  db.get("SELECT id FROM salespeople WHERE email = ? AND id != ?", [email, id], (err, existing) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (existing) {
      res.status(400).json({ error: 'Email jest już używany przez innego handlowca' });
      return;
    }
    
    const rate = commission_rate || 0.1;
    const managerId = manager_id ? parseInt(manager_id) : null;
    const hasDirectorBonus = director_bonus === true || director_bonus === 'true' ? 1 : 0;
    
    db.run(
      "UPDATE salespeople SET name = ?, email = ?, commission_rate = ?, manager_id = ?, director_bonus = ? WHERE id = ?",
      [name, email, rate, managerId, hasDirectorBonus, id],
      function(updateErr) {
        if (updateErr) {
          res.status(500).json({ error: updateErr.message });
          return;
        }
        res.json({ message: 'Handlowiec zaktualizowany pomyślnie' });
      }
    );
  });
});

// Usuń handlowca
app.delete('/api/salespeople/:id', (req, res) => {
  const { id } = req.params;
  
  // Sprawdź czy handlowiec ma umowy
  db.get("SELECT COUNT(*) as count FROM contracts WHERE salesperson_id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (row.count > 0) {
      res.status(400).json({ error: 'Nie można usunąć handlowca, który ma przypisane umowy' });
      return;
    }
    
    db.run("DELETE FROM salespeople WHERE id = ?", [id], function(deleteErr) {
      if (deleteErr) {
        res.status(500).json({ error: deleteErr.message });
        return;
      }
      res.json({ message: 'Handlowiec usunięty pomyślnie' });
    });
  });
});

// Funkcja pomocnicza do pobrania wszystkich podwładnych (rekurencyjnie)
const getAllSubordinates = (managerId, callback) => {
  db.all(
    `SELECT id FROM salespeople WHERE manager_id = ?`,
    [managerId],
    (err, directSubordinates) => {
      if (err) {
        callback([managerId]);
        return;
      }
      
      if (!directSubordinates || directSubordinates.length === 0) {
        callback([managerId]);
        return;
      }
      
      const allIds = [managerId];
      let processed = 0;
      const total = directSubordinates.length;
      
      if (total === 0) {
        callback(allIds);
        return;
      }
      
      directSubordinates.forEach((sub) => {
        getAllSubordinates(sub.id, (subIds) => {
          // Dodaj ID podwładnego i wszystkich jego podwładnych
          allIds.push(sub.id);
          subIds.forEach(id => {
            if (id !== sub.id) { // Unikaj duplikatów
              allIds.push(id);
            }
          });
          
          processed++;
          if (processed === total) {
            // Usuń duplikaty i zwróć
            const uniqueIds = [...new Set(allIds)];
            callback(uniqueIds);
          }
        });
      });
    }
  );
};

// Pobierz umowy dla konkretnego handlowca (włącznie z umowami podwładnych)
app.get('/api/salespeople/:id/contracts', (req, res) => {
  const salespersonId = req.params.id;
  
  // Pobierz wszystkich podwładnych (rekurencyjnie)
  getAllSubordinates(salespersonId, (allSubordinateIds) => {
    // Utwórz placeholdery dla zapytania SQL
    const placeholders = allSubordinateIds.map(() => '?').join(',');
    
    db.all(
      `SELECT c.*, 
              COALESCE(c.commission_rate, s.commission_rate) as commission_rate,
              s.id as salesperson_id,
              s.name as salesperson_name,
              CASE 
                WHEN c.salesperson_id = ? THEN 0 
                ELSE 1 
              END as is_subordinate_contract
       FROM contracts c
       JOIN salespeople s ON c.salesperson_id = s.id
       WHERE c.salesperson_id IN (${placeholders})
       ORDER BY is_subordinate_contract ASC, c.created_at DESC`,
      [salespersonId, ...allSubordinateIds],
      (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
      }
    );
  });
});

// Pobierz statystyki prowizji dla handlowca
app.get('/api/salespeople/:id/commission', (req, res) => {
  const salespersonId = req.params.id;
  
  // Pobierz dane handlowca (nadprowizja dyrektorska i poziom prowizyjny)
  db.get("SELECT director_bonus, commission_rate FROM salespeople WHERE id = ?", [salespersonId], (err, salesperson) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!salesperson) {
      res.status(404).json({ error: 'Handlowiec nie znaleziony' });
      return;
    }
    
    const hasDirectorBonus = salesperson.director_bonus === 1;
    const managerCommissionRate = salesperson.commission_rate || 0.1;
    const DIRECTOR_BONUS_AMOUNT = 3000;
    
    db.all(
      `SELECT 
        status,
        COUNT(*) as count,
        SUM(contract_value) as total_value,
        SUM(contract_value * COALESCE(commission_rate, (SELECT commission_rate FROM salespeople WHERE id = ?))) as total_commission
       FROM contracts 
       WHERE salesperson_id = ?
       GROUP BY status`,
      [salespersonId, salespersonId],
      (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        
        // Funkcja do obliczenia prowizji z różnicy poziomów dla managera (rekurencyjnie dla wszystkich podwładnych)
        // Zwraca obiekt z prowizją podzieloną na statusy
        const calculateManagerDifferenceCommission = (callback) => {
          // Pobierz wszystkich podwładnych rekurencyjnie
          getAllSubordinates(salespersonId, (allSubordinateIds) => {
            // Usuń ID managera z listy (chcemy tylko podwładnych)
            const subordinateIds = allSubordinateIds.filter(id => id !== salespersonId);
            
            if (subordinateIds.length === 0) {
              callback({
                signed: 0,
                paid: 0,
                processed: 0,
                paid_out: 0,
                dropped: 0,
                total: 0
              });
              return;
            }
            
            // Pobierz dane wszystkich podwładnych (poziomy prowizyjne)
            const placeholders = subordinateIds.map(() => '?').join(',');
            db.all(
              `SELECT id, commission_rate, name 
               FROM salespeople 
               WHERE id IN (${placeholders})`,
              subordinateIds,
              (err, subordinates) => {
                if (err || !subordinates || subordinates.length === 0) {
                  callback({
                    signed: 0,
                    paid: 0,
                    processed: 0,
                    paid_out: 0,
                    dropped: 0,
                    total: 0
                  });
                  return;
                }
                
                // Obiekt do przechowywania prowizji z różnicy poziomów podzielonej na statusy
                const managerDifferenceByStatus = {
                  signed: 0,
                  paid: 0,
                  processed: 0,
                  paid_out: 0,
                  dropped: 0,
                  total: 0
                };
                
                let processedCount = 0;
                const totalSubordinates = subordinates.length;
                
                // Dla każdego podwładnego oblicz różnicę prowizji
                subordinates.forEach((subordinate) => {
                  const subordinateRate = subordinate.commission_rate || 0.1;
                  
                  // Oblicz różnicę (tylko jeśli manager ma wyższy poziom niż podwładny)
                  // Podwładny nie może mieć wyższego poziomu niż manager
                  if (managerCommissionRate > subordinateRate) {
                    const rateDifference = managerCommissionRate - subordinateRate;
                    
                    // Pobierz wszystkie umowy podwładnego z podziałem na statusy
                    db.all(
                      `SELECT status, 
                              SUM(contract_value) as total_value,
                              COUNT(*) as count
                       FROM contracts 
                       WHERE salesperson_id = ?
                       GROUP BY status`,
                      [subordinate.id],
                      (err, subordinateContractsByStatus) => {
                        processedCount++;
                        
                        if (!err && subordinateContractsByStatus) {
                          subordinateContractsByStatus.forEach(row => {
                            // Oblicz prowizję managera jako różnicę poziomów dla każdego statusu
                            const commissionForStatus = (row.total_value || 0) * rateDifference;
                            const status = row.status || 'signed';
                            
                            // Dodaj do odpowiedniego statusu
                            if (managerDifferenceByStatus.hasOwnProperty(status)) {
                              managerDifferenceByStatus[status] += commissionForStatus;
                            } else {
                              managerDifferenceByStatus.signed += commissionForStatus; // Domyślnie signed
                            }
                            managerDifferenceByStatus.total += commissionForStatus;
                          });
                        }
                        
                        // Po przetworzeniu wszystkich podwładnych, wywołaj callback
                        if (processedCount === totalSubordinates) {
                          console.log(`[DEBUG] Prowizja z różnicy poziomów dla managera ${salespersonId}:`, managerDifferenceByStatus);
                          callback(managerDifferenceByStatus);
                        }
                      }
                    );
                  } else {
                    // Jeśli manager ma niższy lub równy poziom niż podwładny, nie ma różnicy
                    processedCount++;
                    if (processedCount === totalSubordinates) {
                      callback(managerDifferenceByStatus);
                    }
                  }
                });
                
                // Jeśli nie ma podwładnych, zwróć pusty obiekt
                if (subordinates.length === 0) {
                  callback(managerDifferenceByStatus);
                }
              }
            );
          });
        };
        
        // Oblicz nadprowizję dyrektorską dla umów tego handlowca (podzieloną na statusy)
        if (hasDirectorBonus) {
          // Pobierz własne umowy z podziałem na statusy
          db.all(
            `SELECT status, COUNT(*) as count 
             FROM contracts 
             WHERE salesperson_id = ?
             GROUP BY status`,
            [salespersonId],
            (err, ownContractsByStatus) => {
              // Oblicz nadprowizję dyrektorską dla własnych umów podzieloną na statusy
              const directorBonusByStatusOwn = {
                signed: 0,
                paid: 0,
                processed: 0,
                paid_out: 0,
                dropped: 0
              };
              
              if (!err && ownContractsByStatus) {
                ownContractsByStatus.forEach(row => {
                  const status = row.status || 'signed';
                  const bonus = row.count * DIRECTOR_BONUS_AMOUNT;
                  if (directorBonusByStatusOwn.hasOwnProperty(status)) {
                    directorBonusByStatusOwn[status] += bonus;
                  } else {
                    directorBonusByStatusOwn.signed += bonus;
                  }
                });
              }
              
              // Oblicz nadprowizję dyrektorską dla umów handlowców w zespole (rekurencyjnie)
              getAllSubordinates(salespersonId, (allSubordinateIds) => {
                // Usuń ID managera z listy (chcemy tylko podwładnych)
                const subordinateIds = allSubordinateIds.filter(id => id !== salespersonId);
                
                if (subordinateIds.length === 0) {
                  // Brak podwładnych
                  const directorBonusByStatusTeam = {
                    signed: 0,
                    paid: 0,
                    processed: 0,
                    paid_out: 0,
                    dropped: 0
                  };
                  
                  // Oblicz prowizję z różnicy poziomów dla managera
                  calculateManagerDifferenceCommission((managerDifferenceByStatus) => {
                    // Oblicz całkowitą prowizję
                    let totalCommission = 0;
                    let totalValue = 0;
                    const stats = {
                      signed: { count: 0, value: 0, commission: 0 },
                      paid: { count: 0, value: 0, commission: 0 },
                      processed: { count: 0, value: 0, commission: 0 },
                      paid_out: { count: 0, value: 0, commission: 0 },
                      dropped: { count: 0, value: 0, commission: 0 },
                      total: { count: 0, value: 0, commission: 0 }
                    };
                    
                    // Najpierw przetwórz własne umowy
                    rows.forEach(row => {
                      const status = row.status || 'signed';
                      // Dodaj prowizję z własnych umów
                      stats[status] = {
                        count: row.count,
                        value: row.total_value,
                        commission: row.total_commission
                      };
                      totalValue += row.total_value || 0;
                    });
                    
                    // Teraz dodaj nadprowizje i prowizje z różnicy poziomów do wszystkich statusów
                    const allStatuses = ['signed', 'paid', 'processed', 'paid_out', 'dropped'];
                    allStatuses.forEach(status => {
                      // Inicjalizuj status jeśli nie istnieje
                      if (!stats[status]) {
                        stats[status] = { count: 0, value: 0, commission: 0 };
                      }
                      
                      // Dodaj nadprowizję dyrektorską dla tego statusu (własne umowy)
                      stats[status].commission += directorBonusByStatusOwn[status] || 0;
                      // Dodaj nadprowizję dyrektorską dla tego statusu (umowy zespołu)
                      stats[status].commission += directorBonusByStatusTeam[status] || 0;
                      // Dodaj prowizję z różnicy poziomów dla tego statusu
                      if (managerDifferenceByStatus.hasOwnProperty(status)) {
                        stats[status].commission += managerDifferenceByStatus[status];
                      }
                      
                      // Dodaj do całkowitej prowizji
                      totalCommission += stats[status].commission || 0;
                    });
                    
                    // Pobierz wszystkie umowy do obliczenia total count
                    db.get(
                      "SELECT COUNT(*) as count FROM contracts WHERE salesperson_id = ?",
                      [salespersonId],
                      (err, countRow) => {
                        stats.total = {
                          count: countRow.count,
                          value: totalValue,
                          commission: totalCommission
                        };
                        res.json(stats);
                      }
                    );
                  });
                  return;
                }
                
                // Pobierz umowy wszystkich podwładnych z podziałem na statusy
                const placeholders = subordinateIds.map(() => '?').join(',');
                db.all(
                  `SELECT status, COUNT(*) as count 
                   FROM contracts 
                   WHERE salesperson_id IN (${placeholders})
                   GROUP BY status`,
                  subordinateIds,
                  (err, teamContractsByStatus) => {
                    // Oblicz nadprowizję dyrektorską dla umów zespołu podzieloną na statusy
                    const directorBonusByStatusTeam = {
                      signed: 0,
                      paid: 0,
                      processed: 0,
                      paid_out: 0,
                      dropped: 0
                    };
                    
                    if (!err && teamContractsByStatus) {
                      teamContractsByStatus.forEach(row => {
                        const status = row.status || 'signed';
                        const bonus = row.count * DIRECTOR_BONUS_AMOUNT;
                        if (directorBonusByStatusTeam.hasOwnProperty(status)) {
                          directorBonusByStatusTeam[status] += bonus;
                        } else {
                          directorBonusByStatusTeam.signed += bonus;
                        }
                      });
                    }
                  
                    // Oblicz prowizję z różnicy poziomów dla managera
                    calculateManagerDifferenceCommission((managerDifferenceByStatus) => {
                      // Oblicz całkowitą prowizję
                      let totalCommission = 0;
                      let totalValue = 0;
                      const stats = {
                        signed: { count: 0, value: 0, commission: 0 },
                        paid: { count: 0, value: 0, commission: 0 },
                        processed: { count: 0, value: 0, commission: 0 },
                        paid_out: { count: 0, value: 0, commission: 0 },
                        dropped: { count: 0, value: 0, commission: 0 },
                        total: { count: 0, value: 0, commission: 0 }
                      };
                    
                      // Najpierw przetwórz własne umowy
                      rows.forEach(row => {
                        const status = row.status || 'signed';
                        // Dodaj prowizję z własnych umów
                        stats[status] = {
                          count: row.count,
                          value: row.total_value,
                          commission: row.total_commission
                        };
                        totalValue += row.total_value || 0;
                      });
                      
                      // Teraz dodaj nadprowizje i prowizje z różnicy poziomów do wszystkich statusów
                      const allStatuses = ['signed', 'paid', 'processed', 'paid_out', 'dropped'];
                      allStatuses.forEach(status => {
                        // Inicjalizuj status jeśli nie istnieje
                        if (!stats[status]) {
                          stats[status] = { count: 0, value: 0, commission: 0 };
                        }
                        
                        // Dodaj nadprowizję dyrektorską dla tego statusu (własne umowy)
                        stats[status].commission += directorBonusByStatusOwn[status] || 0;
                        // Dodaj nadprowizję dyrektorską dla tego statusu (umowy zespołu)
                        stats[status].commission += directorBonusByStatusTeam[status] || 0;
                        // Dodaj prowizję z różnicy poziomów dla tego statusu
                        if (managerDifferenceByStatus.hasOwnProperty(status)) {
                          stats[status].commission += managerDifferenceByStatus[status];
                        }
                        
                        // Dodaj do całkowitej prowizji
                        totalCommission += stats[status].commission || 0;
                      });
                      
                      // Pobierz wszystkie umowy do obliczenia total count
                      db.get(
                        "SELECT COUNT(*) as count FROM contracts WHERE salesperson_id = ?",
                        [salespersonId],
                        (err, countRow) => {
                          stats.total = {
                            count: countRow.count,
                            value: totalValue,
                            commission: totalCommission
                          };
                          res.json(stats);
                        }
                      );
                    });
                  }
                );
              }
            );
          });
        } else {
          // Brak nadprowizji dyrektorskiej - ale może być prowizja z różnicy poziomów
          calculateManagerDifferenceCommission((managerDifferenceByStatus) => {
            let totalCommission = 0;
            let totalValue = 0;
            const stats = {
              signed: { count: 0, value: 0, commission: 0 },
              paid: { count: 0, value: 0, commission: 0 },
              processed: { count: 0, value: 0, commission: 0 },
              paid_out: { count: 0, value: 0, commission: 0 },
              dropped: { count: 0, value: 0, commission: 0 },
              total: { count: 0, value: 0, commission: 0 }
            };
            
            rows.forEach(row => {
              const status = row.status || 'signed';
              // Dodaj prowizję z własnych umów
              stats[status] = {
                count: row.count,
                value: row.total_value,
                commission: row.total_commission
              };
              // Dodaj prowizję z umów podwładnych dla tego statusu
              if (managerDifferenceByStatus.hasOwnProperty(status)) {
                stats[status].commission += managerDifferenceByStatus[status];
              }
              totalCommission += stats[status].commission || 0;
              totalValue += row.total_value || 0;
            });
            
            db.get(
              "SELECT COUNT(*) as count FROM contracts WHERE salesperson_id = ?",
              [salespersonId],
              (err, countRow) => {
                stats.total = {
                  count: countRow.count,
                  value: totalValue,
                  commission: totalCommission
                };
                res.json(stats);
              }
            );
          });
        }
      }
    );
  });
});

// Pobierz wszystkie umowy (dla admina)
app.get('/api/contracts', (req, res) => {
  db.all(
    `SELECT c.*, 
            s.name as salesperson_name, 
            s.email as salesperson_email,
            COALESCE(c.commission_rate, s.commission_rate) as commission_rate
     FROM contracts c
     JOIN salespeople s ON c.salesperson_id = s.id
     ORDER BY c.created_at DESC`,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

// Dodaj nową umowę
app.post('/api/contracts', (req, res) => {
  const { salesperson_id, client_name, contract_value, commission_rate, signed_date } = req.body;
  
  if (!salesperson_id || !client_name || !contract_value) {
    res.status(400).json({ error: 'Brakuje wymaganych pól' });
    return;
  }
  
  const date = signed_date || new Date().toISOString().split('T')[0];
  
  // Jeśli nie podano commission_rate, pobierz stawkę z profilu handlowca
  if (commission_rate) {
    // Użyj podanej stawki
    db.run(
      `INSERT INTO contracts (salesperson_id, client_name, contract_value, commission_rate, status, signed_date)
       VALUES (?, ?, ?, ?, 'signed', ?)`,
      [salesperson_id, client_name, contract_value, commission_rate, date],
      function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ id: this.lastID, message: 'Umowa dodana pomyślnie' });
      }
    );
  } else {
    // Pobierz stawkę z profilu handlowca
    db.get("SELECT commission_rate FROM salespeople WHERE id = ?", [salesperson_id], (err, salesperson) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      if (!salesperson) {
        res.status(400).json({ error: 'Handlowiec nie znaleziony' });
        return;
      }
      
      const rate = salesperson.commission_rate || 0.1;
      
      db.run(
        `INSERT INTO contracts (salesperson_id, client_name, contract_value, commission_rate, status, signed_date)
         VALUES (?, ?, ?, ?, 'signed', ?)`,
        [salesperson_id, client_name, contract_value, rate, date],
        function(insertErr) {
          if (insertErr) {
            res.status(500).json({ error: insertErr.message });
            return;
          }
          res.json({ id: this.lastID, message: 'Umowa dodana pomyślnie' });
        }
      );
    });
  }
});

// Aktualizuj status umowy (tylko dla admina)
app.put('/api/contracts/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, paid_date, processed_date } = req.body;
  
  let updateQuery = "UPDATE contracts SET status = ?";
  let params = [status];
  
  if (status === 'paid' && paid_date) {
    updateQuery += ", paid_date = ?";
    params.push(paid_date);
  } else if (status === 'paid' && !paid_date) {
    updateQuery += ", paid_date = ?";
    params.push(new Date().toISOString().split('T')[0]);
  }
  
  if (status === 'processed' && processed_date) {
    updateQuery += ", processed_date = ?";
    params.push(processed_date);
  } else if (status === 'processed' && !processed_date) {
    updateQuery += ", processed_date = ?";
    params.push(new Date().toISOString().split('T')[0]);
  }
  
  updateQuery += " WHERE id = ?";
  params.push(id);
  
  db.run(updateQuery, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Status umowy zaktualizowany pomyślnie' });
  });
});

// Aktualizuj notatki handlowca (tylko dla handlowca)
app.put('/api/contracts/:id/notes', (req, res) => {
  const { id } = req.params;
  const { salesperson_notes, salesperson_id } = req.body;
  
  // Sprawdź czy umowa należy do tego handlowca
  db.get("SELECT salesperson_id FROM contracts WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!row) {
      res.status(404).json({ error: 'Umowa nie znaleziona' });
      return;
    }
    
    if (row.salesperson_id !== salesperson_id) {
      res.status(403).json({ error: 'Brak uprawnień do edycji tej umowy' });
      return;
    }
    
    db.run(
      "UPDATE contracts SET salesperson_notes = ? WHERE id = ?",
      [salesperson_notes || '', id],
      function(updateErr) {
        if (updateErr) {
          res.status(500).json({ error: updateErr.message });
          return;
        }
        res.json({ message: 'Notatki zaktualizowane pomyślnie' });
      }
    );
  });
});

// Usuń umowę
app.delete('/api/contracts/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM contracts WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Umowa usunięta pomyślnie' });
  });
});

// Ranking handlowców - umowy "do wypłaty" w perspektywie miesięcznej
app.get('/api/ranking', (req, res) => {
  const { month, year } = req.query;
  
  // Jeśli nie podano miesiąca/roku, użyj bieżącego miesiąca
  const now = new Date();
  const targetMonth = month ? parseInt(month) : now.getMonth() + 1; // 1-12
  const targetYear = year ? parseInt(year) : now.getFullYear();
  
  // Oblicz zakres dat dla danego miesiąca
  const startDate = `${targetYear}-${String(targetMonth).padStart(2, '0')}-01`;
  const endDate = new Date(targetYear, targetMonth, 0).toISOString().split('T')[0]; // Ostatni dzień miesiąca
  
  // Pobierz handlowców z umowami "paid" (do wypłaty) w danym miesiącu
  // Tylko osoby z co najmniej jedną umową "paid"
  // Używamy COALESCE aby użyć paid_date jeśli istnieje, w przeciwnym razie signed_date
  db.all(
    `SELECT 
      s.id,
      s.name,
      s.email,
      COUNT(c.id) as contracts_count,
      SUM(c.contract_value) as total_value,
      SUM(c.contract_value * COALESCE(c.commission_rate, s.commission_rate)) as total_commission
    FROM salespeople s
    INNER JOIN contracts c ON s.id = c.salesperson_id
    WHERE c.status = 'paid'
      AND DATE(COALESCE(c.paid_date, c.signed_date, c.created_at)) >= ?
      AND DATE(COALESCE(c.paid_date, c.signed_date, c.created_at)) <= ?
    GROUP BY s.id, s.name, s.email
    HAVING COUNT(c.id) > 0
    ORDER BY contracts_count DESC, total_commission DESC`,
    [startDate, endDate],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        month: targetMonth,
        year: targetYear,
        startDate: startDate,
        endDate: endDate,
        ranking: rows
      });
    }
  );
});

// Weryfikuj token do ustawienia hasła
app.get('/api/set-password/:token', (req, res) => {
  const { token } = req.params;
  
  if (!token) {
    return res.json({
      valid: false,
      error: 'Brak tokenu'
    });
  }
  
  db.get(
    `SELECT pt.*, s.name, s.email 
     FROM password_tokens pt
     JOIN salespeople s ON pt.salesperson_id = s.id
     WHERE pt.token = ? AND pt.used = 0 AND pt.expires_at > datetime('now')`,
    [token],
    (err, tokenData) => {
      if (err) {
        console.error('Błąd weryfikacji tokenu:', err);
        return res.json({
          valid: false,
          error: 'Błąd podczas weryfikacji tokenu'
        });
      }
      
      if (!tokenData) {
        return res.json({
          valid: false,
          error: 'Token jest nieprawidłowy lub wygasł'
        });
      }
      
      res.json({
        valid: true,
        name: tokenData.name,
        email: tokenData.email
      });
    }
  );
});

// Ustaw hasło przez token
app.post('/api/set-password', async (req, res) => {
  const { token, password } = req.body;
  
  if (!token || !password) {
    res.status(400).json({ error: 'Token i hasło są wymagane' });
    return;
  }
  
  if (password.length < 6) {
    res.status(400).json({ error: 'Hasło musi mieć co najmniej 6 znaków' });
    return;
  }
  
  // Sprawdź token
  db.get(
    `SELECT pt.*, s.id as salesperson_id, s.name, s.email 
     FROM password_tokens pt
     JOIN salespeople s ON pt.salesperson_id = s.id
     WHERE pt.token = ? AND pt.used = 0 AND pt.expires_at > datetime('now')`,
    [token],
    async (err, tokenData) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      if (!tokenData) {
        res.status(400).json({ error: 'Token jest nieprawidłowy lub wygasł' });
        return;
      }
      
      try {
        // Hashuj hasło
        const hash = await bcrypt.hash(password, 10);
        
        // Zaktualizuj hasło handlowca
        db.run(
          "UPDATE salespeople SET password_hash = ? WHERE id = ?",
          [hash, tokenData.salesperson_id],
          (updateErr) => {
            if (updateErr) {
              res.status(500).json({ error: updateErr.message });
              return;
            }
            
            // Oznacz token jako użyty
            db.run(
              "UPDATE password_tokens SET used = 1 WHERE token = ?",
              [token],
              (tokenUpdateErr) => {
                if (tokenUpdateErr) {
                  console.error('Błąd oznaczania tokenu jako użyty:', tokenUpdateErr);
                }
                
                res.json({ 
                  message: 'Hasło zostało ustawione pomyślnie. Możesz się teraz zalogować.' 
                });
              }
            );
          }
        );
      } catch (error) {
        res.status(500).json({ error: 'Błąd podczas ustawiania hasła' });
      }
    }
  );
});

// Ustaw hasło dla handlowca przez admina (bez tokenu)
app.post('/api/admin/set-salesperson-password', async (req, res) => {
  const { salesperson_id, password } = req.body;
  
  if (!salesperson_id || !password) {
    res.status(400).json({ error: 'ID handlowca i hasło są wymagane' });
    return;
  }
  
  if (password.length < 6) {
    res.status(400).json({ error: 'Hasło musi mieć co najmniej 6 znaków' });
    return;
  }
  
  try {
    // Hashuj hasło
    const hash = await bcrypt.hash(password, 10);
    
    // Zaktualizuj hasło handlowca
    db.run(
      "UPDATE salespeople SET password_hash = ? WHERE id = ?",
      [hash, salesperson_id],
      function(updateErr) {
        if (updateErr) {
          res.status(500).json({ error: updateErr.message });
          return;
        }
        
        if (this.changes === 0) {
          res.status(404).json({ error: 'Handlowiec nie znaleziony' });
          return;
        }
        
        res.json({ 
          message: 'Hasło zostało ustawione pomyślnie.' 
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas ustawiania hasła' });
  }
});

// Start serwera (tylko jeśli nie jesteśmy w środowisku Netlify)
if (process.env.NETLIFY !== 'true') {
  app.listen(PORT, () => {
    console.log(`🚀 Serwer działa na porcie ${PORT}`);
    console.log(`📊 API dostępne pod: http://localhost:${PORT}/api`);
  });
}

// Eksportuj app dla Netlify Functions
module.exports = app;


const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const email = 'grzegorz.furmann@gmail.com';
const password = 'Admin123!';
const name = 'Grzegorz Furmann';

console.log('🔧 Tworzenie konta administratora...');
console.log(`Email: ${email}`);
console.log(`Hasło: ${password}`);

// Sprawdź czy tabela istnieje
db.run(`CREATE TABLE IF NOT EXISTS administrators (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
  if (err) {
    console.error('❌ Błąd tworzenia tabeli:', err);
    db.close();
    return;
  }

  // Sprawdź czy konto już istnieje
  db.get("SELECT * FROM administrators WHERE email = ?", [email], async (err, existing) => {
    if (err) {
      console.error('❌ Błąd sprawdzania konta:', err);
      db.close();
      return;
    }

    if (existing) {
      console.log('⚠️  Konto już istnieje. Aktualizuję hasło...');
      
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error('❌ Błąd hashowania hasła:', err);
          db.close();
          return;
        }

        db.run(
          "UPDATE administrators SET password_hash = ?, name = ? WHERE email = ?",
          [hash, name, email],
          (err) => {
            if (err) {
              console.error('❌ Błąd aktualizacji hasła:', err);
            } else {
              console.log('✅ Hasło zostało zaktualizowane!');
            }
            db.close();
          }
        );
      });
    } else {
      console.log('📝 Tworzenie nowego konta...');
      
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error('❌ Błąd hashowania hasła:', err);
          db.close();
          return;
        }

        db.run(
          `INSERT INTO administrators (email, password_hash, name) VALUES (?, ?, ?)`,
          [email, hash, name],
          function(err) {
            if (err) {
              console.error('❌ Błąd tworzenia konta:', err);
            } else {
              console.log('✅ Konto administratora utworzone pomyślnie!');
              console.log(`   ID: ${this.lastID}`);
              console.log(`   Email: ${email}`);
              console.log(`   Hasło: ${password}`);
            }
            db.close();
          }
        );
      });
    }
  });
});




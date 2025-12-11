# 📦 Gdzie Zainstalować Zależności

Twój projekt ma **3 foldery** z `package.json`:

1. **Główny folder** (`/Users/gregfurmann/Desktop/Cursor AI/`)
2. **Server** (`server/`)
3. **Client** (`client/`)

---

## ✅ Metoda 1: Automatyczna (Najprostsza)

Użyj gotowego skryptu, który zainstaluje wszystko:

```bash
cd "/Users/gregfurmann/Desktop/Cursor AI"
npm run install-all
```

To zainstaluje zależności we wszystkich trzech miejscach automatycznie! 🎉

---

## ✅ Metoda 2: Ręczna (Krok po kroku)

Jeśli chcesz zainstalować ręcznie:

### Krok 1: Główny folder
```bash
cd "/Users/gregfurmann/Desktop/Cursor AI"
npm install
```

**Co to instaluje:**
- `concurrently` - do uruchamiania serwera i klienta jednocześnie
- `nodemon` - do automatycznego restartowania serwera
- `serverless-http` - do Netlify Functions

### Krok 2: Server
```bash
cd "/Users/gregfurmann/Desktop/Cursor AI/server"
npm install
```

**Co to instaluje:**
- `express` - framework webowy
- `cors` - obsługa CORS
- `sqlite3` - baza danych
- `bcrypt` - hashowanie haseł
- `nodemailer` - wysyłanie emaili
- `dotenv` - zmienne środowiskowe

### Krok 3: Client
```bash
cd "/Users/gregfurmann/Desktop/Cursor AI/client"
npm install
```

**Co to instaluje:**
- `react` - framework React
- `react-dom` - React DOM
- `react-scripts` - narzędzia do React
- `axios` - do zapytań HTTP

---

## 🎯 Rekomendacja

**Użyj metody automatycznej:**
```bash
cd "/Users/gregfurmann/Desktop/Cursor AI"
npm run install-all
```

To najprostsze i najszybsze! ✅

---

## ✅ Sprawdź czy działa

Po instalacji uruchom:
```bash
npm run dev
```

Jeśli wszystko działa, zobaczysz:
- Serwer na porcie 5001
- Frontend na porcie 3000

---

## 📝 Uwagi

- **Pierwsza instalacja** może zająć kilka minut
- **node_modules/** - to są zainstalowane zależności (nie edytuj ręcznie)
- **package-lock.json** - automatycznie generowany (nie edytuj)

---

## 🐛 Problemy?

### Problem: "command not found: npm"
**Rozwiązanie:** Zainstaluj Node.js z https://nodejs.org

### Problem: "Permission denied"
**Rozwiązanie:** 
```bash
sudo npm install
```
(Lub użyj nvm do zarządzania Node.js)

### Problem: "EACCES error"
**Rozwiązanie:** 
```bash
sudo chown -R $(whoami) ~/.npm
```



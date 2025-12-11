# 🚀 Wdrożenie Backendu Osobno

## ❌ Problem: Backend nie działa na Netlify (błąd 502)

**Rozwiązanie:** Wdróż backend osobno na Render (darmowy).

---

## 📋 KROK PO KROKU: Render

### KROK 1: Zarejestruj się na Render

1. Otwórz: https://render.com
2. Kliknij "Get Started for Free"
3. Zarejestruj się (możesz użyć GitHub)

### KROK 2: Utwórz Nowy Web Service

1. W panelu Render kliknij **"New +"**
2. Wybierz **"Web Service"**
3. Połącz z GitHub (lub użyj "Public Git repository")

### KROK 3: Skonfiguruj

**Jeśli masz projekt na GitHub:**
- Wybierz repozytorium
- Branch: `main` lub `master`

**Jeśli nie masz na GitHub:**
- Użyj "Public Git repository"
- LUB wdróż bezpośrednio (zobacz KROK 4)

### KROK 4: Ustawienia

**Build Command:**
```
cd server && npm install
```

**Start Command:**
```
cd server && npm start
```

**Environment:**
- Node

**Root Directory:**
- Zostaw puste (lub `/`)

### KROK 5: Zmienne Środowiskowe (Opcjonalne)

Jeśli używasz email (SMTP), dodaj:
- `SMTP_USER` = twój email
- `SMTP_PASS` = hasło aplikacji

### KROK 6: Utwórz Service

1. Kliknij **"Create Web Service"**
2. Render zacznie wdrażać backend
3. Poczekaj 3-5 minut
4. Render da Ci URL (np. `https://twoj-backend.onrender.com`)

---

## 🔧 KROK 7: Zaktualizuj Frontend

Po wdrożeniu backendu na Render, musisz zaktualizować URL API w frontendzie.

### Utwórz plik `client/.env.production`:

```bash
REACT_APP_API_URL=https://twoj-backend.onrender.com
```

**Zastąp `twoj-backend.onrender.com` swoim URL z Render!**

### Zaktualizuj wywołania API

Muszę zaktualizować kod, aby używał `process.env.REACT_APP_API_URL` w produkcji.

---

## 🎯 Alternatywa: Railway

Jeśli Render nie działa, możesz użyć Railway:

1. Zarejestruj się: https://railway.app
2. Utwórz nowy projekt
3. Dodaj serwis z kodem backendu
4. Railway automatycznie wykryje Node.js

---

## ✅ Po Wdrożeniu

1. **Skopiuj URL backendu** z Render (np. `https://twoj-backend.onrender.com`)
2. **Daj mi znać URL** - zaktualizuję frontend
3. **Wdróż ponownie frontend** na Netlify
4. **Gotowe!** Logowanie powinno działać

---

## 📝 Co Teraz?

**Wybierz opcję:**
1. **Wdróż backend na Render** (powyższe kroki)
2. **Daj mi znać URL backendu** - zaktualizuję frontend
3. **Wdróż ponownie frontend** na Netlify

**LUB**

**Mogę pomóc w konfiguracji** - daj mi znać jeśli potrzebujesz pomocy!



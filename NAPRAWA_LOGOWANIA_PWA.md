# 🔧 Naprawa Logowania w PWA

## ❌ Problem: Logowanie nie działa w aplikacji mobilnej, ale działa w przeglądarce

To prawdopodobnie problem z backendem na Netlify.

---

## 🔍 Diagnostyka

### Sprawdź 1: Czy backend działa?

Otwórz w przeglądarce (na telefonie lub komputerze):
```
https://heartfelt-mousse-471992.netlify.app/api/salespeople
```

**Co powinno się stać:**
- ✅ Jeśli widzisz JSON z listą handlowców → Backend działa
- ❌ Jeśli widzisz błąd 404/500 → Backend nie działa

### Sprawdź 2: Sprawdź błędy w konsoli

Na telefonie:
1. Otwórz aplikację
2. Jeśli możesz, otwórz DevTools (F12)
3. Przejdź do zakładki "Console"
4. Sprawdź czy są błędy (czerwone komunikaty)

### Sprawdź 3: Sprawdź Network

Na telefonie (jeśli możesz):
1. Otwórz DevTools (F12)
2. Przejdź do zakładki "Network"
3. Spróbuj się zalogować
4. Sprawdź request do `/api/login`
5. Sprawdź status odpowiedzi (200 = OK, 404/500 = błąd)

---

## ⚠️ Główny Problem: SQLite na Netlify

**SQLite może nie działać na Netlify Functions!**

Netlify Functions mają ograniczenia:
- ⚠️ SQLite może nie działać (tylko do odczytu)
- ⚠️ Pliki mogą być tylko do odczytu
- ⚠️ Baza danych może nie być zapisywalna

---

## ✅ Rozwiązania

### Rozwiązanie 1: Wdróż Backend Osobno (Zalecane)

**Opcja A: Render (Darmowy)**
1. Zarejestruj się na https://render.com
2. Utwórz nowy "Web Service"
3. Połącz z GitHub lub wdróż bezpośrednio
4. Ustaw:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Environment: Node

**Opcja B: Railway (Darmowy)**
1. Zarejestruj się na https://railway.app
2. Utwórz nowy projekt
3. Dodaj serwis z kodem backendu
4. Railway automatycznie wykryje Node.js

**Opcja C: Heroku (Płatny, ale prosty)**
1. Zarejestruj się na https://heroku.com
2. Utwórz nową aplikację
3. Wdróż backend

### Rozwiązanie 2: Zmień URL API w Frontendzie

Jeśli wdrożysz backend osobno, musisz zaktualizować URL API w frontendzie.

**Utwórz plik `.env` w folderze `client/`:**
```
REACT_APP_API_URL=https://twoj-backend.onrender.com
```

**Zaktualizuj wszystkie wywołania API** aby używały `process.env.REACT_APP_API_URL`

### Rozwiązanie 3: Użyj Zewnętrznej Bazy Danych

Zamiast SQLite, użyj:
- **Supabase** (darmowy PostgreSQL)
- **MongoDB Atlas** (darmowy MongoDB)
- **PlanetScale** (darmowy MySQL)

---

## 🎯 Szybkie Rozwiązanie (Tymczasowe)

### Test: Sprawdź czy backend działa

Otwórz w przeglądarce:
```
https://heartfelt-mousse-471992.netlify.app/api/salespeople
```

**Jeśli nie działa:**
- Backend nie jest wdrożony na Netlify
- Musisz wdrożyć backend osobno

**Jeśli działa:**
- Problem może być z SQLite (zapis nie działa)
- Musisz użyć zewnętrznej bazy danych

---

## 📝 Co Zrobić Teraz?

1. **Sprawdź czy backend działa:**
   - Otwórz: `https://heartfelt-mousse-471992.netlify.app/api/salespeople`
   - Daj mi znać co widzisz

2. **Sprawdź błędy w konsoli:**
   - Otwórz DevTools (jeśli możesz)
   - Sprawdź Console
   - Daj mi znać jakie błędy widzisz

3. **Rozwiązanie:**
   - Jeśli backend nie działa → Wdróż backend osobno
   - Jeśli backend działa ale SQLite nie zapisuje → Użyj zewnętrznej bazy danych

---

## 🔧 Mogę Pomóc

Mogę pomóc w:
- Wdrożeniu backendu na Render/Railway
- Konfiguracji zewnętrznej bazy danych (Supabase)
- Aktualizacji URL API w frontendzie

**Daj mi znać co widzisz gdy otworzysz `/api/salespeople`!**



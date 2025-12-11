# 🔐 Dane Logowania

## ✅ Konto Administratora Działa!

Backend działa poprawnie. Oto dane logowania:

---

## 📋 Dane Logowania

**Email:** `grzegorz.furmann@gmail.com`  
**Hasło:** `Admin123!`

---

## 🎯 Spróbuj Zalogować Się

1. **Otwórz aplikację:** https://heartfelt-mousse-471992.netlify.app
2. **Wprowadź:**
   - Email: `grzegorz.furmann@gmail.com`
   - Hasło: `Admin123!`
3. **Kliknij "Zaloguj"**

---

## 🔍 Jeśli Nadal Nie Działa

### Problem 1: Frontend nie łączy się z backendem

**Sprawdź:**
1. Otwórz DevTools (F12) w przeglądarce
2. Przejdź do zakładki "Console"
3. Sprawdź czy są błędy (czerwone komunikaty)
4. Przejdź do zakładki "Network"
5. Spróbuj się zalogować
6. Sprawdź request do `/api/login`
7. Sprawdź status odpowiedzi (200 = OK, 404/500 = błąd)

### Problem 2: Zmienna środowiskowa nie jest ustawiona

**W Netlify Dashboard:**
1. Otwórz: https://app.netlify.com
2. Znajdź projekt `heartfelt-mousse-471992`
3. Kliknij "Site settings" → "Environment variables"
4. Sprawdź czy istnieje: `REACT_APP_API_URL` = `https://sales-commission-tracker.onrender.com`
5. Jeśli nie istnieje, dodaj ją
6. Wdróż ponownie

---

## 📝 Daj Mi Znać

**Co się dzieje gdy próbujesz się zalogować?**
- Czy widzisz ten sam błąd?
- Czy są jakieś błędy w konsoli przeglądarki?
- Jaki status ma request do `/api/login`?

**Pomogę Ci to naprawić!**

# 🔧 Naprawa Logowania

## ✅ Backend Działa!

Logowanie przez API działa poprawnie. Problem jest w frontendzie.

---

## 📋 Dane Logowania

**Email:** `grzegorz.furmann@gmail.com`  
**Hasło:** `Admin123!`

---

## 🔧 Problem: Zmienna Środowiskowa

Frontend używa `process.env.REACT_APP_API_URL`, ale w Netlify ta zmienna może nie być ustawiona.

---

## ✅ Rozwiązanie: Dodaj Zmienną Środowiskową w Netlify

### KROK 1: Otwórz Netlify Dashboard

1. **Otwórz:** https://app.netlify.com
2. **Zaloguj się** do Netlify
3. **Znajdź projekt** `heartfelt-mousse-471992`
4. **Kliknij na projekt**

### KROK 2: Dodaj Zmienną Środowiskową

1. **Kliknij "Site settings"** (w górnym menu)
2. **Kliknij "Environment variables"** (w lewym menu)
3. **Kliknij "Add a variable"**
4. **Wpisz:**
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://sales-commission-tracker.onrender.com`
5. **Kliknij "Save"**

### KROK 3: Wdróż Ponownie

1. **Wróć do "Deploys"**
2. **Kliknij "Trigger deploy"** → **"Deploy site"**
3. **LUB** jeśli masz połączone z GitHub, push do GitHub automatycznie wdroży

---

## 🎯 Po Wdrożeniu

1. **Otwórz aplikację:** https://heartfelt-mousse-471992.netlify.app
2. **Spróbuj się zalogować:**
   - Email: `grzegorz.furmann@gmail.com`
   - Hasło: `Admin123!`
3. **Powinno działać!**

---

## 📝 Daj Mi Znać

**Czy dodałeś zmienną środowiskową i wdrożyłeś ponownie?**
- Jeśli tak, sprawdź czy logowanie działa
- Jeśli nie, daj mi znać - pomogę

---

## 🔍 Alternatywa: Sprawdź w Konsoli

Jeśli nadal nie działa, sprawdź w konsoli przeglądarki:

1. **Otwórz DevTools (F12)**
2. **Przejdź do zakładki "Console"**
3. **Sprawdź czy są błędy**
4. **Przejdź do zakładki "Network"**
5. **Spróbuj się zalogować**
6. **Sprawdź request do `/api/login`**
7. **Sprawdź URL requestu** - powinien być: `https://sales-commission-tracker.onrender.com/api/login`

**Daj mi znać co widzisz!**


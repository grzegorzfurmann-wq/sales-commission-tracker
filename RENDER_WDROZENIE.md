# 🚀 Wdrożenie Backendu na Render

## ✅ Utworzyłem plik `render.yaml`!

Ten plik konfiguruje wdrożenie na Render.

---

## 📋 KROK PO KROKU

### KROK 1: Zarejestruj się na Render

1. Otwórz: https://render.com
2. Kliknij "Get Started for Free"
3. Zarejestruj się (możesz użyć GitHub)

### KROK 2: Połącz z GitHub (Jeśli masz repozytorium)

1. W panelu Render kliknij **"New +"**
2. Wybierz **"Blueprint"** (jeśli masz render.yaml)
   LUB **"Web Service"** (jeśli chcesz ręcznie)

### KROK 3A: Jeśli używasz Blueprint (Z render.yaml)

1. Wybierz **"Blueprint"**
2. Połącz z GitHub
3. Wybierz repozytorium
4. Render automatycznie wykryje `render.yaml`
5. Kliknij **"Apply"**
6. Render wdroży backend automatycznie!

### KROK 3B: Jeśli używasz Web Service (Ręcznie)

1. Wybierz **"Web Service"**
2. Połącz z GitHub lub użyj "Public Git repository"
3. Wybierz branch (main/master)
4. Render automatycznie wykryje `render.yaml` i użyje ustawień z niego
5. LUB ustaw ręcznie:
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   - **Environment:** Node
6. Kliknij **"Create Web Service"**

### KROK 4: Zmienne Środowiskowe (Opcjonalne)

Jeśli używasz email (SMTP), dodaj w panelu Render:
- `SMTP_USER` = twój email
- `SMTP_PASS` = hasło aplikacji

### KROK 5: Poczekaj na Wdrożenie

1. Render zacznie wdrażać backend
2. Poczekaj 3-5 minut
3. Render da Ci URL (np. `https://sales-commission-backend.onrender.com`)

---

## 🔧 KROK 6: Zaktualizuj Frontend

Po wdrożeniu backendu na Render:

1. **Skopiuj URL backendu** z Render
2. **Daj mi znać URL** - zaktualizuję frontend
3. **Wdróż ponownie frontend** na Netlify

---

## 📝 Ważne Uwagi

### Port
- Render automatycznie ustawia port w `process.env.PORT`
- Backend już używa `process.env.PORT || 5001` ✅

### Baza Danych
- SQLite będzie działać na Render
- Plik `database.sqlite` będzie w folderze `server/`

### Auto-Deploy
- Z `render.yaml` Render automatycznie wdraża przy każdym push do GitHub
- To jest opcjonalne - możesz też wdrożyć ręcznie

---

## ✅ Co Teraz?

1. **Wdróż backend na Render** (używając powyższych kroków)
2. **Daj mi znać URL backendu** (np. `https://sales-commission-backend.onrender.com`)
3. **Zaktualizuję frontend** aby używał tego URL
4. **Wdróż ponownie frontend** na Netlify

---

## 🐛 Problemy?

### Problem: "Repository not found"
**Rozwiązanie:** Upewnij się, że repozytorium jest publiczne lub połączone z Render

### Problem: "Build failed"
**Rozwiązanie:** Sprawdź logi w Render - pokaż mi błąd

### Problem: "Port already in use"
**Rozwiązanie:** Render automatycznie ustawia port - nie musisz nic zmieniać

---

## 🎯 Szybka Wersja

1. Zarejestruj się na Render
2. "New +" → "Blueprint" (lub "Web Service")
3. Połącz z GitHub
4. Render automatycznie użyje `render.yaml`
5. Kliknij "Apply" lub "Create"
6. Poczekaj na URL backendu
7. Daj mi znać URL - zaktualizuję frontend!



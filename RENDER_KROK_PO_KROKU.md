# 🎯 Render - Krok po Kroku z Screenshotami

## 📋 Po Połączeniu z GitHub

Render pokaże Ci formularz konfiguracji. Oto dokładnie gdzie kliknąć i co wpisać:

---

## 🔍 KROK 1: Znajdź Sekcję "Build & Deploy"

Po połączeniu z GitHub, zobaczysz formularz. Przewiń w dół do sekcji **"Build & Deploy"**.

---

## 📝 KROK 2: Wypełnij Pola

### Pole 1: **Build Command**
- **Gdzie:** W sekcji "Build & Deploy"
- **Co zrobić:** 
  1. Kliknij w pole "Build Command"
  2. Wpisz: `cd server && npm install`
  3. Naciśnij Enter

### Pole 2: **Start Command**
- **Gdzie:** Tuż pod "Build Command"
- **Co zrobić:**
  1. Kliknij w pole "Start Command"
  2. Wpisz: `cd server && npm start`
  3. Naciśnij Enter

### Pole 3: **Environment**
- **Gdzie:** W sekcji "Build & Deploy"
- **Co zrobić:**
  1. Kliknij dropdown "Environment"
  2. Wybierz **"Node"**

### Pole 4: **Root Directory** (Opcjonalne)
- **Gdzie:** W sekcji "Build & Deploy"
- **Co zrobić:** Zostaw **puste** (nie wpisuj nic)

---

## 🎯 KROK 3: Sprawdź Inne Ustawienia

### Name
- **Gdzie:** Na górze formularza
- **Co wpisać:** `sales-commission-backend` (lub dowolną nazwę)

### Region
- **Gdzie:** Pod nazwą
- **Co wybrać:** Najbliższy region (np. Frankfurt)

### Branch
- **Gdzie:** W sekcji "Build & Deploy"
- **Co wybrać:** `main` lub `master`

### Plan
- **Gdzie:** W sekcji "Plan"
- **Co wybrać:** **Free** (darmowy)

---

## ✅ KROK 4: Utwórz Service

1. Przewiń na dół formularza
2. Kliknij przycisk **"Create Web Service"** (lub "Apply")
3. Render zacznie wdrażać backend
4. Poczekaj 3-5 minut

---

## 🔍 Jeśli Nie Widzisz Formularza

### Opcja A: Render Wykrył render.yaml

Jeśli widzisz komunikat typu:
- "Blueprint detected"
- "render.yaml found"
- "Auto-configure from render.yaml"

**To dobrze!** Render użyje ustawień z `render.yaml` automatycznie.

**Co zrobić:**
1. Sprawdź czy ustawienia są poprawne
2. Kliknij **"Apply"** lub **"Create Web Service"**

### Opcja B: Render Pokazuje Błędy

Jeśli widzisz błędy:
- **"Repository not found"** → Sprawdź czy repozytorium jest publiczne
- **"Branch not found"** → Sprawdź czy branch istnieje (main/master)
- **"Build failed"** → Sprawdź logi - pokaż mi błąd

---

## 📸 Co Widzisz?

**Opisz mi co widzisz w Render:**
- Czy widzisz formularz z polami?
- Czy widzisz komunikat o "Blueprint"?
- Czy widzisz jakieś błędy?
- Jakie opcje są dostępne?

**Na podstawie tego pomogę Ci dokładnie!**

---

## 🎯 Najważniejsze Pola

**Jeśli widzisz formularz, upewnij się że wypełniłeś:**

1. ✅ **Build Command:** `cd server && npm install`
2. ✅ **Start Command:** `cd server && npm start`
3. ✅ **Environment:** `Node`

**To wystarczy!** Reszta może być domyślna.



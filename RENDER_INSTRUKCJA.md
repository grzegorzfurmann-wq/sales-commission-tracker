# 📋 Instrukcja: Gdzie Ustawić w Render

## 🎯 Po Połączeniu z GitHub

Po połączeniu z GitHub, Render pokaże Ci formularz konfiguracji. Oto gdzie ustawić każdą opcję:

---

## 📝 Formularz Konfiguracji Render

### 1. **Name** (Nazwa)
- **Gdzie:** Na górze formularza
- **Co wpisać:** `sales-commission-backend` (lub dowolną nazwę)

### 2. **Region**
- **Gdzie:** Pod nazwą
- **Co wybrać:** Najbliższy region (np. Frankfurt, Oregon)

### 3. **Branch**
- **Gdzie:** W sekcji "Build & Deploy"
- **Co wybrać:** `main` lub `master` (zależnie od Twojego repozytorium)

### 4. **Root Directory**
- **Gdzie:** W sekcji "Build & Deploy"
- **Co wpisać:** Zostaw **puste** (lub `/`)

### 5. **Build Command** ⭐
- **Gdzie:** W sekcji "Build & Deploy"
- **Co wpisać:** 
  ```
  cd server && npm install
  ```

### 6. **Start Command** ⭐
- **Gdzie:** W sekcji "Build & Deploy" (pod Build Command)
- **Co wpisać:**
  ```
  cd server && npm start
  ```

### 7. **Environment**
- **Gdzie:** W sekcji "Build & Deploy"
- **Co wybrać:** **Node**

### 8. **Instance Type**
- **Gdzie:** W sekcji "Plan"
- **Co wybrać:** **Free** (darmowy plan)

---

## 🔍 Szczegółowy Widok Formularza

Formularz wygląda mniej więcej tak:

```
┌─────────────────────────────────────┐
│ Name: [sales-commission-backend]    │
│ Region: [Frankfurt ▼]               │
├─────────────────────────────────────┤
│ Build & Deploy                      │
│                                     │
│ Branch: [main ▼]                    │
│ Root Directory: [puste]            │
│ Build Command: [cd server && npm install]  │
│ Start Command: [cd server && npm start]    │
│ Environment: [Node ▼]               │
├─────────────────────────────────────┤
│ Plan                                │
│ Instance Type: [Free ▼]            │
├─────────────────────────────────────┤
│ [Create Web Service]                │
└─────────────────────────────────────┘
```

---

## ✅ Krok po Kroku

1. **Name:** Wpisz `sales-commission-backend`
2. **Region:** Wybierz najbliższy
3. **Branch:** Wybierz `main` lub `master`
4. **Root Directory:** Zostaw puste
5. **Build Command:** Wpisz `cd server && npm install`
6. **Start Command:** Wpisz `cd server && npm start`
7. **Environment:** Wybierz `Node`
8. **Instance Type:** Wybierz `Free`
9. **Kliknij "Create Web Service"**

---

## 🎯 Jeśli Nie Widzisz Formularza

Jeśli Render automatycznie wykrył `render.yaml` i nie pokazuje formularza:

1. **Sprawdź czy `render.yaml` jest w repozytorium**
2. **Jeśli tak:** Render użyje ustawień z `render.yaml` automatycznie
3. **Jeśli nie:** Render powinien pokazać formularz

---

## 🔧 Jeśli Render Wykrył render.yaml

Jeśli Render pokazuje "Blueprint detected" lub podobny komunikat:

1. **Render automatycznie użyje ustawień z `render.yaml`**
2. **Możesz kliknąć "Apply"** bez dodatkowych ustawień
3. **LUB możesz edytować ustawienia** przed wdrożeniem

---

## 📸 Co Widzisz Teraz?

**Daj mi znać:**
- Czy widzisz formularz z polami do wypełnienia?
- Czy Render pokazuje "Blueprint detected"?
- Czy widzisz jakieś błędy?

**Na podstawie tego pomogę Ci dokładnie!**

---

## 🎯 Szybka Wersja

Jeśli widzisz formularz, wypełnij:

1. **Build Command:** `cd server && npm install`
2. **Start Command:** `cd server && npm start`
3. **Environment:** `Node`
4. **Kliknij "Create Web Service"**

**To wszystko!** 🚀



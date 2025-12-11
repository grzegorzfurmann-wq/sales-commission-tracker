# 🚀 Szybki Start: Netlify

## ✅ KROK 1: Wygeneruj Ikony (2 minuty)

### Otwórz generator:
```
http://localhost:3000/create-icons.html
```

### Kliknij:
1. "Generuj ikonę 192x192" → Zapisz jako `icon-192x192.png`
2. "Generuj ikonę 512x512" → Zapisz jako `icon-512x512.png`

### Zapisz w folderze:
```
client/public/
```

### Zrestartuj:
```bash
npm run dev
```

---

## ✅ KROK 2: Wdróż na Netlify (5 minut)

### 1. Zainstaluj Netlify CLI:
```bash
npm install -g netlify-cli
```

### 2. Zainstaluj serverless-http:
```bash
cd "/Users/gregfurmann/Desktop/Cursor AI"
npm install --save-dev serverless-http
```

### 3. Zaloguj się:
```bash
netlify login
```

### 4. Zainicjuj projekt:
```bash
netlify init
```

**Odpowiedz na pytania:**
- Create & configure a new site? → **Y**
- Team: → Wybierz swoje konto
- Site name? → Naciśnij Enter (domyślna) lub wpisz własną
- Build command? → `cd client && npm install && npm run build`
- Directory to deploy? → `client/build`
- Netlify functions folder? → `netlify/functions`

### 5. Wdróż do produkcji:
```bash
netlify deploy --prod
```

### 6. Skopiuj URL i otwórz na telefonie!

---

## ⚠️ Ważna Uwaga: SQLite

**Problem:** SQLite może nie działać na Netlify Functions (tylko do odczytu).

**Rozwiązania:**

### Opcja A: Użyj Supabase (Darmowy PostgreSQL)
1. Zarejestruj się na https://supabase.com
2. Utwórz nowy projekt
3. Skopiuj connection string
4. Zaktualizuj backend do użycia PostgreSQL

### Opcja B: Frontend na Netlify + Backend osobno
1. Frontend na Netlify (jak wyżej)
2. Backend na Render (https://render.com) - darmowy plan
3. Zaktualizuj URL API w frontendzie

### Opcja C: Tylko Frontend na Netlify
- Jeśli backend może być lokalny lub na innym serwerze
- Frontend na Netlify będzie działał z zewnętrznym API

---

## 📱 Zainstaluj na Telefonie

1. Otwórz URL z Netlify na telefonie
2. Android: Menu → "Dodaj do ekranu głównego"
3. iOS: Udostępnij → "Dodaj do ekranu głównego"

**Gotowe!** 🎉

---

## 📚 Więcej Informacji

- Szczegóły wdrożenia: `NETLIFY_WDROZENIE.md`
- Instrukcja PWA: `PWA_INSTRUKCJA.md`



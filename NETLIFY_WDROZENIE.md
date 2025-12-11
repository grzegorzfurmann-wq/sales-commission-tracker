# 🚀 Wdrożenie na Netlify

## 📋 Opcje Wdrożenia na Netlify

Netlify ma kilka opcji dla aplikacji z backendem:

### Opcja 1: Netlify Functions (Zalecane dla małych projektów)
- Backend jako funkcje serwerless
- Łatwe wdrożenie
- Darmowy plan wystarczy

### Opcja 2: Netlify + Zewnętrzny Backend
- Frontend na Netlify
- Backend na osobnym serwerze (np. Render, Railway)
- Więcej kontroli

### Opcja 3: Netlify + Express jako Function
- Cały Express jako jedna funkcja
- Wymaga `serverless-http`

## 🎯 Rekomendacja: Opcja 3 (Express jako Function)

Dla Twojej aplikacji najlepiej użyć Express jako Netlify Function.

---

## 📝 KROK PO KROKU

### Krok 1: Zainstaluj Netlify CLI

```bash
npm install -g netlify-cli
```

### Krok 2: Zainstaluj zależności dla Netlify Functions

```bash
cd "/Users/gregfurmann/Desktop/Cursor AI"
npm install --save-dev serverless-http
```

### Krok 3: Utwórz wrapper dla Netlify

Plik `netlify/functions/api.js` już istnieje, ale musimy go dostosować.

### Krok 4: Zaloguj się do Netlify

```bash
netlify login
```

(Otworzy się przeglądarka - zaloguj się lub utwórz konto)

### Krok 5: Zainicjuj projekt Netlify

```bash
netlify init
```

**Odpowiedz na pytania:**
- Create & configure a new site? → **Y**
- Team: → Wybierz swoje konto
- Site name? → Naciśnij Enter (domyślna nazwa) lub wpisz własną
- Build command? → `cd client && npm install && npm run build`
- Directory to deploy? → `client/build`
- Netlify functions folder? → `netlify/functions`

### Krok 6: Wdróż

```bash
netlify deploy --prod
```

---

## ⚠️ Ważne Uwagi

### 1. SQLite na Netlify

**Problem:** SQLite może nie działać na Netlify Functions (tylko do odczytu).

**Rozwiązania:**
- **Opcja A:** Użyj zewnętrznej bazy danych (PostgreSQL, MongoDB)
- **Opcja B:** Użyj Netlify tylko dla frontendu, backend na osobnym serwerze
- **Opcja C:** Użyj Supabase (darmowy PostgreSQL)

### 2. Zmienne środowiskowe

Ustaw w panelu Netlify (Site settings → Environment variables):
- `SMTP_USER` (jeśli używasz email)
- `SMTP_PASS` (jeśli używasz email)
- `NODE_ENV=production`

### 3. CORS

Backend już ma `app.use(cors())` - to powinno działać.

---

## 🔧 Alternatywa: Frontend na Netlify + Backend osobno

Jeśli SQLite jest problemem, możesz:

1. **Frontend na Netlify:**
   ```bash
   netlify deploy --prod --dir=client/build
   ```

2. **Backend na Render/Railway:**
   - Render: https://render.com (darmowy plan)
   - Railway: https://railway.app (darmowy plan)

3. **Zaktualizuj URL API w frontendzie:**
   - W `client/src` zmień wszystkie `/api/` na URL z Render/Railway

---

## 📱 Po Wdrożeniu

1. **Sprawdź URL:**
   - Netlify poda Ci URL (np. `https://twoja-aplikacja.netlify.app`)

2. **Zainstaluj PWA na telefonie:**
   - Otwórz URL na telefonie
   - Android: Menu → "Dodaj do ekranu głównego"
   - iOS: Udostępnij → "Dodaj do ekranu głównego"

3. **Sprawdź HTTPS:**
   - Netlify zapewnia HTTPS automatycznie ✅

---

## 🐛 Rozwiązywanie Problemów

### Problem: SQLite nie działa
**Rozwiązanie:** Użyj zewnętrznej bazy danych lub wdróż backend osobno.

### Problem: API nie działa
**Rozwiązanie:** 
- Sprawdź czy `netlify/functions/api.js` jest poprawnie skonfigurowany
- Sprawdź logi w panelu Netlify (Functions → Logs)

### Problem: Build nie działa
**Rozwiązanie:**
- Sprawdź czy wszystkie zależności są w `package.json`
- Sprawdź logi build w panelu Netlify

---

## 🎯 Szybki Start

```bash
# 1. Zainstaluj Netlify CLI
npm install -g netlify-cli

# 2. Zaloguj się
netlify login

# 3. Zainicjuj projekt
netlify init

# 4. Wdróż
netlify deploy --prod
```

**Gotowe!** 🎉

---

## 📚 Więcej Informacji

- Dokumentacja Netlify: https://docs.netlify.com
- Netlify Functions: https://docs.netlify.com/functions/overview/
- Przewodnik Express na Netlify: https://docs.netlify.com/functions/serverless-frameworks/express/



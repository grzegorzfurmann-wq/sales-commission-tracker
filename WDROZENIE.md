# 🚀 Przewodnik Wdrożenia Aplikacji

## 📋 Opcje Wdrożenia

### Opcja 1: Vercel (Zalecane - Najprostsze) ⭐

**Zalety:**
- ✅ Darmowy plan wystarczy
- ✅ Automatyczne HTTPS
- ✅ Łatwe wdrożenie
- ✅ Działa z React i Node.js
- ✅ Automatyczne aktualizacje

**Kroki:**

1. **Zainstaluj Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Zaloguj się:**
   ```bash
   vercel login
   ```

3. **Wdróż frontend:**
   ```bash
   cd client
   vercel
   ```
   (Odpowiedz na pytania: Y, Y, ./build)

4. **Skonfiguruj backend:**
   - Utwórz plik `vercel.json` w głównym folderze:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server/index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "server/index.js"
       },
       {
         "src": "/(.*)",
         "dest": "client/build/$1"
       }
     ]
   }
   ```

5. **Wdróż całą aplikację:**
   ```bash
   vercel --prod
   ```

### Opcja 2: Netlify (Proste)

**Zalety:**
- ✅ Darmowy plan
- ✅ Automatyczne HTTPS
- ✅ Łatwe wdrożenie

**Kroki:**

1. **Zainstaluj Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Zaloguj się:**
   ```bash
   netlify login
   ```

3. **Skonfiguruj:**
   - Utwórz plik `netlify.toml` w głównym folderze:
   ```toml
   [build]
     command = "cd client && npm run build"
     publish = "client/build"
   
   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/api/:splat"
     status = 200
   ```

4. **Wdróż:**
   ```bash
   netlify deploy --prod
   ```

### Opcja 3: Render (Darmowy dla małych projektów)

**Zalety:**
- ✅ Darmowy plan
- ✅ Automatyczne HTTPS
- ✅ Łatwe wdrożenie

**Kroki:**

1. Zarejestruj się na https://render.com
2. Utwórz nowy "Web Service"
3. Połącz z GitHub
4. Ustaw:
   - Build Command: `cd client && npm install && npm run build`
   - Start Command: `cd server && npm install && npm start`
   - Environment: Node

### Opcja 4: Heroku (Płatny, ale prosty)

**Zalety:**
- ✅ Łatwe wdrożenie
- ✅ Automatyczne HTTPS
- ⚠️ Płatny (ale tani)

**Kroki:**

1. **Zainstaluj Heroku CLI:**
   ```bash
   brew install heroku/brew/heroku
   ```

2. **Zaloguj się:**
   ```bash
   heroku login
   ```

3. **Utwórz aplikację:**
   ```bash
   heroku create twoja-aplikacja
   ```

4. **Skonfiguruj:**
   - Utwórz plik `Procfile`:
   ```
   web: cd server && npm start
   ```

5. **Wdróż:**
   ```bash
   git add .
   git commit -m "Deploy"
   git push heroku main
   ```

## 🔧 Przygotowanie do Wdrożenia

### 1. Zbuduj aplikację produkcyjną

```bash
cd client
npm run build
```

### 2. Sprawdź zmienne środowiskowe

Utwórz plik `.env` w folderze `server/`:
```
NODE_ENV=production
PORT=5000
```

### 3. Sprawdź czy wszystko działa lokalnie

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend (produkcyjny build)
cd client
npm install -g serve
serve -s build -l 3000
```

## 📝 Pliki do Utworzenia

### `vercel.json` (dla Vercel)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "client/build/$1"
    }
  ]
}
```

### `netlify.toml` (dla Netlify)
```toml
[build]
  command = "cd client && npm install && npm run build"
  publish = "client/build"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200
```

### `Procfile` (dla Heroku)
```
web: cd server && npm start
```

## ✅ Po Wdrożeniu

1. **Sprawdź czy aplikacja działa:**
   - Otwórz URL z wdrożenia
   - Sprawdź czy API działa

2. **Zainstaluj PWA na telefonie:**
   - Otwórz aplikację w przeglądarce na telefonie
   - Dodaj do ekranu głównego

3. **Sprawdź HTTPS:**
   - PWA wymaga HTTPS
   - Wszystkie powyższe platformy zapewniają HTTPS automatycznie

## 🎯 Rekomendacja

**Dla Twojej aplikacji polecam Vercel**, ponieważ:
- Najprostsze wdrożenie
- Darmowe
- Automatyczne HTTPS
- Działa z React i Node.js
- Łatwe aktualizacje

## 📞 Pomoc

Jeśli masz problemy z wdrożeniem, mogę pomóc w:
- Konfiguracji plików
- Rozwiązywaniu błędów
- Wyborze najlepszej opcji dla Ciebie



# 🚀 Kolejne Kroki - Netlify

## ✅ KROK 1: Zaloguj się do Netlify

W Terminalu wklej:

```bash
netlify login
```

**Co się stanie:**
- Otworzy się przeglądarka
- Zaloguj się lub utwórz darmowe konto na https://netlify.com
- Po zalogowaniu wróć do Terminala
- Powinno pokazać "Logged in as [Twoje konto]"

---

## ✅ KROK 2: Przejdź do folderu projektu

W Terminalu wklej:

```bash
cd "/Users/gregfurmann/Desktop/Cursor AI"
```

---

## ✅ KROK 3: Zainicjuj projekt Netlify

W Terminalu wklej:

```bash
netlify init
```

**Odpowiedz na pytania:**

1. **Create & configure a new site?**
   - Wpisz: **Y**
   - Naciśnij Enter

2. **Team:**
   - Wybierz swoje konto (naciśnij Enter jeśli tylko jedno)

3. **Site name?**
   - Naciśnij Enter (domyślna nazwa) 
   - LUB wpisz własną nazwę (np. `moja-aplikacja-prowizji`)

4. **Build command?**
   - Wpisz: `cd client && npm install && npm run build`
   - Naciśnij Enter

5. **Directory to deploy?**
   - Wpisz: `client/build`
   - Naciśnij Enter

6. **Netlify functions folder?**
   - Wpisz: `netlify/functions`
   - Naciśnij Enter

---

## ✅ KROK 4: Wdróż do produkcji

W Terminalu wklej:

```bash
netlify deploy --prod
```

**Poczekaj** - to może zająć 3-5 minut.

**Co się stanie:**
- Netlify zbuduje aplikację (frontend)
- Wdroży ją na serwer
- Poda Ci URL (np. `https://twoja-aplikacja-123.netlify.app`)

**Skopiuj ten URL!** 📋

---

## 📱 KROK 5: Zainstaluj na Telefonie

1. **Otwórz URL** z Netlify na telefonie w przeglądarce

2. **Zainstaluj PWA:**
   - **Android (Chrome):** Menu (3 kropki) → "Dodaj do ekranu głównego"
   - **iOS (Safari):** Przycisk "Udostępnij" (kwadrat ze strzałką) → "Dodaj do ekranu głównego"

3. **Gotowe!** 🎉

---

## ⚠️ Ważna Uwaga

**Backend (SQLite) może nie działać na Netlify Functions.**

To oznacza, że:
- ✅ Frontend będzie działał
- ✅ PWA będzie działało
- ⚠️ Backend może wymagać osobnego wdrożenia

**Na razie przetestuj frontend!** Jeśli backend nie działa, możemy go wdrożyć osobno (np. na Render).

---

## 🐛 Problemy?

### Problem: "Not logged in"
**Rozwiązanie:** Uruchom ponownie `netlify login`

### Problem: "Build failed"
**Rozwiązanie:** Sprawdź logi - pokaż mi błąd

### Problem: "Functions folder not found"
**Rozwiązanie:** Sprawdź czy folder `netlify/functions` istnieje

---

## 🎯 Zacznij od KROKU 1!

Wklej w Terminalu:

```bash
netlify login
```

Potem kontynuuj zgodnie z instrukcjami powyżej! 🚀



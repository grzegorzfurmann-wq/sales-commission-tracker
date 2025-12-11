# 📱 Instrukcja PWA (Progressive Web App)

Aplikacja została skonfigurowana jako PWA! Teraz możesz zainstalować ją na telefonie jak natywną aplikację.

## 🎯 Co to oznacza?

- ✅ Aplikacja działa w przeglądarce (jak dotychczas)
- ✅ Możesz dodać ją do ekranu głównego telefonu
- ✅ Działa jak natywna aplikacja (pełny ekran, ikona)
- ✅ Może działać częściowo offline (cache)

## 📲 Jak zainstalować na telefonie?

### Android (Chrome):
1. Otwórz aplikację w przeglądarce Chrome
2. W menu (trzy kropki) wybierz **"Dodaj do ekranu głównego"** lub **"Zainstaluj aplikację"**
3. Potwierdź instalację
4. Ikona pojawi się na ekranie głównym

### iOS (Safari):
1. Otwórz aplikację w przeglądarce Safari
2. Kliknij przycisk **"Udostępnij"** (kwadrat ze strzałką)
3. Wybierz **"Dodaj do ekranu głównego"**
4. Potwierdź instalację
5. Ikona pojawi się na ekranie głównym

## 🎨 Generowanie ikon

Aplikacja potrzebuje ikon w rozmiarach 192x192 i 512x512 pikseli.

### Opcja 1: Użyj generatora HTML (najprostsze)
1. Otwórz w przeglądarce: `client/public/create-icons.html`
2. Kliknij **"Generuj ikonę 192x192"** - plik pobierze się automatycznie
3. Kliknij **"Generuj ikonę 512x512"** - plik pobierze się automatycznie
4. Zapisz oba pliki w folderze `client/public/` z nazwami:
   - `icon-192x192.png`
   - `icon-512x512.png`

### Opcja 2: Użyj własnych ikon
1. Przygotuj ikony w rozmiarach 192x192 i 512x512 pikseli
2. Zapisz je jako PNG w folderze `client/public/`:
   - `icon-192x192.png`
   - `icon-512x512.png`

### Opcja 3: Online generator
- Użyj narzędzia online: https://www.pwabuilder.com/imageGenerator
- Wygeneruj ikony i zapisz w folderze `client/public/`

## ✅ Sprawdzanie czy działa

1. **Zrestartuj aplikację:**
   ```bash
   npm run dev
   ```

2. **Otwórz w przeglądarce:** http://localhost:3000

3. **Sprawdź w DevTools (F12):**
   - Przejdź do zakładki "Application" (Chrome) lub "Application" (Firefox)
   - Sprawdź czy "Service Workers" jest zarejestrowany
   - Sprawdź czy "Manifest" jest poprawnie załadowany

4. **Na telefonie:**
   - Otwórz aplikację w przeglądarce
   - Sprawdź czy pojawia się opcja "Dodaj do ekranu głównego"

## 🔧 Co zostało dodane?

- ✅ `manifest.json` - konfiguracja PWA
- ✅ `service-worker.js` - cache i działanie offline
- ✅ Rejestracja service workera w aplikacji
- ✅ Linki do manifestu w HTML

## 📝 Uwagi

- **Backend musi działać:** PWA działa offline tylko dla plików statycznych. API nadal wymaga działającego serwera.
- **HTTPS wymagany:** W produkcji PWA wymaga HTTPS (lub localhost dla testów).
- **Ikony:** Bez ikon aplikacja nadal działa, ale nie będzie wyglądać profesjonalnie.

## 🚀 Następne kroki

Po zainstalowaniu PWA możesz:
- Używać aplikacji jak natywnej aplikacji mobilnej
- Otwierać z ekranu głównego
- Cieszyć się pełnoekranowym interfejsem

Aplikacja webowa nadal działa normalnie w przeglądarce!




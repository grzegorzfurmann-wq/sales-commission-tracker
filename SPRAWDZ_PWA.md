# 🔍 Sprawdź PWA - Krok po Kroku

## ✅ Wszystkie pliki są na miejscu!

Teraz sprawdźmy czy działają w produkcji:

---

## 📱 KROK 1: Sprawdź na Telefonie

### Android (Chrome):
1. Otwórz aplikację w Chrome
2. **Menu (3 kropki w prawym górnym rogu)**
3. Szukaj opcji:
   - **"Dodaj do ekranu głównego"** LUB
   - **"Zainstaluj aplikację"**

**Jeśli nie widzisz opcji:**
- Sprawdź czy jesteś na HTTPS (URL powinien zaczynać się od `https://`)
- Odśwież stronę
- Spróbuj ponownie

### iOS (Safari):
1. Otwórz aplikację w Safari
2. **Przycisk "Udostępnij"** (kwadrat ze strzałką w górę - na dole ekranu)
3. Przewiń w dół
4. Szukaj: **"Dodaj do ekranu głównego"**

**Jeśli nie widzisz opcji:**
- Upewnij się, że używasz Safari (nie Chrome)
- Odśwież stronę
- Spróbuj ponownie

---

## 🔧 KROK 2: Sprawdź w DevTools (Jeśli Możesz)

### Na komputerze:
1. Otwórz aplikację w Chrome: `https://heartfelt-mousse-471992.netlify.app`
2. Naciśnij **F12** (lub prawy przycisk → "Zbadaj")
3. Przejdź do zakładki **"Application"**
4. Sprawdź:
   - **Manifest** - czy jest załadowany? (powinien pokazać ikony)
   - **Service Workers** - czy jest zarejestrowany? (powinien pokazać status "activated")
   - **Icons** - czy są widoczne?

### Na telefonie (Chrome):
1. Otwórz aplikację
2. Menu → "Więcej narzędzi" → "Narzędzia deweloperskie" (jeśli dostępne)
3. LUB użyj Chrome DevTools przez USB

---

## 🐛 Najczęstsze Problemy

### Problem 1: "Nie widzę opcji instalacji"
**Rozwiązanie:**
- **Android:** Menu (3 kropki) → "Dodaj do ekranu głównego" (może być na dole menu)
- **iOS:** Przycisk "Udostępnij" → "Dodaj do ekranu głównego" (może być trzeba przewinąć)

### Problem 2: "Service Worker nie działa"
**Sprawdź:**
- Czy URL zaczyna się od `https://`?
- Czy w konsoli są błędy?

### Problem 3: "Manifest nie jest załadowany"
**Sprawdź:**
- Otwórz w przeglądarce: `https://heartfelt-mousse-471992.netlify.app/manifest.json`
- Powinien pokazać JSON z ikonami

---

## ✅ Szybki Test

### Test 1: Sprawdź Manifest
Otwórz w przeglądarce (na telefonie lub komputerze):
```
https://heartfelt-mousse-471992.netlify.app/manifest.json
```

**Powinien pokazać:** JSON z ikonami i konfiguracją

### Test 2: Sprawdź Service Worker
Otwórz w przeglądarce:
```
https://heartfelt-mousse-471992.netlify.app/service-worker.js
```

**Powinien pokazać:** Kod JavaScript service workera

### Test 3: Sprawdź Ikony
Otwórz w przeglądarce:
```
https://heartfelt-mousse-471992.netlify.app/icon-192x192.png
https://heartfelt-mousse-471992.netlify.app/icon-512x512.png
```

**Powinny pokazać:** Obrazy ikon

---

## 📱 Instrukcja Instalacji (Szczegółowa)

### Android (Chrome):
1. Otwórz aplikację: `https://heartfelt-mousse-471992.netlify.app`
2. **Menu** (3 kropki w prawym górnym rogu)
3. **"Dodaj do ekranu głównego"** (może być na dole menu)
4. Potwierdź instalację
5. Ikona pojawi się na ekranie głównym

### iOS (Safari):
1. Otwórz aplikację w Safari: `https://heartfelt-mousse-471992.netlify.app`
2. **Przycisk "Udostępnij"** (kwadrat ze strzałką w górę - na dole ekranu)
3. **Przewiń w dół** w menu udostępniania
4. **"Dodaj do ekranu głównego"**
5. Potwierdź instalację
6. Ikona pojawi się na ekranie głównym

---

## 🎯 Co Sprawdzić Teraz

1. **Otwórz aplikację na telefonie**
2. **Sprawdź czy URL zaczyna się od `https://`**
3. **Spróbuj znaleźć opcję instalacji** (menu lub udostępnij)
4. **Daj mi znać:**
   - Jaki masz telefon (Android/iOS)?
   - Jaką przeglądarkę używasz?
   - Czy widzisz menu "Udostępnij" lub "Menu" (3 kropki)?

---

## 💡 Wskazówka

**Na iOS opcja instalacji PWA jest zawsze w menu "Udostępnij"**, nie jako osobna opcja w menu przeglądarki.

**Na Android opcja może być w menu (3 kropki) jako "Dodaj do ekranu głównego"** lub jako banner na górze strony.



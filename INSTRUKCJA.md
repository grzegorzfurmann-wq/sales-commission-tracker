# 📋 Instrukcja Uruchomienia Aplikacji

## Krok 1: Zainstaluj Node.js
Jeśli jeszcze nie masz Node.js:
- Wejdź na https://nodejs.org/
- Pobierz wersję LTS (Long Term Support)
- Zainstaluj używając instalatora

## Krok 2: Otwórz Terminal
- Na Mac: Applications → Utilities → Terminal
- Lub naciśnij Cmd+Spacja i wpisz "Terminal"

## Krok 3: Przejdź do folderu projektu
W terminalu wpisz (lub skopiuj i wklej):

```bash
cd "/Users/gregfurmann/Desktop/Cursor AI"
```

Naciśnij Enter.

## Krok 4: Zainstaluj wszystkie potrzebne biblioteki
W terminalu wpisz:

```bash
npm run install-all
```

To może zająć kilka minut. Poczekaj aż zobaczysz komunikat o sukcesie.

## Krok 5: Uruchom aplikację
W terminalu wpisz:

```bash
npm run dev
```

## Krok 6: Otwórz przeglądarkę
Po uruchomieniu zobaczysz w terminalu coś takiego:
```
🚀 Serwer działa na porcie 5000
📊 API dostępne pod: http://localhost:5000/api
```

Otwórz przeglądarkę i wejdź na:
**http://localhost:3000**

## Co dalej?

### Jako Administrator:
1. Wybierz "Administrator" i kliknij "Zaloguj"
2. Możesz dodawać nowe umowy
3. Możesz zmieniać statusy umów (podpisana → opłacona → zaprocesowana)

### Jako Handlowiec:
1. Wybierz "Handlowiec" i wybierz siebie z listy
2. Kliknij "Zaloguj"
3. Zobaczysz swoje umowy i możesz dodawać do nich notatki

## Jak zatrzymać aplikację?
W terminalu naciśnij: **Ctrl + C**

## Problemy?
- Jeśli widzisz błąd, skopiuj go i sprawdź czy Node.js jest zainstalowany:
  ```bash
  node --version
  npm --version
  ```
- Jeśli te komendy nie działają, musisz zainstalować Node.js ponownie




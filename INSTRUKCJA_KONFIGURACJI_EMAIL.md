# 📧 Krok po Kroku: Konfiguracja Automatycznego Wysyłania Emaili

## KROK 1: Uzyskaj Hasło Aplikacji Gmail

### 1.1. Otwórz przeglądarkę i wejdź na:
```
https://myaccount.google.com/apppasswords
```

### 1.2. Zaloguj się na swoje konto Google
- Wprowadź email i hasło Gmail
- Jeśli masz włączoną weryfikację dwuetapową, potwierdź

### 1.3. Wybierz opcje:
- **Aplikacja:** Wybierz z listy → **"Poczta"**
- **Urządzenie:** Wybierz z listy → **"Inne"** (lub "Inne urządzenie")
  - W polu tekstowym wpisz: `System Prowizji` (lub cokolwiek)

### 1.4. Kliknij przycisk:
**"Generuj"** (lub "Generate")

### 1.5. Skopiuj hasło:
- Zobaczysz 16-znakowe hasło (np. `abcd efgh ijkl mnop`)
- **SKOPIUJ TO HASŁO** - będziesz go potrzebować w następnym kroku
- ⚠️ **WAŻNE:** To hasło pokazuje się tylko raz! Skopiuj je teraz.

---

## KROK 2: Otwórz Plik .env

### 2.1. Otwórz Terminal
- Naciśnij `Cmd + Spacja`
- Wpisz "Terminal" i naciśnij Enter

### 2.2. Przejdź do folderu server
W terminalu wpisz (lub skopiuj i wklej):
```bash
cd "/Users/gregfurmann/Desktop/Cursor AI/server"
```

Naciśnij Enter.

### 2.3. Otwórz plik .env w edytorze
W terminalu wpisz:
```bash
nano .env
```

Naciśnij Enter.

---

## KROK 3: Wypełnij Plik .env

### 3.1. Zobaczysz plik z taką zawartością:
```
# Konfiguracja emaila
# Wypełnij te wartości aby automatycznie wysyłać emaile
# Jeśli zostawisz puste, linki będą wyświetlane w konsoli

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
APP_URL=http://localhost:3000
```

### 3.2. Wypełnij SMTP_USER
- Znajdź linię: `SMTP_USER=`
- Usuń puste miejsce po znaku `=`
- Wpisz swój email Gmail, np.:
  ```
  SMTP_USER=twoj.email@gmail.com
  ```

### 3.3. Wypełnij SMTP_PASS
- Znajdź linię: `SMTP_PASS=`
- Usuń puste miejsce po znaku `=`
- Wklej hasło aplikacji z Kroku 1, np.:
  ```
  SMTP_PASS=abcd efgh ijkl mnop
  ```
  
  ⚠️ **UWAGA:** Jeśli hasło ma spacje, zostaw je! (np. `abcd efgh` jest OK)

### 3.4. Sprawdź czy wygląda tak:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=twoj.email@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
APP_URL=http://localhost:3000
```

### 3.5. Zapisz plik
- Naciśnij: `Ctrl + O` (litera O, nie zero)
- Naciśnij: `Enter` (żeby potwierdzić nazwę pliku)
- Naciśnij: `Ctrl + X` (żeby wyjść z edytora)

---

## KROK 4: Zrestartuj Serwer

### 4.1. Zatrzymaj serwer
- Znajdź terminal gdzie działa `npm run dev`
- Naciśnij: `Ctrl + C`

### 4.2. Uruchom ponownie
W terminalu wpisz:
```bash
cd "/Users/gregfurmann/Desktop/Cursor AI" && npm run dev
```

Naciśnij Enter.

### 4.3. Sprawdź czy działa
W terminalu powinieneś zobaczyć:
```
🚀 Serwer działa na porcie 5001
```

**NIE powinieneś widzieć:**
```
⚠️  Email nie jest skonfigurowany...
```

---

## KROK 5: Przetestuj

### 5.1. Zaloguj się jako administrator
- Otwórz przeglądarkę: http://localhost:3000
- Email: `grzegorz.furmann@gmail.com`
- Hasło: `Admin123!`

### 5.2. Utwórz konto handlowca
- Kliknij "Dodaj Nowego Handlowca"
- Wypełnij:
  - Imię i nazwisko: np. `Jan Kowalski`
  - Email: np. `jan.kowalski@firma.pl` (lub swój email do testu)
  - Prowizja: np. `15`
- Kliknij "Dodaj Handlowca"

### 5.3. Sprawdź email
- Otwórz skrzynkę email handlowca
- Powinien przyjść email z tematem: "Ustaw hasło do konta"
- W emailu będzie przycisk "Ustaw Hasło" i link

### 5.4. Sprawdź konsolę serwera
W terminalu powinieneś zobaczyć:
```
✅ Email wysłany do: jan.kowalski@firma.pl
   Link: http://localhost:3000?token=...
```

---

## Jeśli coś nie działa:

### Problem: Email nie przychodzi
1. **Sprawdź folder SPAM** w skrzynce email
2. **Sprawdź konsolę serwera** - czy widzisz błąd?
3. **Sprawdź czy plik .env jest poprawnie wypełniony**

### Problem: Błąd w konsoli
- Sprawdź czy hasło aplikacji jest poprawne
- Sprawdź czy email w SMTP_USER jest poprawny
- Upewnij się że nie ma dodatkowych spacji w pliku .env

### Problem: Nie mogę edytować pliku .env
- Użyj innego edytora: `open -e .env` (otworzy w TextEdit)
- Lub użyj: `code .env` (jeśli masz VS Code)

---

## Gotowe! 🎉

Teraz system automatycznie wysyła emaile z linkami do ustawienia hasła dla każdego nowego handlowca.




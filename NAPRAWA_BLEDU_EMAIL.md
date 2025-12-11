# 🔧 Naprawa Błędu: "Username and Password not accepted"

## Problem:
```
❌ Błąd wysyłania emaila: Invalid login: 535-5.7.8 Username and Password not accepted
```

## Możliwe przyczyny:

### 1. Hasło aplikacji jest nieprawidłowe
- Sprawdź czy skopiowałeś całe hasło (16 znaków)
- Upewnij się że nie ma dodatkowych spacji na początku/końcu

### 2. Weryfikacja dwuetapowa nie jest włączona
- Hasła aplikacji działają TYLKO gdy masz włączoną weryfikację dwuetapową
- Sprawdź: https://myaccount.google.com/security

### 3. Hasło aplikacji wygasło
- Wygeneruj nowe hasło aplikacji

## Rozwiązanie krok po kroku:

### Krok 1: Sprawdź weryfikację dwuetapową
1. Wejdź na: https://myaccount.google.com/security
2. Sprawdź czy "Weryfikacja dwuetapowa" jest **WŁĄCZONA**
3. Jeśli nie - włącz ją

### Krok 2: Wygeneruj nowe hasło aplikacji
1. Wejdź na: https://myaccount.google.com/apppasswords
2. Jeśli widzisz listę haseł - usuń stare
3. Wygeneruj nowe:
   - Aplikacja: **Poczta**
   - Urządzenie: **Inne** → wpisz "System Prowizji"
4. **Skopiuj hasło** (16 znaków, może mieć spacje)

### Krok 3: Popraw plik .env
1. Otwórz plik:
   ```bash
   cd "/Users/gregfurmann/Desktop/Cursor AI/server" && open -e .env
   ```

2. **WAŻNE:** Upewnij się że:
   - `SMTP_USER` ma poprawny email (bez spacji)
   - `SMTP_PASS` ma hasło aplikacji (może mieć spacje w środku, ale NIE na początku/końcu)
   - Nie ma dodatkowych spacji po znaku `=`

3. Przykład poprawnego pliku:
   ```
   SMTP_USER=grzegorz.furmann@gmail.com
   SMTP_PASS=tifh pnyf zvht rjpy
   ```

4. **NIE powinno być:**
   ```
   SMTP_PASS= tifh pnyf zvht rjpy    (spacja na początku)
   SMTP_PASS=tifh pnyf zvht rjpy     (spacja na końcu)
   ```

### Krok 4: Zrestartuj serwer
1. Zatrzymaj (Ctrl+C)
2. Uruchom ponownie: `npm run dev`

### Krok 5: Przetestuj
Utwórz konto handlowca i sprawdź czy email przychodzi.

## Jeśli nadal nie działa:

### Opcja A: Użyj Outlook (prostsze)
Zmień w `.env`:
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=twoj.email@outlook.com
SMTP_PASS=twoje_haslo_do_konta
```

### Opcja B: Tryb testowy
Zostaw puste pola - linki będą w konsoli, możesz je ręcznie wysłać.




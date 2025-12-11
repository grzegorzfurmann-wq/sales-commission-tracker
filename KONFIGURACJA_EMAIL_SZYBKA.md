# 📧 Szybka Konfiguracja Automatycznego Wysyłania Emaili

## Krok 1: Uzyskaj Hasło Aplikacji Gmail

1. **Wejdź na:** https://myaccount.google.com/apppasswords
2. **Zaloguj się** na swoje konto Google
3. **Wybierz:**
   - Aplikacja: **Poczta**
   - Urządzenie: **Inne** (wpisz np. "System Prowizji")
4. **Kliknij "Generuj"**
5. **Skopiuj 16-znakowe hasło** (np. `abcd efgh ijkl mnop`)

## Krok 2: Wypełnij Plik .env

1. **Otwórz plik `.env` w folderze `server/`:**
   ```bash
   cd "/Users/gregfurmann/Desktop/Cursor AI/server"
   nano .env
   ```
   
   Lub otwórz go w edytorze tekstu.

2. **Wypełnij te linie:**
   ```
   SMTP_USER=twoj.email@gmail.com
   SMTP_PASS=abcd efgh ijkl mnop
   ```
   
   (wklej swoje dane - email i hasło aplikacji)

3. **Zapisz plik**

## Krok 3: Zrestartuj Serwer

1. **Zatrzymaj serwer** (Ctrl+C w terminalu)
2. **Uruchom ponownie:**
   ```bash
   npm run dev
   ```

## Krok 4: Przetestuj

1. **Utwórz konto handlowca** w panelu administratora
2. **Sprawdź email handlowca** - powinien przyjść email z linkiem
3. **Sprawdź folder SPAM** jeśli nie widzisz emaila

## Sprawdzanie czy działa:

W terminalu serwera powinieneś zobaczyć:
```
✅ Email wysłany do: jan.kowalski@firma.pl
```

Zamiast:
```
📧 EMAIL DO WYSŁANIA: (link w konsoli)
```

## Problemy?

- **Email nie przychodzi?** Sprawdź folder SPAM
- **Błąd w konsoli?** Sprawdź czy hasło aplikacji jest poprawne
- **Nie działa?** Sprawdź czy plik `.env` jest w folderze `server/`




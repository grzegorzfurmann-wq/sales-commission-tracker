# 📧 Konfiguracja Wysyłania Emaili

## Jak skonfigurować wysyłanie emaili?

System wysyła emaile z linkami do ustawienia hasła dla handlowców. Aby to działało, musisz skonfigurować serwer SMTP.

### Opcja 1: Gmail (Najłatwiejsze)

1. **Włącz hasło aplikacji w Gmail:**
   - Wejdź na: https://myaccount.google.com/apppasswords
   - Zaloguj się na swoje konto Google
   - Wybierz "Aplikacja" i "Poczta"
   - Wybierz "Urządzenie" (np. "Inne")
   - Kliknij "Generuj"
   - Skopiuj wygenerowane hasło (16 znaków)

2. **Ustaw zmienne środowiskowe:**
   
   Utwórz plik `.env` w folderze `server/`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=twoj.email@gmail.com
   SMTP_PASS=twoje_haslo_aplikacji
   APP_URL=http://localhost:3000
   ```

### Opcja 2: Outlook/Hotmail

Utwórz plik `.env` w folderze `server/`:
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=twoj.email@outlook.com
SMTP_PASS=twoje_haslo
APP_URL=http://localhost:3000
```

### Opcja 3: Inny serwer SMTP

Dostosuj ustawienia w pliku `.env`:
```
SMTP_HOST=twoj.serwer.smtp.pl
SMTP_PORT=587
SMTP_USER=twoj.email@domena.pl
SMTP_PASS=twoje_haslo
APP_URL=http://localhost:3000
```

## Uruchomienie z konfiguracją

Po utworzeniu pliku `.env`, zrestartuj serwer:
```bash
npm run dev
```

## Tryb testowy (bez konfiguracji email)

Jeśli nie skonfigurujesz emaila, system będzie wyświetlał linki w konsoli serwera zamiast wysyłać emaile. To jest przydatne do testowania.

## Ważne:

- **APP_URL** - to adres Twojej aplikacji (dla produkcji zmień na rzeczywisty adres)
- **SMTP_PASS** - dla Gmail użyj hasła aplikacji, NIE hasła do konta
- Linki są ważne przez 24 godziny




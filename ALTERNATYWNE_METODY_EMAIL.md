# 📧 Alternatywne Metody Wysyłania Emaili

## Problem: Nie mogę wygenerować hasła aplikacji Gmail

Jeśli nie widzisz opcji "Urządzenie" i "Generuj" w Google App Passwords, możesz:

### Opcja 1: Włącz Weryfikację Dwuetapową (Wymagane)

Hasła aplikacji działają tylko gdy masz włączoną weryfikację dwuetapową:

1. **Wejdź na:** https://myaccount.google.com/security
2. **Znajdź:** "Weryfikacja dwuetapowa" (Two-step verification)
3. **Włącz** weryfikację dwuetapową
4. **Wróć do:** https://myaccount.google.com/apppasswords
5. **Teraz powinieneś zobaczyć** opcję generowania hasła

### Opcja 2: Użyj Innego Serwisu Email (Prostsze)

Zamiast Gmail, możesz użyć:

#### Outlook/Hotmail:
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=twoj.email@outlook.com
SMTP_PASS=twoje_haslo_do_konta
```

#### SendGrid (Darmowy do 100 emaili/dzień):
1. Zarejestruj się na: https://sendgrid.com
2. Utwórz API Key
3. Użyj konfiguracji SendGrid

### Opcja 3: Użyj Trybu Testowego (Bez Konfiguracji)

Możesz zostawić puste pola w `.env` - system będzie wyświetlał linki w konsoli serwera, które możesz ręcznie wysłać handlowcom.

---

## Najprostsze Rozwiązanie: Outlook

Jeśli masz konto Outlook/Hotmail:

1. Otwórz plik `.env`:
   ```bash
   cd "/Users/gregfurmann/Desktop/Cursor AI/server" && open -e .env
   ```

2. Zmień na:
   ```
   SMTP_HOST=smtp-mail.outlook.com
   SMTP_PORT=587
   SMTP_USER=twoj.email@outlook.com
   SMTP_PASS=twoje_haslo_do_konta_outlook
   APP_URL=http://localhost:3000
   ```

3. Zrestartuj serwer

---

## Co wybrać?

- **Gmail:** Wymaga weryfikacji dwuetapowej + hasła aplikacji
- **Outlook:** Wystarczy hasło do konta (prostsze)
- **Tryb testowy:** Linki w konsoli (najprostsze, ale ręczne)




# 📧 Sprawdzanie i Konfiguracja Emaila

## Problem: Email nie przychodzi

### Krok 1: Sprawdź konsolę serwera

Gdy tworzysz konto handlowca, sprawdź terminal gdzie działa serwer (`npm run dev`). 

**Jeśli email NIE jest skonfigurowany**, zobaczysz:
```
📧 EMAIL DO WYSŁANIA:
   Do: jan.kowalski@firma.pl
   Temat: Ustaw hasło do konta
   Link: http://localhost:3000?token=abc123...
```

**Skopiuj ten link i wyślij go handlowcowi ręcznie!**

### Krok 2: Sprawdź czy email jest skonfigurowany

Sprawdź czy w terminalu serwera widzisz:
- `⚠️  Email nie jest skonfigurowany...` - oznacza że musisz skonfigurować
- `✅ Email wysłany do: ...` - oznacza że email został wysłany

### Krok 3: Skonfiguruj email (opcjonalnie)

Aby automatycznie wysyłać emaile:

1. **Utwórz plik `.env` w folderze `server/`:**

```bash
cd "/Users/gregfurmann/Desktop/Cursor AI/server"
nano .env
```

2. **Wklej konfigurację (dla Gmail):**

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=twoj.email@gmail.com
SMTP_PASS=haslo_aplikacji_gmail
APP_URL=http://localhost:3000
```

3. **Dla Gmail - jak uzyskać hasło aplikacji:**
   - Wejdź na: https://myaccount.google.com/apppasswords
   - Zaloguj się
   - Wybierz "Aplikacja": Poczta
   - Wybierz "Urządzenie": Inne (nazwa dowolna)
   - Kliknij "Generuj"
   - Skopiuj 16-znakowe hasło i wklej do `.env` jako `SMTP_PASS`

4. **Zrestartuj serwer:**
   ```bash
   # Zatrzymaj (Ctrl+C) i uruchom ponownie
   npm run dev
   ```

### Krok 4: Sprawdź folder SPAM

Jeśli email jest wysyłany, ale nie przychodzi:
- Sprawdź folder SPAM/Śmieci
- Sprawdź czy adres email jest poprawny
- Sprawdź logi serwera czy są błędy

### Krok 5: Test ręczny

Możesz ręcznie wysłać link handlowcowi:
1. Sprawdź konsolę serwera po utworzeniu konta
2. Skopiuj link z konsoli
3. Wyślij go handlowcowi przez email/SMS/komunikator

## Szybkie rozwiązanie (bez konfiguracji email)

1. Utwórz konto handlowca
2. Sprawdź konsolę serwera - zobaczysz link
3. Skopiuj link i wyślij go handlowcowi
4. Handlowiec klika link i ustawia hasło




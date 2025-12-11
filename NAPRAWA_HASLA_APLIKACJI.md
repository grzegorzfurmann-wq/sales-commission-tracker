# 🔑 Naprawa Hasła Aplikacji Gmail

## Problem: Hasło aplikacji nie działa mimo włączonej weryfikacji dwuetapowej

## Rozwiązanie: Wygeneruj nowe hasło aplikacji

### Krok 1: Usuń stare hasło aplikacji
1. Wejdź na: https://myaccount.google.com/apppasswords
2. Znajdź hasło aplikacji które właśnie używasz
3. Kliknij ikonę kosza (usuń)
4. Potwierdź usunięcie

### Krok 2: Wygeneruj nowe hasło
1. Na tej samej stronie kliknij "Wybierz aplikację" → **"Poczta"**
2. Kliknij "Wybierz urządzenie" → **"Inne"**
3. Wpisz: `System Prowizji`
4. Kliknij **"Generuj"**

### Krok 3: Skopiuj hasło
- Zobaczysz 16-znakowe hasło
- **WAŻNE:** Skopiuj je dokładnie - może mieć spacje lub nie
- Przykład: `abcd efgh ijkl mnop` LUB `abcdefghijklmnop`

### Krok 4: Zaktualizuj plik .env

Otwórz plik:
```bash
cd "/Users/gregfurmann/Desktop/Cursor AI/server" && open -e .env
```

Zmień linię `SMTP_PASS=` na nowe hasło:

**Jeśli hasło ma spacje:**
```
SMTP_PASS=abcd efgh ijkl mnop
```

**Jeśli hasło NIE ma spacji:**
```
SMTP_PASS=abcdefghijklmnop
```

**WAŻNE:** 
- NIE dodawaj spacji na początku lub końcu
- Skopiuj hasło dokładnie tak jak jest wyświetlone

### Krok 5: Zrestartuj serwer
1. Zatrzymaj (Ctrl+C)
2. Uruchom: `npm run dev`

### Krok 6: Przetestuj
Utwórz konto handlowca i sprawdź czy email przychodzi.

---

## Jeśli nadal nie działa - użyj Outlook

Outlook jest prostszy - używa zwykłego hasła do konta:

1. Otwórz `.env`:
   ```bash
   cd "/Users/gregfurmann/Desktop/Cursor AI/server" && open -e .env
   ```

2. Zmień na:
   ```
   SMTP_HOST=smtp-mail.outlook.com
   SMTP_PORT=587
   SMTP_USER=twoj.email@outlook.com
   SMTP_PASS=twoje_haslo_do_konta_outlook
   ```

3. Zapisz i zrestartuj serwer




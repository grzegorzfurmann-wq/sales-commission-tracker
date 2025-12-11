# 🔍 Diagnostyka Problemu z Emailami

## Sprawdź konsolę serwera

Po utworzeniu konta handlowca, sprawdź terminal gdzie działa serwer (`npm run dev`).

### Co powinieneś zobaczyć jeśli działa:
```
✅ Email wysłany do: email.handlowca@firma.pl
   Link: http://localhost:3000?token=...
   Message ID: <...>
```

### Co zobaczysz jeśli NIE działa:
```
❌ Błąd wysyłania emaila: ...
   Pełny błąd: ...
```

## Możliwe problemy:

### 1. Email przychodzi do SPAM
- **Sprawdź folder SPAM/Śmieci** w skrzynce email handlowca
- Email może być oznaczony jako spam

### 2. Błąd w konsoli serwera
- Jeśli widzisz błąd, skopiuj go i sprawdź:
  - Czy hasło aplikacji jest poprawne
  - Czy email w SMTP_USER jest poprawny
  - Czy weryfikacja dwuetapowa jest włączona

### 3. Link jest w konsoli (tryb testowy)
- Jeśli widzisz: `📧 LINK DO WYSŁANIA RĘCZNIE:`
- Skopiuj link i wyślij go handlowcowi ręcznie

## Co zrobić teraz:

1. **Sprawdź konsolę serwera** - co tam widzisz?
2. **Sprawdź folder SPAM** w skrzynce email
3. **Skopiuj link z konsoli** jeśli jest wyświetlony
4. **Sprawdź czy email jest poprawny** - czy na pewno istnieje?

## Szybkie rozwiązanie:

Jeśli email nie przychodzi, ale widzisz link w konsoli:
1. Skopiuj link z konsoli serwera
2. Wyślij go handlowcowi przez:
   - Email (ręcznie)
   - SMS
   - Komunikator (WhatsApp, Messenger, etc.)

Handlowiec może użyć tego linku do ustawienia hasła.




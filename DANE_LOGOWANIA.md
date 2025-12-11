# 🔐 Dane Logowania Administratora

## Konto Administratora

**Email:** `grzegorz.furmann@gmail.com`  
**Domyślne hasło:** `Admin123!`

⚠️ **WAŻNE:** Po pierwszym logowaniu **ZMIEŃ HASŁO** na bezpieczne!

## Jak zmienić hasło?

1. Zaloguj się jako administrator
2. W panelu administracyjnym kliknij przycisk **"🔒 Zmień hasło"**
3. Wprowadź:
   - Obecne hasło (Admin123!)
   - Nowe hasło (minimum 6 znaków)
   - Potwierdź nowe hasło
4. Kliknij "Zmień hasło"

## Bezpieczeństwo

- Hasła są przechowywane w zaszyfrowanej formie (bcrypt)
- Hasło musi mieć minimum 6 znaków
- Zalecane: użyj silnego hasła z wielkimi literami, cyframi i znakami specjalnymi

## Dodatkowe konta administratorów

Aby utworzyć nowe konto administratora, użyj endpointu API:

```bash
POST /api/admin/register
{
  "email": "nowy@email.pl",
  "password": "haslo123",
  "name": "Imię Nazwisko"
}
```

Lub skontaktuj się z administratorem systemu.




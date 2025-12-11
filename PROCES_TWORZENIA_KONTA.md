# 📋 Proces Tworzenia Konta Handlowca

## Jak działa system (dokładnie tak jak chcesz):

### 1. Admin tworzy konto
- Admin loguje się do panelu
- Klika "Dodaj Nowego Handlowca"
- Wypełnia formularz:
  - Imię i nazwisko handlowca
  - **Email handlowca** (ten email dostanie link)
  - Stawka prowizji
- Kliknie "Dodaj Handlowca"

### 2. System automatycznie wysyła email
- System generuje bezpieczny token
- **Automatycznie wysyła email** na adres handlowca z linkiem
- Email zawiera przycisk "Ustaw Hasło" i link

### 3. Handlowiec klika link
- Handlowiec otwiera email
- Klika w link "Ustaw Hasło"
- Otwiera się formularz ustawiania hasła

### 4. Handlowiec ustawia swoje hasło
- Wprowadza **nowe hasło** (minimum 6 znaków)
- **Potwierdza hasło** (drugi raz, żeby sprawdzić czy są takie same)
- System sprawdza czy hasła są identyczne
- Jeśli tak - hasło zostaje zapisane

### 5. Handlowiec loguje się
- Handlowiec wraca do strony logowania
- Wprowadza:
  - **Email** (ten sam co podał adminowi)
  - **Hasło** (to które właśnie ustawił)
- Kliknie "Zaloguj"
- Zostaje zalogowany do systemu

## Ważne wyjaśnienie:

**Hasło Gmail (SMTP_PASS)** - to jest tylko do WYSYŁANIA emaili przez serwer. 
- Używa go system, żeby wysłać email z linkiem
- **NIE jest używane do logowania**
- Handlowiec go nie widzi i nie używa

**Hasło handlowca** - to jest hasło które handlowiec ustawia sam:
- Ustawia je przez link z emaila
- Używa go do logowania do systemu
- Tylko handlowiec je zna

## Konfiguracja (tylko raz):

Aby system automatycznie wysyłał emaile, musisz skonfigurować SMTP w pliku `server/.env`:

```
SMTP_USER=twoj.email@gmail.com
SMTP_PASS=haslo_aplikacji_gmail
```

To pozwala systemowi WYSYŁAĆ emaile. Handlowcy nie używają tego hasła do logowania!

## Test procesu:

1. Zaloguj się jako admin
2. Utwórz konto handlowca (podaj email)
3. Sprawdź email handlowca (lub konsolę serwera jeśli email nie skonfigurowany)
4. Kliknij link i ustaw hasło
5. Zaloguj się jako handlowiec używając emaila i hasła




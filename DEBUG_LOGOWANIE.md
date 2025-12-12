# 🔍 Debugowanie Logowania Handlowców

## ❌ Problem: Logowanie handlowców nie działa

Sprawdzam co może być nie tak.

---

## 🔍 Diagnostyka

### 1. Sprawdź Czy Konto Istnieje

**W panelu admina:**
- Sprawdź listę handlowców
- Znajdź handlowca który próbuje się zalogować
- Sprawdź jego email

### 2. Sprawdź Czy Ma Ustawione Hasło

**W bazie danych:**
- Jeśli `password_hash` jest `null` → handlowiec musi najpierw ustawić hasło
- Jeśli `password_hash` istnieje → handlowiec może się zalogować

### 3. Sprawdź Błędy w Konsoli

**W przeglądarce (DevTools):**
- Otwórz DevTools (F12)
- Przejdź do zakładki "Console"
- Spróbuj się zalogować
- Sprawdź czy są błędy (czerwone komunikaty)

### 4. Sprawdź Request w Network

**W przeglądarce (DevTools):**
- Przejdź do zakładki "Network"
- Spróbuj się zalogować
- Sprawdź request do `/api/login`
- Sprawdź status odpowiedzi (200 = OK, 401 = błąd autoryzacji)
- Sprawdź odpowiedź serwera

---

## 🎯 Możliwe Problemy

### Problem 1: Handlowiec Nie Ma Hasła

**Objawy:**
- Błąd: "Musisz najpierw ustawić hasło. Sprawdź email z linkiem do ustawienia hasła."

**Rozwiązanie:**
- Handlowiec musi ustawić hasło przez link z emaila
- LUB admin może utworzyć nowe hasło dla handlowca

### Problem 2: Nieprawidłowe Hasło

**Objawy:**
- Błąd: "Nieprawidłowy email lub hasło"

**Rozwiązanie:**
- Sprawdź czy hasło jest poprawne
- LUB zresetuj hasło

### Problem 3: Konto Nie Istnieje

**Objawy:**
- Błąd: "Nieprawidłowy email lub konto nie istnieje"

**Rozwiązanie:**
- Sprawdź czy email jest poprawny
- Sprawdź czy handlowiec istnieje w bazie

---

## 📝 Daj Mi Znać

**Co widzisz gdy próbujesz się zalogować?**
- Jaki błąd się pojawia?
- Jaki email używasz?
- Czy handlowiec ma ustawione hasło?

**Na podstawie tego pomogę Ci to naprawić!**


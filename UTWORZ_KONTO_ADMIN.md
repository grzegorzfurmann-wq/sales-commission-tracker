# 🔐 Utworzenie Konta Administratora

## ❌ Problem: "Nieprawidłowy email lub konto nie istnieje"

To oznacza, że konto administratora nie istnieje w bazie danych.

---

## ✅ Rozwiązanie: Utwórz Konto Administratora

### OPCJA 1: Przez API (Najprostsze)

**Spróbuję utworzyć konto przez API.**

Jeśli to nie zadziała, użyjemy OPCJI 2.

---

### OPCJA 2: Sprawdź Domyślne Dane Logowania

Backend automatycznie tworzy konto administratora przy starcie:
- **Email:** `grzegorz.furmann@gmail.com`
- **Hasło:** `Admin123!`

**Spróbuj zalogować się tymi danymi.**

---

### OPCJA 3: Problem z SQLite na Render

SQLite na Render może nie zapisywać danych (tylko do odczytu).

**Rozwiązanie:** Użyj zewnętrznej bazy danych (Supabase, MongoDB Atlas, itp.)

---

## 🎯 Co Teraz?

1. **Spróbuj zalogować się:**
   - Email: `grzegorz.furmann@gmail.com`
   - Hasło: `Admin123!`

2. **Jeśli nie działa**, daj mi znać - utworzę konto przez API lub skonfiguruję zewnętrzną bazę danych.

---

## 📝 Daj Mi Znać

**Co się dzieje gdy próbujesz się zalogować?**
- Czy widzisz ten sam błąd?
- Czy możesz spróbować z email: `grzegorz.furmann@gmail.com` i hasłem: `Admin123!`?

**Pomogę Ci to naprawić!**


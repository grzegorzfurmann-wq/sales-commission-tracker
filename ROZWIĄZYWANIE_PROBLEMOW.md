# 🔧 Rozwiązywanie Problemów z Logowaniem

## Problem: Logowanie administratora nie działa

### Rozwiązanie 1: Ręczne utworzenie konta administratora

Jeśli konto administratora nie zostało utworzone automatycznie, możesz je utworzyć ręcznie:

1. **Zatrzymaj serwer** (Ctrl+C w terminalu)

2. **Uruchom skrypt tworzący konto:**
   ```bash
   cd "/Users/gregfurmann/Desktop/Cursor AI"
   cd server
   node create-admin.js
   ```

3. **Uruchom ponownie aplikację:**
   ```bash
   cd ..
   npm run dev
   ```

### Rozwiązanie 2: Sprawdź czy bcrypt jest zainstalowany

```bash
cd "/Users/gregfurmann/Desktop/Cursor AI"
cd server
npm list bcrypt
```

Jeśli nie jest zainstalowany:
```bash
npm install bcrypt
```

### Rozwiązanie 3: Sprawdź logi serwera

Gdy uruchamiasz aplikację (`npm run dev`), sprawdź w terminalu czy widzisz:
- ✅ `Utworzono konto administratora dla: grzegorz.furmann@gmail.com`
- Lub: ℹ️ `Konto administratora już istnieje`

Jeśli widzisz błędy (❌), skopiuj je i sprawdź co jest nie tak.

### Rozwiązanie 4: Sprawdź dane logowania

**Email:** `grzegorz.furmann@gmail.com`  
**Hasło:** `Admin123!`

Upewnij się, że:
- Email jest wpisany dokładnie (bez spacji)
- Hasło zawiera wielką literę, cyfrę i znak specjalny (!)
- Nie ma dodatkowych spacji

### Rozwiązanie 5: Sprawdź konsolę przeglądarki

1. Otwórz przeglądarkę (F12 lub Cmd+Option+I na Mac)
2. Przejdź do zakładki "Console"
3. Spróbuj się zalogować
4. Sprawdź czy są jakieś błędy (czerwone komunikaty)

### Rozwiązanie 6: Sprawdź czy serwer działa

Upewnij się, że widzisz w terminalu:
```
🚀 Serwer działa na porcie 5000
📊 API dostępne pod: http://localhost:5000/api
```

Jeśli nie widzisz tego komunikatu, serwer nie działa poprawnie.

### Rozwiązanie 7: Usuń i utwórz ponownie bazę danych

⚠️ **UWAGA:** To usunie wszystkie dane!

```bash
cd "/Users/gregfurmann/Desktop/Cursor AI"
cd server
rm database.sqlite
cd ..
npm run dev
```

Baza danych zostanie utworzona ponownie z przykładowymi danymi.

## Sprawdzenie czy konto istnieje w bazie

Możesz sprawdzić czy konto zostało utworzone używając SQLite:

```bash
cd "/Users/gregfurmann/Desktop/Cursor AI/server"
sqlite3 database.sqlite "SELECT * FROM administrators;"
```

Powinieneś zobaczyć:
```
1|grzegorz.furmann@gmail.com|$2b$10$...|Grzegorz Furmann|2024-...
```

## Kontakt

Jeśli żadne z powyższych rozwiązań nie pomaga, sprawdź:
1. Czy Node.js jest zainstalowany: `node --version`
2. Czy wszystkie zależności są zainstalowane: `npm run install-all`
3. Czy porty 3000 i 5000 są wolne




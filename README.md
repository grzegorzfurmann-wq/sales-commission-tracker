# 💰 System Prowizji Handlowców

Aplikacja webowa do śledzenia umów i prowizji dla handlowców w czasie rzeczywistym.

## 🎯 Funkcjonalności

### Panel Administracyjny
- **Dodawanie umów** - administrator może dodawać nowe umowy dla dowolnego handlowca
- **Zarządzanie statusami** - zmiana statusów umów (podpisana → opłacona → zaprocesowana)
- **Przegląd wszystkich umów** - widok wszystkich umów w systemie z informacją o handlowcach
- **Podgląd notatek handlowców** - administrator widzi notatki dodane przez handlowców

### Panel Handlowca
- **Dashboard handlowca** - przegląd wszystkich swoich umów i zarobionej prowizji
- **Statusy umów** - podgląd umów w statusach: podpisane, opłacone, zaprocesowane
- **Kalkulacja prowizji** - automatyczne obliczanie prowizji w czasie rzeczywistym
- **Dodawanie notatek** - handlowiec może dodawać i edytować notatki do swoich umów
- **Statystyki** - szczegółowe statystyki prowizji według statusów

## 🚀 Jak uruchomić

### 1. Zainstaluj zależności

```bash
npm run install-all
```

### 2. Uruchom aplikację (backend + frontend)

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### 3. Alternatywnie - uruchom osobno

**Backend:**
```bash
cd server
npm install
npm start
```

**Frontend:**
```bash
cd client
npm install
npm start
```

## 📁 Struktura projektu

```
sales-commission-tracker/
├── server/              # Backend (Node.js + Express)
│   ├── index.js        # Główny plik serwera
│   └── database.sqlite # Baza danych SQLite
├── client/             # Frontend (React)
│   ├── src/
│   │   ├── App.js
│   │   └── components/
│   └── public/
└── package.json
```

## 🛠️ Technologie

- **Frontend**: React, CSS3
- **Backend**: Node.js, Express
- **Baza danych**: SQLite
- **API**: RESTful API
- **Bezpieczeństwo**: bcrypt (hashowanie haseł)

## 📊 Statusy umów

- **Podpisana** (`signed`) - umowa została podpisana, czeka na płatność
- **Opłacona** (`paid`) - umowa została opłacona, czeka na procesowanie
- **Zaprocesowana** (`processed`) - umowa została zaprocesowana, prowizja wypłacona

## 💡 Jak używać

### Logowanie

#### Administrator
1. Wybierz typ użytkownika: **Administrator**
2. Wprowadź **email** i **hasło**
3. Kliknij "Zaloguj"

**Domyślne konto administratora:**
- Email: `grzegorz.furmann@gmail.com`
- Hasło: `Admin123!`
- ⚠️ **Pamiętaj, aby zmienić hasło po pierwszym logowaniu!**

#### Handlowiec
1. Wybierz typ użytkownika: **Handlowiec**
2. Wybierz swojego handlowca z listy
3. Kliknij "Zaloguj"

### Panel Administracyjny
1. **Zmiana hasła**: Kliknij "🔒 Zmień hasło" aby ustawić nowe bezpieczne hasło
2. **Dodawanie umowy**: Kliknij "Dodaj Nową Umowę", wybierz handlowca, wypełnij dane i zapisz
3. **Zmiana statusu**: Na karcie umowy kliknij odpowiedni przycisk (Opłacona/Zaprocesowana)
4. **Przegląd**: Zobacz wszystkie umowy w systemie z informacją o handlowcach i ich notatkach

### Panel Handlowca
1. **Dashboard**: Zobacz podsumowanie swoich umów i zarobionej prowizji
2. **Notatki**: Kliknij "Dodaj notatki" lub "Edytuj notatki" na karcie umowy, aby dodać informacje o umowie
3. **Statystyki**: Sprawdź szczegółowe statystyki prowizji według statusów
4. Prowizja jest automatycznie przeliczana w czasie rzeczywistym

## 🔧 Konfiguracja

Stawki prowizji dla handlowców można ustawić w bazie danych lub dodać interfejs do ich edycji.

## 📝 Notatki

- Aplikacja używa SQLite jako bazy danych (pliki w folderze `server/`)
- Przykładowe dane są automatycznie dodawane przy pierwszym uruchomieniu
- Wszystkie kwoty są wyświetlane w PLN


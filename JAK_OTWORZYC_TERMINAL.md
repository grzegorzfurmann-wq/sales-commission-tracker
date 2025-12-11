# 💻 Jak Otworzyć Terminal i Wkleić Komendy

## 🖥️ Krok 1: Otwórz Terminal

### Metoda 1: Spotlight (Najszybsza)
1. Naciśnij **Cmd + Spacja** (Command + Spacja)
2. Wpisz: **Terminal**
3. Naciśnij **Enter**

### Metoda 2: Finder
1. Otwórz **Finder**
2. Przejdź do **Aplikacje** → **Narzędzia** (Applications → Utilities)
3. Kliknij **Terminal**

### Metoda 3: Launchpad
1. Naciśnij **F4** lub zrób gest 4 palcami na trackpadzie
2. Wpisz: **Terminal**
3. Kliknij ikonę Terminala

---

## 📋 Krok 2: Wklej Komendy

### Opcja A: Skopiuj i Wklej (Najprostsze)

1. **Skopiuj** komendę (Cmd + C):
   ```bash
   cd "/Users/gregfurmann/Desktop/Cursor AI"
   npm run install-all
   ```

2. **W Terminalu:**
   - Kliknij w okno Terminala
   - Wklej komendę (Cmd + V)
   - Naciśnij **Enter**

### Opcja B: Wpisz Ręcznie

1. W Terminalu wpisz:
   ```bash
   cd "/Users/gregfurmann/Desktop/Cursor AI"
   ```
   Naciśnij **Enter**

2. Potem wpisz:
   ```bash
   npm run install-all
   ```
   Naciśnij **Enter**

---

## ✅ Co Zobaczysz

Po wklejeniu komendy zobaczysz coś takiego:

```
> sales-commission-tracker@1.0.0 install-all
> npm install && cd server && npm install && cd ../client && npm install

added 70 packages...
added 25 packages...
added 1500 packages...
```

To może zająć **2-5 minut** - poczekaj aż się skończy! ⏳

---

## 🎯 Szybki Start

1. **Otwórz Terminal** (Cmd + Spacja → Terminal)
2. **Skopiuj i wklej:**
   ```bash
   cd "/Users/gregfurmann/Desktop/Cursor AI" && npm run install-all
   ```
3. **Naciśnij Enter**
4. **Poczekaj** aż się skończy

---

## 📸 Jak Wygląda Terminal?

Terminal wygląda jak czarne okno z tekstem, np.:

```
Last login: Mon Jan 15 10:30:45 on ttys000
gregfurmann@MacBook-Pro ~ %
```

Po wklejeniu komendy zobaczysz:

```
gregfurmann@MacBook-Pro ~ % cd "/Users/gregfurmann/Desktop/Cursor AI"
gregfurmann@MacBook-Pro Cursor AI % npm run install-all
```

---

## ❓ Problemy?

### Problem: "command not found: npm"
**Rozwiązanie:** Zainstaluj Node.js z https://nodejs.org

### Problem: "No such file or directory"
**Rozwiązanie:** Sprawdź czy folder istnieje:
```bash
ls "/Users/gregfurmann/Desktop/Cursor AI"
```

### Problem: Nie mogę wkleić (Cmd + V nie działa)
**Rozwiązanie:** 
- Kliknij prawym przyciskiem w Terminalu → "Paste"
- Lub: Edit → Paste

---

## 🎉 Gotowe!

Po zakończeniu instalacji możesz uruchomić aplikację:
```bash
npm run dev
```



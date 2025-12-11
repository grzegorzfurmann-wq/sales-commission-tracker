# 🔧 Naprawa Uprawnień Netlify

## ❌ Problem: EACCES przy netlify login

Netlify nie ma uprawnień do zapisu w folderze konfiguracyjnym.

---

## ✅ Rozwiązanie: Napraw Uprawnienia

W Terminalu wklej te komendy **jedna po drugiej**:

### Krok 1: Utwórz folder jeśli nie istnieje

```bash
mkdir -p ~/.config/netlify
```

### Krok 2: Napraw uprawnienia

```bash
sudo chown -R $(whoami) ~/.config/netlify
```

**Wpisz hasło** gdy poprosi.

### Krok 3: Napraw uprawnienia do Preferences

```bash
sudo chown -R $(whoami) ~/Library/Preferences/netlify 2>/dev/null || mkdir -p ~/Library/Preferences/netlify && sudo chown -R $(whoami) ~/Library/Preferences/netlify
```

**Wpisz hasło** gdy poprosi.

### Krok 4: Teraz spróbuj ponownie

```bash
netlify login
```

---

## 🎯 Szybka Wersja (Wszystko Razem)

Możesz wkleić wszystko razem:

```bash
mkdir -p ~/.config/netlify && sudo chown -R $(whoami) ~/.config/netlify && mkdir -p ~/Library/Preferences/netlify && sudo chown -R $(whoami) ~/Library/Preferences/netlify && netlify login
```

**Wpisz hasło** gdy poprosi (może poprosić 2 razy).

---

## ✅ Po Naprawie

Po wykonaniu powyższych komend, `netlify login` powinno działać!

Potem kontynuuj:
```bash
cd "/Users/gregfurmann/Desktop/Cursor AI"
netlify init
netlify deploy --prod
```



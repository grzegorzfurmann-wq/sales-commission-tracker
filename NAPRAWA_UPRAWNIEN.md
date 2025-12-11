# 🔧 Naprawa Problemów z Uprawnieniami

## ❌ Problem: EACCES (Permission Denied)

To oznacza, że npm nie ma uprawnień do instalacji globalnych pakietów.

---

## ✅ Rozwiązanie 1: Użyj sudo (Szybkie)

W Terminalu wklej:

```bash
sudo npm install -g netlify-cli
```

**Co się stanie:**
- Poprosi Cię o hasło (hasło do Twojego konta Mac)
- Wpisz hasło (nie zobaczysz znaków podczas wpisywania - to normalne)
- Naciśnij Enter

**Uwaga:** To rozwiązanie działa, ale nie jest idealne (używa sudo).

---

## ✅ Rozwiązanie 2: Napraw Uprawnienia npm (Zalecane)

### Krok 1: Utwórz folder dla globalnych pakietów

W Terminalu wklej:

```bash
mkdir ~/.npm-global
```

### Krok 2: Skonfiguruj npm

W Terminalu wklej:

```bash
npm config set prefix '~/.npm-global'
```

### Krok 3: Dodaj do PATH

W Terminalu wklej:

```bash
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
```

### Krok 4: Załaduj nową konfigurację

W Terminalu wklej:

```bash
source ~/.zshrc
```

### Krok 5: Teraz zainstaluj Netlify CLI

W Terminalu wklej:

```bash
npm install -g netlify-cli
```

**To powinno działać bez sudo!** ✅

---

## 🎯 Szybkie Rozwiązanie (Dla Teraz)

Jeśli chcesz szybko kontynuować, użyj **Rozwiązania 1** (sudo):

```bash
sudo npm install -g netlify-cli
```

Potem wpisz hasło i naciśnij Enter.

---

## 📝 Co Dalej?

Po zainstalowaniu Netlify CLI, kontynuuj:

```bash
netlify login
cd "/Users/gregfurmann/Desktop/Cursor AI"
netlify init
netlify deploy --prod
```

---

## ❓ Dlaczego To Się Dzieje?

Na macOS, domyślnie npm próbuje instalować globalne pakiety w `/usr/local/lib/node_modules`, co wymaga uprawnień administratora. Rozwiązanie 2 tworzy własny folder, który nie wymaga sudo.



# 🚀 Wdrożenie Frontendu na Netlify - Ręczne

## ❌ Nie Masz Opcji "Trigger Deploys"?

To oznacza, że Netlify nie jest połączony z GitHub lub musisz wdrożyć ręcznie.

---

## 📋 KROK PO KROKU: Wdrożenie Ręczne

### KROK 1: Zbuduj Frontend Lokalnie

Najpierw musimy zbudować frontend:

```bash
cd "/Users/gregfurmann/Desktop/Cursor AI/client"
npm install
npm run build
```

To utworzy folder `client/build` z gotowym frontendem.

---

### KROK 2: Wdróż przez Netlify CLI

Jeśli masz zainstalowany Netlify CLI:

```bash
cd "/Users/gregfurmann/Desktop/Cursor AI"
netlify deploy --prod --dir=client/build
```

---

### KROK 3: LUB Wdróż przez Netlify Dashboard

1. **Otwórz:** https://app.netlify.com
2. **Znajdź projekt** `heartfelt-mousse-471992`
3. **Kliknij "Sites"** → **"Add new site"** → **"Deploy manually"**
4. **LUB** jeśli masz już projekt, kliknij na niego
5. **Przeciągnij folder `client/build`** na stronę Netlify
6. **Netlify wdroży frontend**

---

## 🎯 Najprostsze: Połącz z GitHub

Jeśli chcesz automatyczne wdrożenia:

1. **W Netlify Dashboard** → **Settings** → **Build & deploy**
2. **Kliknij "Connect to Git provider"**
3. **Wybierz "GitHub"** i autoryzuj
4. **Wybierz repozytorium:** `sales-commission-tracker`
5. **Ustaw:**
   - Build command: `cd client && npm install && npm run build`
   - Publish directory: `client/build`
6. **Kliknij "Deploy site"**

---

## 📝 Co Teraz?

**Wybierz opcję:**
1. **Zbuduj lokalnie i wdróż ręcznie** (KROK 1-2)
2. **Połącz z GitHub** (KROK 3) - automatyczne wdrożenia

**Daj mi znać którą opcję wybierasz!**


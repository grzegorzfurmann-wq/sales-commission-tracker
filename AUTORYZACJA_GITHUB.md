# 🔐 Autoryzacja GitHub - Wdrożenie Kodu

## ❌ Problem: Git Wymaga Autoryzacji

Git potrzebuje autoryzacji, aby wdrożyć kod do GitHub. Mamy 2 opcje:

---

## ✅ OPCJA 1: GitHub CLI (Najprostsze)

### KROK 1: Zainstaluj GitHub CLI

```bash
brew install gh
```

### KROK 2: Zaloguj się

```bash
gh auth login
```

Wybierz:
- **GitHub.com**
- **HTTPS**
- **Login with a web browser**
- **Paste authentication token** (skopiuj token z przeglądarki)

### KROK 3: Wdróż Kod

Po zalogowaniu, wykonam:
```bash
git push -u origin main
```

---

## ✅ OPCJA 2: Personal Access Token

### KROK 1: Utwórz Token

1. **Otwórz:** https://github.com/settings/tokens
2. **Kliknij "Generate new token"** → **"Generate new token (classic)"**
3. **Nazwa:** `Sales Commission Tracker`
4. **Zaznacz:** `repo` (pełny dostęp do repozytoriów)
5. **Kliknij "Generate token"**
6. **Skopiuj token** (zobaczysz go tylko raz!)

### KROK 2: Użyj Tokenu

Gdy dasz mi token, zmienię URL na:
```
https://TOKEN@github.com/grzegorzfurmann-wq/sales-commission-tracker.git
```

I wykonam push.

---

## 🎯 Co Teraz?

**Wybierz opcję:**
1. **GitHub CLI** - zainstaluj `gh` i zaloguj się
2. **Personal Access Token** - utwórz token i daj mi znać

**Którą opcję wybierasz?**

---

## 💡 Rekomendacja

**GitHub CLI jest prostsze** - wystarczy `brew install gh` i `gh auth login`.

**Daj mi znać którą opcję wybierasz!**


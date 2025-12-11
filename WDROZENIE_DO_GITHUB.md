# 🚀 Wdrożenie do GitHub - Proste Kroki

## ✅ Przygotowałem Projekt!

Zainicjalizowałem Git i przygotowałem wszystko. Teraz tylko 3 proste kroki:

---

## 📋 KROK 1: Utwórz Repozytorium na GitHub (2 minuty)

1. **Otwórz:** https://github.com/new
2. **Repository name:** `sales-commission-tracker` (lub dowolna nazwa)
3. **Wybierz:** **Public** (publiczne)
4. **NIE zaznaczaj** niczego (README, .gitignore, license)
5. **Kliknij:** "Create repository"

**Po utworzeniu, GitHub pokaże Ci URL repozytorium** (np. `https://github.com/twoja-nazwa/sales-commission-tracker.git`)

**Skopiuj ten URL!**

---

## 📋 KROK 2: Połącz Lokalny Projekt z GitHub

**W Terminalu wykonaj te komendy** (zamień `URL_REPOZYTORIUM` na URL z GitHub):

```bash
cd "/Users/gregfurmann/Desktop/Cursor AI"
git remote add origin URL_REPOZYTORIUM
git branch -M main
git push -u origin main
```

**Przykład:**
Jeśli URL to `https://github.com/gregfurmann/sales-commission-tracker.git`, wykonaj:

```bash
cd "/Users/gregfurmann/Desktop/Cursor AI"
git remote add origin https://github.com/gregfurmann/sales-commission-tracker.git
git branch -M main
git push -u origin main
```

---

## 📋 KROK 3: Połącz z Render

1. **Wróć do Render:** https://render.com
2. **Kliknij "New +"** → **"Web Service"**
3. **Kliknij "GitHub"**
4. **Autoryzuj Render** (teraz powinno działać, bo masz repozytorium!)
5. **Wybierz repozytorium** `sales-commission-tracker`
6. **Render wykryje `render.yaml`** automatycznie
7. **Kliknij "Apply"** lub **"Create"**

---

## 🎯 Szybka Wersja

1. **Utwórz repozytorium:** https://github.com/new
2. **Skopiuj URL** repozytorium
3. **Daj mi znać URL** - wykonam komendy za Ciebie!
4. **Połącz z Render**

---

## 💡 Wskazówka

**Jeśli GitHub poprosi o login podczas `git push`:**
- Użyj **Personal Access Token** zamiast hasła
- LUB użyj **GitHub CLI** (`gh auth login`)

**Mogę pomóc z tym też!**

---

## 📝 Co Teraz?

1. **Utwórz repozytorium:** https://github.com/new
2. **Skopiuj URL** repozytorium
3. **Daj mi znać URL** - wykonam komendy za Ciebie!

**To wszystko!** 🚀


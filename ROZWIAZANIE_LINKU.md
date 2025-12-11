# 🔗 Rozwiązanie Problemu z Linkiem

## Problem: "Ta witryna jest nieosiągalna"

Link używa `localhost:3000`, który działa **tylko na komputerze gdzie działa aplikacja**.

## Rozwiązania:

### Rozwiązanie 1: Otwórz link na tym samym komputerze

Handlowiec musi otworzyć link na **tym samym komputerze** gdzie działa aplikacja:
1. Skopiuj link z emaila
2. Otwórz go na komputerze gdzie działa `npm run dev`
3. Link zadziała

### Rozwiązanie 2: Użyj adresu sieciowego (działa w sieci lokalnej)

Jeśli handlowiec jest w tej samej sieci WiFi, możesz użyć adresu IP:

1. **Znajdź swój adres IP:**
   - W terminalu wpisz: `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - Lub sprawdź w konsoli frontendu: "On Your Network: http://192.168.31.167:3000"

2. **Zmień APP_URL w pliku `.env`:**
   ```bash
   cd "/Users/gregfurmann/Desktop/Cursor AI/server" && open -e .env
   ```
   
   Zmień:
   ```
   APP_URL=http://localhost:3000
   ```
   
   Na (użyj swojego adresu IP):
   ```
   APP_URL=http://192.168.31.167:3000
   ```
   
   (Zastąp `192.168.31.167` swoim adresem IP)

3. **Zrestartuj serwer**

Teraz linki będą działać w sieci lokalnej (WiFi).

### Rozwiązanie 3: Dla produkcji (później)

Gdy będziesz wdrażać aplikację na serwer:
- Ustaw `APP_URL` na rzeczywisty adres domeny
- Np. `APP_URL=https://twoja-domena.pl`

## Szybkie rozwiązanie teraz:

**Najprościej:** Handlowiec powinien otworzyć link na **tym samym komputerze** gdzie działa aplikacja, lub skopiować link i otworzyć go w przeglądarce na tym komputerze.




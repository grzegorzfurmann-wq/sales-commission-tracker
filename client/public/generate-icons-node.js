// Skrypt do generowania ikon PWA
// Uruchom: node generate-icons-node.js

const fs = require('fs');
const path = require('path');

// Użyj canvas jeśli dostępny, w przeciwnym razie użyj prostego SVG
function generateIconPNG(size) {
  // Prosty SVG jako fallback
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad${size})" rx="${size * 0.1}"/>
  <text x="50%" y="50%" font-size="${size * 0.5}" text-anchor="middle" dominant-baseline="central" fill="white">💰</text>
</svg>`;

  // Zapisz jako SVG (można później przekonwertować)
  const svgPath = path.join(__dirname, `icon-${size}x${size}.svg`);
  fs.writeFileSync(svgPath, svg);
  console.log(`✅ Utworzono: icon-${size}x${size}.svg`);
  
  console.log(`\n📝 Uwaga: Plik jest w formacie SVG.`);
  console.log(`Aby przekonwertować na PNG:`);
  console.log(`1. Otwórz plik w przeglądarce`);
  console.log(`2. Zrób screenshot lub użyj narzędzia online`);
  console.log(`3. LUB użyj generatora HTML: http://localhost:3000/create-icons.html`);
}

// Generuj ikony
console.log('🎨 Generowanie ikon PWA...\n');
generateIconPNG(192);
generateIconPNG(512);

console.log('\n✨ Gotowe!');
console.log('\n💡 Najlepiej użyj generatora HTML:');
console.log('   http://localhost:3000/create-icons.html');



// Prosty skrypt do generowania ikon PWA
// Uruchom: node generate-icons.js

const fs = require('fs');
const path = require('path');

// Prosty SVG ikony (emoji dolara w kolorowym tle)
const createIconSVG = (size) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.1}"/>
  <text x="50%" y="50%" font-size="${size * 0.5}" text-anchor="middle" dominant-baseline="central" fill="white">💰</text>
</svg>`;
};

// Zapisz ikony jako SVG (można później przekonwertować na PNG)
const sizes = [192, 512];

sizes.forEach(size => {
  const svg = createIconSVG(size);
  const filename = `icon-${size}x${size}.svg`;
  fs.writeFileSync(path.join(__dirname, filename), svg);
  console.log(`✅ Utworzono: ${filename}`);
});

console.log('\n📝 Uwaga: Pliki są w formacie SVG.');
console.log('Aby przekonwertować na PNG, użyj narzędzia online lub:');
console.log('1. Otwórz create-icons.html w przeglądarce');
console.log('2. Kliknij przyciski do generowania ikon PNG');
console.log('3. Zapisz pliki w folderze client/public/');




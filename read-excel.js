const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, 'EPA Home - kalkulator.xlsx');
const workbook = XLSX.readFile(filePath);

console.log('=== INFORMACJE O PLIKU EXCEL ===\n');
console.log('Nazwy arkuszy:', workbook.SheetNames);
console.log('\n=== ZAWARTOŚĆ ARKUSZY ===\n');

workbook.SheetNames.forEach((sheetName, index) => {
  console.log(`\n--- Arkusz ${index + 1}: ${sheetName} ---`);
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
  
  console.log(`Liczba wierszy: ${data.length}`);
  if (data.length > 0) {
    console.log(`Liczba kolumn: ${data[0].length}`);
    console.log('\nPierwsze 10 wierszy:');
    data.slice(0, 10).forEach((row, i) => {
      console.log(`Wiersz ${i + 1}:`, row);
    });
    
    // Sprawdź formuły
    const formulas = [];
    for (let cell in worksheet) {
      if (cell.startsWith('!')) continue;
      if (worksheet[cell].f) {
        formulas.push({ cell, formula: worksheet[cell].f, value: worksheet[cell].v });
      }
    }
    if (formulas.length > 0) {
      console.log('\nFormuły znalezione:');
      formulas.slice(0, 20).forEach(f => {
        console.log(`  ${f.cell}: ${f.formula} = ${f.value}`);
      });
    }
  }
});

// Zapisz szczegółowe informacje do pliku JSON
const detailedInfo = {
  sheetNames: workbook.SheetNames,
  sheets: workbook.SheetNames.map(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
    const formulas = [];
    
    for (let cell in worksheet) {
      if (cell.startsWith('!')) continue;
      if (worksheet[cell].f) {
        formulas.push({
          cell,
          formula: worksheet[cell].f,
          value: worksheet[cell].v,
          type: worksheet[cell].t
        });
      }
    }
    
    return {
      name: sheetName,
      rowCount: data.length,
      colCount: data.length > 0 ? data[0].length : 0,
      data: data,
      formulas: formulas,
      range: worksheet['!ref']
    };
  })
};

const fs = require('fs');
fs.writeFileSync(
  path.join(__dirname, 'excel-structure.json'),
  JSON.stringify(detailedInfo, null, 2)
);

console.log('\n\n=== Szczegółowe informacje zapisane do excel-structure.json ===');


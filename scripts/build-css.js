const fs = require('fs');
const path = require('path');

// Función para encontrar archivos CSS recursivamente
function findCSSFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findCSSFiles(fullPath));
    } else if (item.endsWith('.css')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Crear directorio dist si no existe
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Leer tokens CSS
const tokensPath = path.join(__dirname, '../src/styles/tokens.css');
let finalCSS = '';

if (fs.existsSync(tokensPath)) {
  finalCSS = fs.readFileSync(tokensPath, 'utf8');
}

// Encontrar todos los archivos CSS de componentes
const componentsDir = path.join(__dirname, '../src/components');
const componentCSSFiles = findCSSFiles(componentsDir);

// Procesar cada archivo CSS
componentCSSFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Filtrar líneas que contienen @import o comentarios de import
  const cleanContent = content
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      return !trimmed.startsWith('@import') && 
             !trimmed.includes('/* Import tokens */') &&
             trimmed !== '';
    })
    .join('\n');
  
  // Agregar al CSS final
  finalCSS += '\n\n' + cleanContent;
});

// Escribir archivo final
fs.writeFileSync('dist/styles.css', finalCSS);

console.log('✅ CSS bundle created successfully');
console.log(`📦 Final size: ${(finalCSS.length / 1024).toFixed(1)}KB`);

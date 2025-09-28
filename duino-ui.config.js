// Configuración de Duino UI para proyectos
module.exports = {
  // Configuración de temas
  themes: {
    default: 'blue',
    available: ['blue', 'green', 'purple', 'red', 'orange']
  },
  
  // Configuración de CSS
  css: {
    // Importar automáticamente los estilos
    autoImport: true,
    // Ruta personalizada para los estilos
    customPath: null
  },
  
  // Configuración de componentes
  components: {
    // Prefijo para las clases CSS
    prefix: 'duino',
    // Metodología de nomenclatura
    methodology: 'BEM'
  },
  
  // Configuración de TypeScript
  typescript: {
    // Generar archivos de tipos
    generateTypes: true,
    // Ruta de los tipos
    typesPath: './types'
  }
};

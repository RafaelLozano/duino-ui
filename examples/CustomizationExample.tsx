import React from 'react';
import { ThemeProvider, ThemeSwitcher, useTheme } from '../src/themes';
import { Button, Modal } from '../src';

// Componente de ejemplo que usa el tema
const ExampleComponents = () => {
  const [showModal, setShowModal] = React.useState(false);
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Componentes de Ejemplo</h2>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="danger">Danger Button</Button>
        <Button loading>Loading Button</Button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => setShowModal(true)}>
          Abrir Modal
        </Button>
      </div>

      <Modal
        open={showModal}
        title="Modal de Ejemplo"
        onCancel={() => setShowModal(false)}
        onOk={() => setShowModal(false)}
      >
        <p>Este modal se adapta automáticamente al tema seleccionado.</p>
        <p>Los colores, border radius y tipografía cambian según la configuración del tema.</p>
      </Modal>
    </div>
  );
};

// Ejemplo completo de personalización
export const CustomizationExample = () => {
  return (
    <ThemeProvider preset="arduino">
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: 'var(--duino-color-bg)',
        color: 'var(--duino-color-fg)',
        fontFamily: 'var(--duino-font)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '40px 20px' 
        }}>
          <header style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: '700',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, var(--duino-brand-500), var(--duino-brand-700))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Duino UI Customization
            </h1>
            <p style={{ 
              fontSize: '18px', 
              color: 'var(--duino-color-muted)',
              margin: 0
            }}>
              Personaliza el design system en tiempo real
            </p>
          </header>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '40px',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr'
            }
          }}>
            <div>
              <ThemeSwitcher />
            </div>
            
            <div>
              <ExampleComponents />
            </div>
          </div>

          <footer style={{ 
            marginTop: '60px', 
            padding: '20px',
            textAlign: 'center',
            borderTop: '1px solid var(--duino-border)'
          }}>
            <p style={{ 
              color: 'var(--duino-color-muted)',
              fontSize: '14px',
              margin: 0
            }}>
              Cambia los temas arriba y observa cómo se actualizan todos los componentes automáticamente.
            </p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CustomizationExample;

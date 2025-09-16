import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";

const meta: Meta<typeof Image> = {
  title: "components/Image",
  component: Image,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Componente Image del sistema de diseño Arduino con funcionalidades avanzadas.

**Características:**
- Lazy loading con Intersection Observer
- Estados de loading, error y fallback
- Preview modal integrado
- 3 formas disponibles (square, rounded, circle)
- Object-fit configurable
- Responsive y accesible
- Metodología BEM para CSS
        `,
      },
    },
  },
  argTypes: {
    lazy: {
      control: "boolean",
      description: "Habilitar lazy loading",
    },
    preview: {
      control: "boolean",
      description: "Habilitar preview modal",
    },
    fit: {
      control: "select",
      options: ["fill", "contain", "cover", "none", "scale-down"],
      description: "Cómo ajustar la imagen",
    },
    shape: {
      control: "select",
      options: ["square", "rounded", "circle"],
      description: "Forma de la imagen",
    },
    bordered: {
      control: "boolean",
      description: "Mostrar borde",
    },
    shadow: {
      control: "boolean",
      description: "Mostrar sombra",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

// URLs de ejemplo
const sampleImages = {
  arduino: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
  circuit: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop",
  electronics: "https://images.unsplash.com/photo-1581092582537-8c8c0e7b4a98?w=400&h=300&fit=crop",
  code: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
  robot: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
};

export const Default: Story = {
  args: {
    src: sampleImages.arduino,
    alt: "Placa Arduino",
    width: 300,
    height: 200,
  },
};

export const WithPreview: Story = {
  args: {
    src: sampleImages.circuit,
    alt: "Circuito electrónico",
    width: 300,
    height: 200,
    preview: true,
    caption: "Circuito básico con Arduino Uno",
  },
};

export const Circle: Story = {
  args: {
    src: sampleImages.arduino,
    alt: "Avatar Arduino",
    width: 120,
    height: 120,
    shape: "circle",
    bordered: true,
  },
};

export const WithBorderAndShadow: Story = {
  args: {
    src: sampleImages.electronics,
    alt: "Componentes electrónicos",
    width: 300,
    height: 200,
    bordered: true,
    shadow: true,
    caption: "Componentes para proyectos Arduino",
  },
};

export const DifferentFits: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      maxWidth: '800px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Cover (default)</h4>
        <Image
          src={sampleImages.robot}
          alt="Robot"
          width={180}
          height={120}
          fit="cover"
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Contain</h4>
        <Image
          src={sampleImages.robot}
          alt="Robot"
          width={180}
          height={120}
          fit="contain"
          bordered
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Fill</h4>
        <Image
          src={sampleImages.robot}
          alt="Robot"
          width={180}
          height={120}
          fit="fill"
        />
      </div>
    </div>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Square</h4>
        <Image
          src={sampleImages.code}
          alt="Código"
          width={120}
          height={120}
          shape="square"
          bordered
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Rounded</h4>
        <Image
          src={sampleImages.code}
          alt="Código"
          width={120}
          height={120}
          shape="rounded"
          bordered
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Circle</h4>
        <Image
          src={sampleImages.code}
          alt="Código"
          width={120}
          height={120}
          shape="circle"
          bordered
        />
      </div>
    </div>
  ),
};

export const LazyLoading: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px',
      height: '400px',
      overflowY: 'auto',
      padding: '20px',
      border: '1px solid var(--duino-border)',
      borderRadius: 'var(--duino-radius)'
    }}>
      <p style={{ margin: 0, textAlign: 'center', fontWeight: '500' }}>
        Scroll hacia abajo para ver el lazy loading en acción
      </p>
      
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <h4 style={{ marginBottom: '8px' }}>Imagen {i + 1}</h4>
          <Image
            src={`https://picsum.photos/300/200?random=${i}`}
            alt={`Imagen aleatoria ${i + 1}`}
            width={300}
            height={200}
            lazy
            bordered
            caption={`Imagen ${i + 1} - Cargada con lazy loading`}
          />
        </div>
      ))}
    </div>
  ),
};

export const ErrorHandling: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      maxWidth: '600px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
          Error por defecto
        </h4>
        <Image
          src="https://invalid-url.jpg"
          alt="Imagen con error"
          width={180}
          height={120}
          bordered
        />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
          Fallback personalizado
        </h4>
        <Image
          src="https://another-invalid-url.jpg"
          alt="Imagen con fallback"
          width={180}
          height={120}
          bordered
          fallback={
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              background: 'var(--duino-brand-50)',
              color: 'var(--duino-brand-600)',
              gap: '8px'
            }}>
              <div style={{ fontSize: '32px' }}>🖼️</div>
              <div style={{ fontSize: '12px', fontWeight: '500' }}>
                Imagen no disponible
              </div>
            </div>
          }
        />
      </div>
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <h3 style={{ 
        marginBottom: '16px', 
        fontSize: '18px', 
        fontWeight: '600',
        color: 'var(--duino-brand-700)',
        textAlign: 'center'
      }}>
        Galería de Proyectos Arduino
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px'
      }}>
        <Image
          src={sampleImages.arduino}
          alt="Arduino Uno"
          width="100%"
          height={180}
          preview
          shadow
          caption="Arduino Uno - La placa más popular"
        />
        <Image
          src={sampleImages.circuit}
          alt="Circuito LED"
          width="100%"
          height={180}
          preview
          shadow
          caption="Circuito básico con LEDs"
        />
        <Image
          src={sampleImages.electronics}
          alt="Componentes"
          width="100%"
          height={180}
          preview
          shadow
          caption="Kit de componentes electrónicos"
        />
        <Image
          src={sampleImages.code}
          alt="Código Arduino"
          width="100%"
          height={180}
          preview
          shadow
          caption="Código del Arduino IDE"
        />
        <Image
          src={sampleImages.robot}
          alt="Robot Arduino"
          width="100%"
          height={180}
          preview
          shadow
          caption="Robot controlado por Arduino"
        />
      </div>
      
      <p style={{ 
        marginTop: '16px', 
        textAlign: 'center', 
        fontSize: '14px',
        color: 'var(--duino-color-muted)'
      }}>
        Haz click en cualquier imagen para ver el preview en pantalla completa
      </p>
    </div>
  ),
};

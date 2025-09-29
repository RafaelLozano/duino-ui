import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Button } from "../Button/Button";

// Iconos de ejemplo
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-3.5L19 12l1.5 1.5M4.5 16.5L3 12l-1.5-1.5" />
  </svg>
);

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Componente Card del sistema de diseño Arduino, similar al de Ant Design.

**Características:**
- Soporte para título y contenido extra
- Imagen de portada (cover)
- Lista de acciones en la parte inferior
- Estados: bordered, hoverable, loading
- Tamaños: sm, md, lg
- Tipo inner para tarjetas anidadas
- Funcionalidad de click
- Metodología BEM para CSS
- Accesibilidad completa
- Animaciones suaves
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Título de la tarjeta",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño de la tarjeta",
    },
    type: {
      control: "select",
      options: ["default", "inner"],
      description: "Tipo de tarjeta",
    },
    bordered: {
      control: "boolean",
      description: "Si mostrar el borde",
    },
    hoverable: {
      control: "boolean",
      description: "Si la tarjeta puede hacer hover",
    },
    loading: {
      control: "boolean",
      description: "Mostrar estado de carga",
    },
    children: {
      control: "text",
      description: "Contenido del cuerpo de la tarjeta",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Stories básicos
export const Default: Story = {
  args: {
    title: "Título de la tarjeta",
    children: "Contenido de la tarjeta. Aquí puedes agregar cualquier información que necesites mostrar.",
  },
};

export const Simple: Story = {
  args: {
    children: "Una tarjeta simple sin título ni bordes.",
    bordered: false,
  },
};

export const WithExtra: Story = {
  args: {
    title: "Arduino Project",
    extra: <a href="#" style={{ color: "var(--duino-brand-600)" }}>Más</a>,
    children: "Este es un proyecto de Arduino que controla LEDs mediante sensores.",
  },
};

// Con imagen de portada
export const WithCover: Story = {
  args: {
    title: "Arduino Uno R3",
    extra: <a href="#" style={{ color: "var(--duino-brand-600)" }}>Ver detalles</a>,
    cover: (
      <img
        alt="Arduino Uno"
        src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
        style={{ height: "200px", objectFit: "cover" }}
      />
    ),
    children: "La placa Arduino Uno R3 es perfecta para principiantes. Incluye todo lo necesario para comenzar con la programación de microcontroladores.",
  },
};

// Con acciones
export const WithActions: Story = {
  args: {
    title: "Control de LEDs",
    children: "Proyecto que permite controlar múltiples LEDs a través de una interfaz web.",
    actions: [
      <Button key="edit" variant="ghost" icon={<EditIcon />}>
        Editar
      </Button>,
      <Button key="share" variant="ghost" icon={<ShareIcon />}>
        Compartir
      </Button>,
      <Button key="like" variant="ghost" icon={<HeartIcon />}>
        Me gusta
      </Button>,
    ],
  },
};

// Tamaños
export const Small: Story = {
  args: {
    size: "sm",
    title: "Tarjeta pequeña",
    children: "Contenido compacto para espacios reducidos.",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    title: "Tarjeta mediana",
    children: "Tamaño estándar para la mayoría de casos de uso.",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    title: "Tarjeta grande",
    children: "Más espacio para contenido extenso y detallado.",
  },
};

// Estados
export const Hoverable: Story = {
  args: {
    title: "Tarjeta interactiva",
    hoverable: true,
    children: "Pasa el mouse por encima para ver el efecto hover.",
  },
};

export const NoBorder: Story = {
  args: {
    title: "Sin borde",
    bordered: false,
    children: "Tarjeta sin borde para un look más limpio.",
  },
};

export const Loading: Story = {
  args: {
    title: "Cargando contenido",
    loading: true,
    cover: <div style={{ height: "180px", background: "#f0f0f0" }} />,
    children: "Este contenido no se mostrará durante la carga.",
  },
};

export const Clickable: Story = {
  args: {
    title: "Tarjeta clickeable",
    children: "Haz click en cualquier parte de esta tarjeta.",
    onClick: () => alert("¡Tarjeta clickeada!"),
  },
};

// Tipo inner
export const InnerType: Story = {
  args: {
    type: "inner",
    title: "Tarjeta anidada",
    children: "Esta tarjeta tiene un fondo más suave, ideal para anidar dentro de otras tarjetas.",
  },
};

// Ejemplos avanzados
export const CompleteExample: Story = {
  args: {
    title: "ESP32 DevKit V1",
    extra: <Button variant="text">Ver código</Button>,
    cover: (
      <img
        alt="ESP32"
        src="https://images.unsplash.com/photo-1518312420831-1a29c141b83f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        style={{ height: "200px", objectFit: "cover" }}
      />
    ),
    children: (
      <div>
        <p>Placa de desarrollo con WiFi y Bluetooth integrados.</p>
        <p><strong>Características:</strong></p>
        <ul style={{ paddingLeft: "20px", margin: "8px 0" }}>
          <li>Procesador dual-core Tensilica LX6</li>
          <li>WiFi 802.11 b/g/n</li>
          <li>Bluetooth v4.2 BR/EDR y BLE</li>
          <li>GPIO, PWM, I2C, SPI</li>
        </ul>
      </div>
    ),
    actions: [
      <Button key="buy" variant="primary">
        Comprar
      </Button>,
      <Button key="docs" variant="ghost">
        Documentación
      </Button>,
      <Button key="settings" variant="ghost" icon={<SettingsIcon />}>
        Configurar
      </Button>,
    ],
    hoverable: true,
  },
};

// Showcase de todos los tamaños
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Card
        size="sm"
        title="Pequeña"
        style={{ width: "250px" }}
      >
        Tarjeta de tamaño pequeño
      </Card>
      <Card
        size="md"
        title="Mediana"
        style={{ width: "300px" }}
      >
        Tarjeta de tamaño mediano
      </Card>
      <Card
        size="lg"
        title="Grande"
        style={{ width: "350px" }}
      >
        Tarjeta de tamaño grande
      </Card>
    </div>
  ),
};

// Grid de tarjetas
export const CardGrid: Story = {
  render: () => (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "16px",
      maxWidth: "900px"
    }}>
      <Card
        title="Arduino Uno R3"
        cover={
          <div style={{ 
            height: "160px", 
            background: "linear-gradient(135deg, var(--duino-brand-500), var(--duino-brand-600))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold"
          }}>
            Arduino Uno
          </div>
        }
        hoverable
      >
        Placa perfecta para principiantes en el mundo Arduino.
      </Card>
      
      <Card
        title="ESP32 DevKit"
        cover={
          <div style={{ 
            height: "160px", 
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold"
          }}>
            ESP32
          </div>
        }
        hoverable
      >
        Desarrollo IoT con WiFi y Bluetooth integrados.
      </Card>
      
      <Card
        title="Raspberry Pi 4"
        cover={
          <div style={{ 
            height: "160px", 
            background: "linear-gradient(135deg, #ef4444, #f97316)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold"
          }}>
            Raspberry Pi
          </div>
        }
        hoverable
      >
        Computadora completa del tamaño de una tarjeta de crédito.
      </Card>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

// Demo interactivo completo
export const InteractiveDemo: Story = {
  render: () => (
    <div style={{ 
      padding: "24px", 
      fontFamily: "var(--duino-font)", 
      maxWidth: "1200px",
      margin: "0 auto" 
    }}>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ 
          color: "var(--duino-brand-700)", 
          marginBottom: "8px",
          fontSize: "24px",
          fontWeight: "600"
        }}>
          Arduino Card System
        </h2>
        <p style={{ 
          color: "var(--duino-color-muted)", 
          margin: 0,
          fontSize: "16px"
        }}>
          Sistema de tarjetas inspirado en Ant Design para mostrar información de proyectos Arduino
        </p>
      </div>

      {/* Tarjetas básicas */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ 
          fontSize: "18px", 
          marginBottom: "16px",
          color: "var(--duino-color-fg)" 
        }}>
          Tarjetas Básicas
        </h3>
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px"
        }}>
          <Card
            title="Proyecto LED Blinker"
            extra={<a href="#" style={{ color: "var(--duino-brand-600)" }}>Ver código</a>}
          >
            El clásico proyecto de hacer parpadear un LED. Perfecto para empezar.
          </Card>
          
          <Card
            title="Sensor de Temperatura"
            hoverable
          >
            Monitoreo de temperatura usando sensor DHT22 y display LCD.
          </Card>
          
          <Card
            bordered={false}
            title="Control Remoto IR"
          >
            Decodifica señales de control remoto infrarrojo.
          </Card>
        </div>
      </div>

      {/* Con imágenes */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ 
          fontSize: "18px", 
          marginBottom: "16px",
          color: "var(--duino-color-fg)" 
        }}>
          Con Imágenes de Portada
        </h3>
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px"
        }}>
          <Card
            title="Robot Seguidor de Línea"
            cover={
              <div style={{ 
                height: "140px", 
                background: "linear-gradient(135deg, var(--duino-brand-400), var(--duino-brand-600))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold"
              }}>
                🤖 Robot
              </div>
            }
            hoverable
            actions={[
              <Button key="build" variant="primary" size="sm">Construir</Button>,
              <Button key="code" variant="ghost" size="sm">Código</Button>
            ]}
          >
            Robot autónomo que sigue líneas negras usando sensores IR.
          </Card>
          
          <Card
            title="Estación Meteorológica"
            cover={
              <div style={{ 
                height: "140px", 
                background: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold"
              }}>
                🌤️ Clima
              </div>
            }
            hoverable
            actions={[
              <Button key="view" variant="primary" size="sm">Ver datos</Button>,
              <Button key="config" variant="ghost" size="sm" icon={<SettingsIcon />} />
            ]}
          >
            Monitoreo completo del clima con múltiples sensores.
          </Card>
        </div>
      </div>

      {/* Diferentes tamaños */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ 
          fontSize: "18px", 
          marginBottom: "16px",
          color: "var(--duino-color-fg)" 
        }}>
          Diferentes Tamaños
        </h3>
        <div style={{ 
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems: "flex-start"
        }}>
          <Card
            size="sm"
            title="Pequeña"
            style={{ width: "200px" }}
          >
            Tarjeta compacta
          </Card>
          
          <Card
            size="md"
            title="Mediana"
            style={{ width: "250px" }}
          >
            Tamaño estándar para la mayoría de contenidos
          </Card>
          
          <Card
            size="lg"
            title="Grande"
            style={{ width: "300px" }}
          >
            Más espacio para contenido detallado y complejo
          </Card>
        </div>
      </div>

      {/* Tarjeta inner */}
      <div>
        <h3 style={{ 
          fontSize: "18px", 
          marginBottom: "16px",
          color: "var(--duino-color-fg)" 
        }}>
          Tarjeta Anidada
        </h3>
        <Card
          title="Especificaciones Técnicas"
          style={{ maxWidth: "500px" }}
        >
          <p style={{ marginBottom: "16px" }}>
            Detalles técnicos del Arduino Uno R3:
          </p>
          
          <Card
            type="inner"
            title="Características Principales"
            size="sm"
          >
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              <li>Microcontrolador: ATmega328P</li>
              <li>Voltaje de operación: 5V</li>
              <li>Pines digitales I/O: 14</li>
              <li>Pines analógicos: 6</li>
            </ul>
          </Card>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

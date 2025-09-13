import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

// Iconos de ejemplo (puedes usar react-icons o cualquier librería de iconos)
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
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

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Botón del sistema de diseño Arduino con estilo inspirado en arduino.cc.

**Características:**
- 5 variantes: primary, secondary, ghost, text, danger
- 3 tamaños: sm, md, lg  
- 3 formas: default, round, circle
- Estados: loading, disabled
- Soporte para iconos
- Funciona como botón o enlace
- Metodología BEM para CSS
- Accesibilidad completa
- Animaciones suaves
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "text", "danger"],
      description: "Variante visual del botón",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del botón",
    },
    shape: {
      control: "select", 
      options: ["default", "round", "circle"],
      description: "Forma del botón",
    },
    block: {
      control: "boolean",
      description: "Hacer el botón de ancho completo",
    },
    loading: {
      control: "boolean",
      description: "Mostrar estado de carga",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilitar el botón",
    },
    danger: {
      control: "boolean",
      description: "Aplicar estilo de peligro",
    },
    iconPosition: {
      control: "select",
      options: ["start", "end"],
      description: "Posición del icono",
    },
    children: {
      control: "text",
      description: "Contenido del botón",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Stories básicos
export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary", 
    children: "Secondary Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Delete",
  },
};

// Tamaños
export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

// Formas
export const Round: Story = {
  args: {
    shape: "round",
    children: "Round Button",
  },
};

export const Circle: Story = {
  args: {
    shape: "circle",
    icon: <PlayIcon />,
  },
};

// Con iconos
export const WithIcon: Story = {
  args: {
    icon: <DownloadIcon />,
    children: "Download",
  },
};

export const WithIconEnd: Story = {
  args: {
    icon: <DownloadIcon />,
    iconPosition: "end",
    children: "Download",
  },
};

export const IconOnly: Story = {
  args: {
    icon: <HeartIcon />,
    "aria-label": "Like",
  },
};

// Estados
export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

export const Block: Story = {
  args: {
    block: true,
    children: "Block Button",
  },
  parameters: {
    layout: "padded",
  },
};

// Como enlace
export const AsLink: Story = {
  args: {
    href: "https://arduino.cc",
    target: "_blank",
    children: "Visit Arduino.cc",
  },
};

// Combinaciones avanzadas
export const DangerLoading: Story = {
  args: {
    variant: "danger",
    loading: true,
    children: "Deleting...",
  },
};

export const LargeWithIcon: Story = {
  args: {
    size: "lg",
    variant: "primary",
    icon: <PlayIcon />,
    children: "Start Project",
  },
};

// Showcase de todas las variantes
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="text">Text</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button>Default</Button>
      <Button shape="round">Round</Button>
      <Button shape="circle" icon={<SettingsIcon />} />
    </div>
  ),
};

// Demo interactivo completo
export const InteractiveDemo: Story = {
  render: () => (
    <div style={{ 
      padding: "24px", 
      fontFamily: "var(--duino-font)", 
      maxWidth: "800px",
      margin: "0 auto" 
    }}>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ 
          color: "var(--duino-brand-700)", 
          marginBottom: "8px",
          fontSize: "24px",
          fontWeight: "600"
        }}>
          Arduino Button System
        </h2>
        <p style={{ 
          color: "var(--duino-color-muted)", 
          margin: 0,
          fontSize: "16px"
        }}>
          Sistema de botones inspirado en el diseño de Arduino.cc
        </p>
      </div>

      {/* Variantes principales */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ 
          fontSize: "18px", 
          marginBottom: "16px",
          color: "var(--duino-color-fg)" 
        }}>
          Variantes
        </h3>
        <div style={{ 
          display: "flex", 
          gap: "12px", 
          flexWrap: "wrap" 
        }}>
          <Button variant="primary">
            Primary Action
          </Button>
          <Button variant="secondary">
            Secondary
          </Button>
          <Button variant="ghost">
            Ghost
          </Button>
          <Button variant="text">
            Text Only
          </Button>
          <Button variant="danger">
            Delete
          </Button>
        </div>
      </div>

      {/* Con iconos */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ 
          fontSize: "18px", 
          marginBottom: "16px",
          color: "var(--duino-color-fg)" 
        }}>
          Con Iconos
        </h3>
        <div style={{ 
          display: "flex", 
          gap: "12px", 
          flexWrap: "wrap",
          alignItems: "center" 
        }}>
          <Button icon={<DownloadIcon />}>
            Download IDE
          </Button>
          <Button 
            variant="secondary"
            icon={<PlayIcon />}
          >
            Run Code
          </Button>
          <Button 
            variant="ghost"
            icon={<HeartIcon />}
            iconPosition="end"
          >
            Favorite
          </Button>
          <Button 
            shape="circle"
            icon={<SettingsIcon />}
            aria-label="Settings"
          />
        </div>
      </div>

      {/* Estados */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ 
          fontSize: "18px", 
          marginBottom: "16px",
          color: "var(--duino-color-fg)" 
        }}>
          Estados
        </h3>
        <div style={{ 
          display: "flex", 
          gap: "12px", 
          flexWrap: "wrap",
          alignItems: "center" 
        }}>
          <Button loading>
            Uploading...
          </Button>
          <Button 
            variant="secondary"
            loading
            icon={<DownloadIcon />}
          >
            Downloading...
          </Button>
          <Button disabled>
            Disabled
          </Button>
          <Button 
            variant="danger"
            disabled
          >
            Can't Delete
          </Button>
        </div>
      </div>

      {/* Tamaños */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ 
          fontSize: "18px", 
          marginBottom: "16px",
          color: "var(--duino-color-fg)" 
        }}>
          Tamaños
        </h3>
        <div style={{ 
          display: "flex", 
          gap: "12px", 
          alignItems: "center" 
        }}>
          <Button size="sm">
            Small
          </Button>
          <Button size="md">
            Medium
          </Button>
          <Button size="lg">
            Large
          </Button>
        </div>
      </div>

      {/* Block button */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ 
          fontSize: "18px", 
          marginBottom: "16px",
          color: "var(--duino-color-fg)" 
        }}>
          Ancho Completo
        </h3>
        <Button 
          block
          size="lg"
          icon={<DownloadIcon />}
        >
          Download Arduino IDE
        </Button>
      </div>

      {/* Como enlaces */}
      <div>
        <h3 style={{ 
          fontSize: "18px", 
          marginBottom: "16px",
          color: "var(--duino-color-fg)" 
        }}>
          Como Enlaces
        </h3>
        <div style={{ 
          display: "flex", 
          gap: "12px", 
          flexWrap: "wrap" 
        }}>
          <Button 
            href="https://arduino.cc"
            target="_blank"
          >
            Visit Arduino.cc
          </Button>
          <Button 
            variant="secondary"
            href="https://docs.arduino.cc"
            target="_blank"
          >
            Documentation
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

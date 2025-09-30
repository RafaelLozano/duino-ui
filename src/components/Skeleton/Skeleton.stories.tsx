import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, SkeletonAvatar, SkeletonButton, SkeletonInput, SkeletonImage } from "./Skeleton";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { useState } from "react";

// Componente de ejemplo para el modo condicional
const ToggleableContent = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Button 
          onClick={() => setLoading(!loading)}
          variant={loading ? "primary" : "secondary"}
        >
          {loading ? "Mostrar contenido" : "Mostrar skeleton"}
        </Button>
      </div>
      <Skeleton active={loading}>
        {children}
      </Skeleton>
    </div>
  );
};

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Componente Skeleton del sistema de diseño Arduino para mostrar estados de loading.

**Características:**
- Múltiples variantes: text, circular, rectangular, rounded
- Animaciones: pulse, wave, none
- Componentes especializados: Avatar, Button, Input, Image
- Modo condicional con prop active
- Soporte para múltiples líneas de texto
- Responsive y accesible
- Temas dark/light
- Metodología BEM para CSS
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular", "rounded"],
      description: "Variante de la forma del skeleton",
    },
    animation: {
      control: "select",
      options: ["pulse", "wave", "none"],
      description: "Tipo de animación",
    },
    width: {
      control: "text",
      description: "Ancho del skeleton",
    },
    height: {
      control: "text", 
      description: "Alto del skeleton",
    },
    lines: {
      control: "number",
      description: "Número de líneas para variant text",
    },
    active: {
      control: "boolean",
      description: "Si está activo el skeleton",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Stories básicos
export const Default: Story = {
  args: {
    width: "100%",
    height: "20px",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    width: "200px",
  },
};

export const MultipleLines: Story = {
  args: {
    variant: "text",
    lines: 4,
    width: "300px",
  },
};

export const Circular: Story = {
  args: {
    variant: "circular",
    width: 60,
    height: 60,
  },
};

export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: 200,
    height: 120,
  },
};

export const Rounded: Story = {
  args: {
    variant: "rounded",
    width: 200,
    height: 120,
  },
};

// Animaciones
export const PulseAnimation: Story = {
  args: {
    animation: "pulse",
    width: 200,
    height: 20,
  },
};

export const WaveAnimation: Story = {
  args: {
    animation: "wave",
    width: 200,
    height: 20,
  },
};

export const NoAnimation: Story = {
  args: {
    animation: "none",
    width: 200,
    height: 20,
  },
};

// Componentes especializados
export const AvatarSkeleton: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <SkeletonAvatar size={40} shape="circle" />
      <SkeletonAvatar size={40} shape="square" />
      <SkeletonAvatar size={60} shape="circle" />
      <SkeletonAvatar size={60} shape="square" />
    </div>
  ),
};

export const ButtonSkeleton: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
      <SkeletonButton size="sm" />
      <SkeletonButton size="md" />
      <SkeletonButton size="lg" />
      <SkeletonButton shape="round" />
      <SkeletonButton shape="circle" />
      <SkeletonButton block style={{ width: "200px" }} />
    </div>
  ),
};

export const InputSkeleton: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "300px" }}>
      <SkeletonInput size="sm" />
      <SkeletonInput size="md" />
      <SkeletonInput size="lg" />
    </div>
  ),
};

export const ImageSkeleton: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <SkeletonImage width={200} height={150} />
      <SkeletonImage width={100} height={100} />
      <SkeletonImage width={300} height={200} />
    </div>
  ),
};

// Modo condicional
export const ConditionalMode: Story = {
  render: () => (
    <ToggleableContent>
      <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h3>Contenido Real</h3>
        <p>Este es el contenido real que se muestra cuando el skeleton no está activo.</p>
        <p>Puedes usar el botón de arriba para alternar entre el skeleton y este contenido.</p>
      </div>
    </ToggleableContent>
  ),
};

// Ejemplos de layout comunes
export const UserProfile: Story = {
  render: () => (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "16px",
      padding: "16px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      width: "400px"
    }}>
      <SkeletonAvatar size={60} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="120px" height="18px" style={{ marginBottom: "8px" }} />
        <Skeleton variant="text" width="80px" height="14px" style={{ marginBottom: "8px" }} />
        <Skeleton variant="text" width="200px" height="14px" />
      </div>
    </div>
  ),
};

export const ArticleCard: Story = {
  render: () => (
    <div style={{ 
      width: "320px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      overflow: "hidden"
    }}>
      <SkeletonImage width="100%" height={180} />
      <div style={{ padding: "16px" }}>
        <Skeleton variant="text" width="250px" height="20px" style={{ marginBottom: "12px" }} />
        <Skeleton variant="text" lines={3} width="100%" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <SkeletonAvatar size={24} />
            <Skeleton variant="text" width="80px" height="14px" />
          </div>
          <Skeleton variant="text" width="60px" height="14px" />
        </div>
      </div>
    </div>
  ),
};

export const CommentsList: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      {[1, 2, 3].map((item) => (
        <div key={item} style={{ 
          display: "flex", 
          gap: "12px", 
          padding: "16px 0",
          borderBottom: item !== 3 ? "1px solid #eee" : "none"
        }}>
          <SkeletonAvatar size={40} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <Skeleton variant="text" width="100px" height="16px" />
              <Skeleton variant="text" width="60px" height="14px" />
            </div>
            <Skeleton variant="text" lines={2} width="100%" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const FormSkeleton: Story = {
  render: () => (
    <div style={{ width: "400px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <Skeleton variant="text" width="150px" height="24px" style={{ marginBottom: "20px" }} />
      
      <div style={{ marginBottom: "16px" }}>
        <Skeleton variant="text" width="80px" height="16px" style={{ marginBottom: "8px" }} />
        <SkeletonInput />
      </div>
      
      <div style={{ marginBottom: "16px" }}>
        <Skeleton variant="text" width="100px" height="16px" style={{ marginBottom: "8px" }} />
        <SkeletonInput />
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <Skeleton variant="text" width="120px" height="16px" style={{ marginBottom: "8px" }} />
        <Skeleton variant="rectangular" width="100%" height="80px" />
      </div>
      
      <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
        <SkeletonButton />
        <SkeletonButton />
      </div>
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div style={{ width: "600px" }}>
      {/* Header */}
      <div style={{ 
        display: "flex", 
        gap: "16px", 
        padding: "12px 16px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px 8px 0 0",
        border: "1px solid #ddd",
        borderBottom: "none"
      }}>
        <Skeleton variant="text" width="120px" height="16px" />
        <Skeleton variant="text" width="100px" height="16px" />
        <Skeleton variant="text" width="80px" height="16px" />
        <Skeleton variant="text" width="60px" height="16px" />
      </div>
      
      {/* Rows */}
      {[1, 2, 3, 4].map((row, index) => (
        <div key={row} style={{ 
          display: "flex", 
          gap: "16px", 
          padding: "12px 16px",
          border: "1px solid #ddd",
          borderTop: "none",
          borderRadius: index === 3 ? "0 0 8px 8px" : "0"
        }}>
          <Skeleton variant="text" width="120px" height="16px" />
          <Skeleton variant="text" width="100px" height="16px" />
          <Skeleton variant="text" width="80px" height="16px" />
          <SkeletonButton size="sm" />
        </div>
      ))}
    </div>
  ),
};

// Arduino-themed examples
export const ArduinoProjectCard: Story = {
  render: () => (
    <Card style={{ width: "350px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <SkeletonAvatar size={50} shape="square" />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="180px" height="18px" style={{ marginBottom: "6px" }} />
          <Skeleton variant="text" width="120px" height="14px" />
        </div>
      </div>
      
      <SkeletonImage width="100%" height={160} style={{ marginBottom: "16px" }} />
      
      <Skeleton variant="text" lines={3} width="100%" style={{ marginBottom: "16px" }} />
      
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <SkeletonButton size="sm" />
        <SkeletonButton size="sm" />
      </div>
    </Card>
  ),
};

// Demo interactivo completo
export const InteractiveDemo: Story = {
  render: () => (
    <div style={{ 
      padding: "24px", 
      fontFamily: "var(--duino-font)", 
      maxWidth: "1000px",
      margin: "0 auto" 
    }}>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ 
          color: "var(--duino-brand-700)", 
          marginBottom: "8px",
          fontSize: "24px",
          fontWeight: "600"
        }}>
          Arduino Skeleton System
        </h2>
        <p style={{ 
          color: "var(--duino-color-muted)", 
          margin: 0,
          fontSize: "16px"
        }}>
          Sistema de skeleton para mostrar estados de loading mientras se cargan los datos
        </p>
      </div>

      {/* Variantes básicas */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ 
          fontSize: "18px", 
          marginBottom: "16px",
          color: "var(--duino-color-fg)" 
        }}>
          Variantes Básicas
        </h3>
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px"
        }}>
          <div>
            <h4 style={{ marginBottom: "8px", fontSize: "14px" }}>Texto</h4>
            <Skeleton variant="text" width="150px" />
          </div>
          <div>
            <h4 style={{ marginBottom: "8px", fontSize: "14px" }}>Circular</h4>
            <Skeleton variant="circular" width={50} height={50} />
          </div>
          <div>
            <h4 style={{ marginBottom: "8px", fontSize: "14px" }}>Rectangular</h4>
            <Skeleton variant="rectangular" width={120} height={80} />
          </div>
          <div>
            <h4 style={{ marginBottom: "8px", fontSize: "14px" }}>Redondeado</h4>
            <Skeleton variant="rounded" width={120} height={80} />
          </div>
        </div>
      </div>

      {/* Animaciones */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ 
          fontSize: "18px", 
          marginBottom: "16px",
          color: "var(--duino-color-fg)" 
        }}>
          Tipos de Animación
        </h3>
        <div style={{ 
          display: "flex",
          gap: "24px",
          flexWrap: "wrap"
        }}>
          <div>
            <h4 style={{ marginBottom: "8px", fontSize: "14px" }}>Pulse</h4>
            <Skeleton animation="pulse" width={200} height={20} />
          </div>
          <div>
            <h4 style={{ marginBottom: "8px", fontSize: "14px" }}>Wave</h4>
            <Skeleton animation="wave" width={200} height={20} />
          </div>
          <div>
            <h4 style={{ marginBottom: "8px", fontSize: "14px" }}>None</h4>
            <Skeleton animation="none" width={200} height={20} />
          </div>
        </div>
      </div>

      {/* Componentes especializados */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ 
          fontSize: "18px", 
          marginBottom: "16px",
          color: "var(--duino-color-fg)" 
        }}>
          Componentes Especializados
        </h3>
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px"
        }}>
          <div>
            <h4 style={{ marginBottom: "12px", fontSize: "14px" }}>Avatar</h4>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <SkeletonAvatar size={40} shape="circle" />
              <SkeletonAvatar size={40} shape="square" />
              <SkeletonAvatar size={50} shape="circle" />
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: "12px", fontSize: "14px" }}>Botones</h4>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <SkeletonButton size="sm" />
              <SkeletonButton size="md" />
              <SkeletonButton shape="circle" />
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: "12px", fontSize: "14px" }}>Inputs</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <SkeletonInput size="sm" />
              <SkeletonInput size="md" />
            </div>
          </div>
        </div>
      </div>

      {/* Ejemplos de uso real */}
      <div>
        <h3 style={{ 
          fontSize: "18px", 
          marginBottom: "16px",
          color: "var(--duino-color-fg)" 
        }}>
          Ejemplos de Uso
        </h3>
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px"
        }}>
          {/* Perfil de usuario */}
          <div style={{ 
            border: "1px solid var(--duino-border)",
            borderRadius: "8px",
            padding: "16px"
          }}>
            <h4 style={{ marginBottom: "12px", fontSize: "14px" }}>Perfil de Usuario</h4>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <SkeletonAvatar size={50} />
              <div style={{ flex: 1 }}>
                <Skeleton variant="text" width="120px" height="16px" style={{ marginBottom: "6px" }} />
                <Skeleton variant="text" width="80px" height="14px" />
              </div>
            </div>
          </div>
          
          {/* Lista de comentarios */}
          <div style={{ 
            border: "1px solid var(--duino-border)",
            borderRadius: "8px",
            padding: "16px"
          }}>
            <h4 style={{ marginBottom: "12px", fontSize: "14px" }}>Lista de Comentarios</h4>
            {[1, 2].map((item) => (
              <div key={item} style={{ 
                display: "flex", 
                gap: "8px", 
                marginBottom: item === 1 ? "12px" : "0"
              }}>
                <SkeletonAvatar size={32} />
                <div style={{ flex: 1 }}>
                  <Skeleton variant="text" width="100px" height="14px" style={{ marginBottom: "4px" }} />
                  <Skeleton variant="text" width="180px" height="12px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

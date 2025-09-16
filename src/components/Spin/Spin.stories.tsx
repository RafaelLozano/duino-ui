import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Spin } from "./Spin";
import { Button } from "../Button/Button";

const meta: Meta<typeof Spin> = {
  title: "components/Spin",
  component: Spin,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Componente Spin del sistema de diseño Arduino para indicadores de carga.

**Características:**
- 6 tipos de animación (circle, dots, pulse, bars, ring, wave)
- 5 tamaños disponibles (xs, sm, md, lg, xl)
- Puede envolver contenido o usarse standalone
- Delay configurable
- Texto de tip personalizable
- Indicadores personalizados
- Responsive y accesible
- Metodología BEM para CSS
        `,
      },
    },
  },
  argTypes: {
    spinning: {
      control: "boolean",
      description: "Si el spinner está activo",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Tamaño del spinner",
    },
    type: {
      control: "select",
      options: ["circle", "dots", "pulse", "bars", "ring", "wave"],
      description: "Tipo de animación",
    },
    tip: {
      control: "text",
      description: "Texto que aparece debajo del spinner",
    },
    delay: {
      control: "number",
      description: "Delay antes de mostrar el spinner (ms)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spin>;

export const Default: Story = {
  args: {
    spinning: true,
  },
};

export const WithTip: Story = {
  args: {
    spinning: true,
    tip: "Cargando datos...",
  },
};

// Todos los tipos de spinner
export const AllTypes: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '24px',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Circle</h4>
        <Spin type="circle" tip="Circle" />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Dots</h4>
        <Spin type="dots" tip="Dots" />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Pulse</h4>
        <Spin type="pulse" tip="Pulse" />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Bars</h4>
        <Spin type="bars" tip="Bars" />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Ring</h4>
        <Spin type="ring" tip="Ring" />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Wave</h4>
        <Spin type="wave" tip="Wave" />
      </div>
    </div>
  ),
};

// Todos los tamaños
export const AllSizes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      padding: '20px',
      flexWrap: 'wrap'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--duino-color-muted)' }}>XS</div>
        <Spin size="xs" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--duino-color-muted)' }}>SM</div>
        <Spin size="sm" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--duino-color-muted)' }}>MD</div>
        <Spin size="md" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--duino-color-muted)' }}>LG</div>
        <Spin size="lg" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--duino-color-muted)' }}>XL</div>
        <Spin size="xl" />
      </div>
    </div>
  ),
};

// Envolviendo contenido
export const WithContent: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);

    const handleLoad = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 3000);
    };

    return (
      <div style={{ width: '400px', textAlign: 'center' }}>
        <Button onClick={handleLoad} disabled={loading} style={{ marginBottom: '20px' }}>
          {loading ? 'Cargando...' : 'Cargar Datos'}
        </Button>
        
        <Spin spinning={loading} tip="Obteniendo información...">
          <div style={{ 
            padding: '40px 20px',
            border: '1px solid var(--duino-border)',
            borderRadius: 'var(--duino-radius)',
            backgroundColor: 'var(--duino-color-bg)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
              Información de Arduino
            </h3>
            <p style={{ margin: '0 0 12px 0', lineHeight: 1.6 }}>
              Arduino es una plataforma de creación de prototipos electrónicos de código abierto 
              basada en hardware y software flexibles y fáciles de usar.
            </p>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              Está pensado para artistas, diseñadores, aficionados y cualquier persona 
              interesada en crear objetos o entornos interactivos.
            </p>
          </div>
        </Spin>
      </div>
    );
  },
};

// Con delay
export const WithDelay: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);

    const handleLoad = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 4000);
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <Button onClick={handleLoad} disabled={loading} style={{ marginBottom: '20px' }}>
          Cargar con Delay (500ms)
        </Button>
        
        <Spin 
          spinning={loading} 
          delay={500}
          tip="Esperando respuesta del servidor..."
          size="lg"
        >
          <div style={{ 
            padding: '40px',
            border: '1px solid var(--duino-border)',
            borderRadius: 'var(--duino-radius)',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 8px 0' }}>Datos del Servidor</h3>
              <p style={{ margin: 0, color: 'var(--duino-color-muted)' }}>
                El spinner aparece después de 500ms para evitar parpadeos en cargas rápidas
              </p>
            </div>
          </div>
        </Spin>
      </div>
    );
  },
};

// Spinner personalizado
export const CustomIndicator: Story = {
  args: {
    spinning: true,
    tip: "Conectando con Arduino...",
    indicator: (
      <div style={{
        width: '32px',
        height: '32px',
        background: 'linear-gradient(45deg, var(--duino-brand-400), var(--duino-brand-600))',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: '600',
        fontSize: '14px',
        animation: 'duino-spin-rotate 2s linear infinite',
        boxShadow: '0 2px 8px rgba(20, 184, 166, 0.3)'
      }}>
        A
      </div>
    ),
  },
};

// Casos de uso comunes
export const CommonUseCases: Story = {
  render: () => {
    const [states, setStates] = useState({
      uploading: false,
      downloading: false,
      processing: false,
      connecting: false,
    });

    const handleAction = (action: keyof typeof states, duration: number = 2000) => {
      setStates(prev => ({ ...prev, [action]: true }));
      setTimeout(() => {
        setStates(prev => ({ ...prev, [action]: false }));
      }, duration);
    };

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{ 
          padding: '20px',
          backgroundColor: 'var(--duino-brand-50)',
          borderRadius: 'var(--duino-radius)',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '20px', 
            fontWeight: '600',
            color: 'var(--duino-brand-700)'
          }}>
            Arduino IDE - Casos de Uso
          </h2>
          <p style={{ 
            margin: '0 0 16px 0', 
            color: 'var(--duino-color-muted)',
            fontSize: '14px'
          }}>
            Diferentes estados de carga en el entorno de desarrollo
          </p>
          
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              onClick={() => handleAction('uploading')}
              disabled={states.uploading}
              size="sm"
            >
              Subir Código
            </Button>
            <Button 
              onClick={() => handleAction('downloading')}
              disabled={states.downloading}
              variant="secondary"
              size="sm"
            >
              Descargar Librería
            </Button>
            <Button 
              onClick={() => handleAction('processing')}
              disabled={states.processing}
              variant="ghost"
              size="sm"
            >
              Compilar
            </Button>
            <Button 
              onClick={() => handleAction('connecting')}
              disabled={states.connecting}
              variant="text"
              size="sm"
            >
              Conectar Puerto
            </Button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {/* Subiendo código */}
          <Spin 
            spinning={states.uploading} 
            tip="Subiendo código a Arduino..."
            type="bars"
            size="sm"
          >
            <div style={{ 
              padding: '20px',
              border: '1px solid var(--duino-border)',
              borderRadius: 'var(--duino-radius)',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📤</div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>
                Upload Manager
              </h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--duino-color-muted)', textAlign: 'center' }}>
                Transferir sketch a la placa
              </p>
            </div>
          </Spin>

          {/* Descargando librería */}
          <Spin 
            spinning={states.downloading} 
            tip="Descargando desde repositorio..."
            type="wave"
            size="sm"
          >
            <div style={{ 
              padding: '20px',
              border: '1px solid var(--duino-border)',
              borderRadius: 'var(--duino-radius)',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📦</div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>
                Library Manager
              </h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--duino-color-muted)', textAlign: 'center' }}>
                Instalar nuevas librerías
              </p>
            </div>
          </Spin>

          {/* Compilando */}
          <Spin 
            spinning={states.processing} 
            tip="Compilando sketch..."
            type="pulse"
            size="sm"
          >
            <div style={{ 
              padding: '20px',
              border: '1px solid var(--duino-border)',
              borderRadius: 'var(--duino-radius)',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚙️</div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>
                Compiler
              </h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--duino-color-muted)', textAlign: 'center' }}>
                Verificar y compilar código
              </p>
            </div>
          </Spin>

          {/* Conectando */}
          <Spin 
            spinning={states.connecting} 
            tip="Estableciendo conexión..."
            type="ring"
            size="sm"
          >
            <div style={{ 
              padding: '20px',
              border: '1px solid var(--duino-border)',
              borderRadius: 'var(--duino-radius)',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔌</div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>
                Serial Monitor
              </h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--duino-color-muted)', textAlign: 'center' }}>
                Conectar con puerto serie
              </p>
            </div>
          </Spin>
        </div>
      </div>
    );
  },
};

// Standalone spinners
export const Standalone: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px',
      padding: '40px',
      flexWrap: 'wrap'
    }}>
      <Spin size="xs" type="dots" />
      <Spin size="sm" type="circle" />
      <Spin size="md" type="pulse" />
      <Spin size="lg" type="bars" />
      <Spin size="xl" type="wave" />
    </div>
  ),
};

// En botones
export const InButtons: Story = {
  render: () => {
    const [loadingStates, setLoadingStates] = useState({
      save: false,
      upload: false,
      compile: false,
    });

    const handleButtonAction = (action: keyof typeof loadingStates) => {
      setLoadingStates(prev => ({ ...prev, [action]: true }));
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [action]: false }));
      }, 2000);
    };

    return (
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <Button 
          onClick={() => handleButtonAction('save')}
          disabled={loadingStates.save}
        >
          {loadingStates.save ? (
            <>
              <Spin size="xs" type="circle" />
              Guardando...
            </>
          ) : (
            'Guardar'
          )}
        </Button>

        <Button 
          variant="secondary"
          onClick={() => handleButtonAction('upload')}
          disabled={loadingStates.upload}
        >
          {loadingStates.upload ? (
            <>
              <Spin size="xs" type="dots" />
              Subiendo...
            </>
          ) : (
            'Subir a Arduino'
          )}
        </Button>

        <Button 
          variant="ghost"
          onClick={() => handleButtonAction('compile')}
          disabled={loadingStates.compile}
        >
          {loadingStates.compile ? (
            <>
              <Spin size="xs" type="bars" />
              Compilando...
            </>
          ) : (
            'Compilar'
          )}
        </Button>
      </div>
    );
  },
};

// Diferentes contextos
export const DifferentContexts: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '24px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {/* En una tarjeta */}
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          En una Tarjeta
        </h3>
        <Spin spinning tip="Cargando proyectos...">
          <div style={{ 
            padding: '30px',
            border: '1px solid var(--duino-border)',
            borderRadius: 'var(--duino-radius)',
            backgroundColor: 'var(--duino-color-bg)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <h4 style={{ margin: '0 0 12px 0' }}>Mis Proyectos</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ padding: '12px', border: '1px solid var(--duino-border)', borderRadius: '6px' }}>
                Proyecto 1
              </div>
              <div style={{ padding: '12px', border: '1px solid var(--duino-border)', borderRadius: '6px' }}>
                Proyecto 2
              </div>
              <div style={{ padding: '12px', border: '1px solid var(--duino-border)', borderRadius: '6px' }}>
                Proyecto 3
              </div>
            </div>
          </div>
        </Spin>
      </div>

      {/* En una lista */}
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          En una Lista
        </h3>
        <Spin spinning tip="Actualizando lista..." type="dots" size="sm">
          <div style={{ 
            border: '1px solid var(--duino-border)',
            borderRadius: 'var(--duino-radius)',
            overflow: 'hidden'
          }}>
            {['Arduino Uno', 'Arduino Nano', 'Arduino Mega', 'Arduino Leonardo'].map((board, index) => (
              <div 
                key={board}
                style={{ 
                  padding: '12px 16px',
                  borderBottom: index < 3 ? '1px solid var(--duino-border)' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{board}</span>
                <span style={{ 
                  fontSize: '12px', 
                  color: 'var(--duino-brand-500)',
                  fontWeight: '500'
                }}>
                  Disponible
                </span>
              </div>
            ))}
          </div>
        </Spin>
      </div>

      {/* Página completa */}
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Página Completa
        </h3>
        <Spin spinning tip="Inicializando Arduino IDE..." type="pulse" size="lg">
          <div style={{ 
            minHeight: '300px',
            border: '1px solid var(--duino-border)',
            borderRadius: 'var(--duino-radius)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <header style={{ 
              padding: '12px',
              backgroundColor: 'var(--duino-brand-100)',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <h4 style={{ margin: 0, color: 'var(--duino-brand-700)' }}>
                Arduino IDE 2.3.2
              </h4>
            </header>
            
            <div style={{ flex: 1, display: 'flex', gap: '16px' }}>
              <div style={{ 
                flex: 1, 
                padding: '16px',
                border: '1px solid var(--duino-border)',
                borderRadius: '6px'
              }}>
                <h5 style={{ margin: '0 0 8px 0' }}>Editor</h5>
                <div style={{ height: '100px', backgroundColor: '#f8f9fa', borderRadius: '4px' }} />
              </div>
              
              <div style={{ 
                width: '200px', 
                padding: '16px',
                border: '1px solid var(--duino-border)',
                borderRadius: '6px'
              }}>
                <h5 style={{ margin: '0 0 8px 0' }}>Monitor Serie</h5>
                <div style={{ height: '100px', backgroundColor: '#f8f9fa', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  ),
};

// Demo interactivo
export const InteractiveDemo: Story = {
  args: {
    type: "circle"
  },

  render: () => {
    const [config, setConfig] = useState({
      type: 'circle' as const,
      size: 'md' as const,
      spinning: true,
      tip: 'Cargando...',
      delay: 0,
    });

    return (
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <div style={{ 
          padding: '20px',
          backgroundColor: 'var(--duino-brand-50)',
          borderRadius: 'var(--duino-radius)',
          border: '1px solid var(--duino-brand-200)',
          width: '100%'
        }}>
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '18px', 
            fontWeight: '600',
            color: 'var(--duino-brand-700)',
            textAlign: 'center'
          }}>
            Configuración del Spinner
          </h3>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>
                Tipo:
              </label>
              <select
                value={config.type}
                onChange={(e) => setConfig(prev => ({ ...prev, type: e.target.value as any }))}
                style={{
                  width: '100%',
                  padding: '4px 6px',
                  border: '1px solid var(--duino-border)',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
              >
                <option value="circle">Circle</option>
                <option value="dots">Dots</option>
                <option value="pulse">Pulse</option>
                <option value="bars">Bars</option>
                <option value="ring">Ring</option>
                <option value="wave">Wave</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>
                Tamaño:
              </label>
              <select
                value={config.size}
                onChange={(e) => setConfig(prev => ({ ...prev, size: e.target.value as any }))}
                style={{
                  width: '100%',
                  padding: '4px 6px',
                  border: '1px solid var(--duino-border)',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
              >
                <option value="xs">XS</option>
                <option value="sm">SM</option>
                <option value="md">MD</option>
                <option value="lg">LG</option>
                <option value="xl">XL</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>
                Delay (ms):
              </label>
              <input
                type="number"
                value={config.delay}
                onChange={(e) => setConfig(prev => ({ ...prev, delay: Number(e.target.value) }))}
                min="0"
                max="2000"
                step="100"
                style={{
                  width: '100%',
                  padding: '4px 6px',
                  border: '1px solid var(--duino-border)',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>
              Texto del tip:
            </label>
            <input
              type="text"
              value={config.tip}
              onChange={(e) => setConfig(prev => ({ ...prev, tip: e.target.value }))}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid var(--duino-border)',
                borderRadius: '4px',
                fontSize: '13px',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <Button 
              size="sm"
              variant={config.spinning ? "danger" : "primary"}
              onClick={() => setConfig(prev => ({ ...prev, spinning: !prev.spinning }))}
            >
              {config.spinning ? 'Detener' : 'Iniciar'}
            </Button>
          </div>
        </div>

        {/* Vista previa */}
        <div style={{ 
          border: '2px dashed var(--duino-brand-300)',
          borderRadius: 'var(--duino-radius)',
          padding: '40px',
          backgroundColor: 'var(--duino-color-bg)',
          width: '100%',
          textAlign: 'center'
        }}>
          <Spin 
            spinning={config.spinning}
            type={config.type}
            size={config.size}
            tip={config.tip}
            delay={config.delay}
          >
            <div style={{ 
              minHeight: '150px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ fontSize: '32px' }}>🎯</div>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                Contenido de Ejemplo
              </h4>
              <p style={{ margin: 0, color: 'var(--duino-color-muted)', fontSize: '14px' }}>
                Este contenido se difumina cuando el spinner está activo
              </p>
            </div>
          </Spin>
        </div>
      </div>
    );
  }
};

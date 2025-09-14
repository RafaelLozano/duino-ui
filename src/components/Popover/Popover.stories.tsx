import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Popover } from "./Popover";
import { Button } from "../Button/Button";

// Iconos de ejemplo
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const HelpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-3.5L19 12l1.5 1.5M4.5 16.5L3 12l-1.5-1.5" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const meta: Meta<typeof Popover> = {
  title: "components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Componente Popover del sistema de diseño Arduino para mostrar contenido contextual.

**Características:**
- 12 posiciones disponibles (top, bottom, left, right con variantes)
- 5 tipos de trigger (hover, click, focus, contextmenu, manual)
- Posicionamiento inteligente automático
- Contenido rico (HTML, componentes React)
- Animaciones suaves
- Responsive y accesible
- Metodología BEM para CSS
        `,
      },
    },
  },
  argTypes: {
    trigger: {
      control: "select",
      options: ["hover", "click", "focus", "contextmenu", "manual"],
      description: "Cómo se activa el popover",
    },
    placement: {
      control: "select",
      options: [
        "top", "top-start", "top-end",
        "bottom", "bottom-start", "bottom-end",
        "left", "left-start", "left-end",
        "right", "right-start", "right-end"
      ],
      description: "Posición del popover",
    },
    visible: {
      control: "boolean",
      description: "Controlar visibilidad manualmente",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilitar el popover",
    },
    mouseEnterDelay: {
      control: "number",
      description: "Delay antes de mostrar (ms)",
    },
    mouseLeaveDelay: {
      control: "number",
      description: "Delay antes de ocultar (ms)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    content: "Este es un popover básico con información útil.",
    children: <Button>Hover me</Button>,
  },
};

export const WithTitle: Story = {
  args: {
    title: "Información",
    content: "Este popover tiene un título y contenido. Útil para explicaciones más detalladas.",
    children: <Button icon={<InfoIcon />}>Info</Button>,
  },
};

export const ClickTrigger: Story = {
  args: {
    trigger: "click",
    title: "Click Popover",
    content: "Este popover se abre al hacer click. Haz click fuera para cerrarlo.",
    children: <Button variant="secondary">Click me</Button>,
  },
};

export const FocusTrigger: Story = {
  args: {
    trigger: "focus",
    content: "Este popover se muestra cuando el elemento recibe foco (útil para accesibilidad).",
    children: <Button variant="ghost">Focus me</Button>,
  },
};

export const RichContent: Story = {
  args: {
    title: "Arduino IDE",
    content: (
      <div>
        <p><strong>Versión:</strong> 2.3.2</p>
        <p><strong>Características:</strong></p>
        <ul>
          <li>Editor de código avanzado</li>
          <li>Compilación automática</li>
          <li>Biblioteca de ejemplos</li>
          <li>Monitor serie integrado</li>
        </ul>
        <hr />
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <Button size="sm" variant="primary">Descargar</Button>
          <Button size="sm" variant="ghost">Más info</Button>
        </div>
      </div>
    ),
    children: <Button icon={<InfoIcon />}>Arduino IDE</Button>,
  },
};

// Showcase de todas las posiciones
export const AllPlacements: Story = {
  render: () => {
    const placements = [
      ['top-start', 'top', 'top-end'],
      ['left-start', '', 'right-start'],
      ['left', '', 'right'],
      ['left-end', '', 'right-end'],
      ['bottom-start', 'bottom', 'bottom-end'],
    ];

    return (
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        padding: '40px',
        minHeight: '300px',
        alignItems: 'center',
        justifyItems: 'center'
      }}>
        {placements.flat().map((placement, index) => 
          placement ? (
            <Popover
              key={placement}
              content={`Popover en posición: ${placement}`}
              placement={placement as any}
              trigger="hover"
            >
              <Button size="sm" variant="ghost">
                {placement}
              </Button>
            </Popover>
          ) : (
            <div key={index} />
          )
        )}
      </div>
    );
  },
};

// Diferentes triggers
export const AllTriggers: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Popover
        content="Se muestra al pasar el mouse por encima"
        trigger="hover"
        title="Hover"
      >
        <Button variant="primary">Hover</Button>
      </Popover>

      <Popover
        content="Se muestra al hacer click. Haz click fuera para cerrar."
        trigger="click"
        title="Click"
      >
        <Button variant="secondary">Click</Button>
      </Popover>

      <Popover
        content="Se muestra cuando el elemento recibe foco"
        trigger="focus"
        title="Focus"
      >
        <Button variant="ghost">Focus</Button>
      </Popover>

      <Popover
        content="Se muestra con click derecho (menú contextual)"
        trigger="contextmenu"
        title="Right Click"
      >
        <Button variant="text">Right Click</Button>
      </Popover>
    </div>
  ),
};

// Popover controlado manualmente
export const ManualControl: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Button 
            onClick={() => setVisible(!visible)}
            variant={visible ? "danger" : "primary"}
          >
            {visible ? "Ocultar" : "Mostrar"} Popover
          </Button>
        </div>

        <Popover
          content="Este popover se controla manualmente desde el código."
          title="Control Manual"
          trigger="manual"
          visible={visible}
          onVisibleChange={setVisible}
        >
          <div style={{ 
            padding: '12px 16px',
            border: '2px dashed var(--duino-brand-300)',
            borderRadius: 'var(--duino-radius)',
            color: 'var(--duino-brand-600)',
            fontWeight: '500'
          }}>
            Target Element
          </div>
        </Popover>
      </div>
    );
  },
};

// Popover con formulario
export const WithForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Datos: ${JSON.stringify(formData)}`);
    };

    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Popover
          trigger="click"
          title="Formulario Rápido"
          content={
            <form onSubmit={handleSubmit} style={{ width: '250px' }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>
                  Nombre:
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: '1px solid var(--duino-border)',
                    borderRadius: '4px',
                    fontSize: '13px',
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>
                  Email:
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: '1px solid var(--duino-border)',
                    borderRadius: '4px',
                    fontSize: '13px',
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <Button type="button" variant="ghost" size="sm">
                  Cancelar
                </Button>
                <Button type="submit" size="sm">
                  Enviar
                </Button>
              </div>
            </form>
          }
        >
          <Button icon={<UserIcon />}>
            Formulario Rápido
          </Button>
        </Popover>
      </div>
    );
  },
};

// Popovers anidados
export const Nested: Story = {
  render: () => (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <Popover
        content={
          <div>
            <p>Este es el primer popover.</p>
            <Popover
              content="¡Popover anidado! Funciona perfectamente."
              trigger="click"
              placement="right"
            >
              <Button size="sm" variant="secondary">
                Abrir Anidado
              </Button>
            </Popover>
          </div>
        }
        trigger="click"
        title="Popover Principal"
      >
        <Button>Abrir Popover</Button>
      </Popover>
    </div>
  ),
};

// Ejemplo con delays personalizados
export const CustomDelays: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      justifyContent: 'center',
      padding: '20px',
      flexWrap: 'wrap'
    }}>
      <Popover
        content="Aparece inmediatamente"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
      >
        <Button variant="primary">Sin Delay</Button>
      </Popover>

      <Popover
        content="Aparece después de 500ms"
        mouseEnterDelay={500}
        mouseLeaveDelay={200}
      >
        <Button variant="secondary">Delay Normal</Button>
      </Popover>

      <Popover
        content="Aparece después de 1 segundo"
        mouseEnterDelay={1000}
        mouseLeaveDelay={300}
      >
        <Button variant="ghost">Delay Largo</Button>
      </Popover>
    </div>
  ),
};

// Contenido complejo con código
export const WithCodeExample: Story = {
  args: {
    title: "Ejemplo de Código",
    content: (
      <div>
        <p>Aquí tienes un ejemplo de cómo usar el componente:</p>
        <pre style={{ margin: '8px 0' }}>
{`<Button variant="primary">
  Mi Botón
</Button>`}
        </pre>
        <p>También puedes usar <code>variant="secondary"</code> para un estilo diferente.</p>
        <div style={{ marginTop: '12px' }}>
          <Button size="sm">Ejemplo</Button>
        </div>
      </div>
    ),
    trigger: "click",
    children: <Button icon={<InfoIcon />}>Ver Código</Button>,
  },
};

// Tooltips simples (sin título)
export const SimpleTooltips: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '12px', 
      justifyContent: 'center',
      padding: '20px',
      flexWrap: 'wrap'
    }}>
      <Popover content="Guardar archivo" placement="top">
        <Button icon={<InfoIcon />} variant="ghost" />
      </Popover>

      <Popover content="Configuración avanzada" placement="bottom">
        <Button icon={<SettingsIcon />} variant="ghost" />
      </Popover>

      <Popover content="Ayuda y soporte" placement="left">
        <Button icon={<HelpIcon />} variant="ghost" />
      </Popover>

      <Popover content="Perfil de usuario" placement="right">
        <Button icon={<UserIcon />} variant="ghost" />
      </Popover>
    </div>
  ),
};

// Demo interactivo completo
export const InteractiveDemo: Story = {
  render: () => {
    const [placement, setPlacement] = useState<any>('top');
    const [trigger, setTrigger] = useState<any>('hover');
    const [withTitle, setWithTitle] = useState(true);

    return (
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        padding: '40px',
        fontFamily: 'var(--duino-font)'
      }}>
        <div style={{ 
          padding: '20px',
          backgroundColor: 'var(--duino-brand-50)',
          borderRadius: 'var(--duino-radius)',
          border: '1px solid var(--duino-brand-200)'
        }}>
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '18px', 
            fontWeight: '600',
            color: 'var(--duino-brand-700)'
          }}>
            Configuración del Popover
          </h3>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Posición:
              </label>
              <select
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid var(--duino-border)',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                <optgroup label="Top">
                  <option value="top">Top</option>
                  <option value="top-start">Top Start</option>
                  <option value="top-end">Top End</option>
                </optgroup>
                <optgroup label="Bottom">
                  <option value="bottom">Bottom</option>
                  <option value="bottom-start">Bottom Start</option>
                  <option value="bottom-end">Bottom End</option>
                </optgroup>
                <optgroup label="Left">
                  <option value="left">Left</option>
                  <option value="left-start">Left Start</option>
                  <option value="left-end">Left End</option>
                </optgroup>
                <optgroup label="Right">
                  <option value="right">Right</option>
                  <option value="right-start">Right Start</option>
                  <option value="right-end">Right End</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Trigger:
              </label>
              <select
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid var(--duino-border)',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                <option value="hover">Hover</option>
                <option value="click">Click</option>
                <option value="focus">Focus</option>
                <option value="contextmenu">Right Click</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="withTitle"
                checked={withTitle}
                onChange={(e) => setWithTitle(e.target.checked)}
              />
              <label htmlFor="withTitle" style={{ fontSize: '14px', fontWeight: '500' }}>
                Con título
              </label>
            </div>
          </div>
        </div>

        <div style={{ 
          padding: '40px',
          border: '2px dashed var(--duino-brand-300)',
          borderRadius: 'var(--duino-radius)',
          backgroundColor: 'var(--duino-color-bg)'
        }}>
          <Popover
            content={
              <div>
                <p>Este popover se configura dinámicamente.</p>
                <p><strong>Posición:</strong> {placement}</p>
                <p><strong>Trigger:</strong> {trigger}</p>
                <p><strong>Con título:</strong> {withTitle ? 'Sí' : 'No'}</p>
              </div>
            }
            title={withTitle ? "Popover Configurable" : undefined}
            placement={placement}
            trigger={trigger}
          >
            <Button size="lg">
              Target Element
            </Button>
          </Popover>
        </div>

        <div style={{ 
          fontSize: '14px', 
          color: 'var(--duino-color-muted)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          Cambia la configuración arriba y prueba diferentes combinaciones de posición y trigger.
        </div>
      </div>
    );
  },
};

// Casos de uso comunes
export const CommonUseCases: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '32px',
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Tooltips de Ayuda
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Popover content="Esta función te permite guardar tu trabajo">
            <Button icon={<InfoIcon />} variant="ghost" />
          </Popover>
          <Popover content="Configura las preferencias de la aplicación">
            <Button icon={<SettingsIcon />} variant="ghost" />
          </Popover>
          <Popover content="Obtén ayuda y soporte técnico">
            <Button icon={<HelpIcon />} variant="ghost" />
          </Popover>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Información de Usuario
        </h3>
        <Popover
          trigger="click"
          title="Rafael Lozano"
          content={
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: 'var(--duino-brand-500)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  RL
                </div>
                <div>
                  <div style={{ fontWeight: '500', fontSize: '14px' }}>Rafael Lozano</div>
                  <div style={{ fontSize: '12px', color: 'var(--duino-color-muted)' }}>
                    rafael@arduino.cc
                  </div>
                </div>
              </div>
              <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid var(--duino-border)' }} />
              <div style={{ fontSize: '12px', color: 'var(--duino-color-muted)' }}>
                <p style={{ margin: '0 0 4px 0' }}>Desarrollador Frontend</p>
                <p style={{ margin: '0 0 8px 0' }}>Miembro desde: Enero 2024</p>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <Button size="sm" variant="ghost">Ver Perfil</Button>
                <Button size="sm" variant="primary">Mensaje</Button>
              </div>
            </div>
          }
          placement="bottom-start"
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            border: '1px solid var(--duino-border)',
            borderRadius: 'var(--duino-radius)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: 'var(--duino-brand-500)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '12px'
            }}>
              RL
            </div>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Rafael Lozano</span>
          </div>
        </Popover>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Menú de Acciones
        </h3>
        <Popover
          trigger="click"
          content={
            <div style={{ minWidth: '150px' }}>
              <div style={{ padding: '4px 0' }}>
                <button style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  border: 'none', 
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontSize: '13px'
                }}>
                  Editar
                </button>
                <button style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  border: 'none', 
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontSize: '13px'
                }}>
                  Duplicar
                </button>
                <button style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  border: 'none', 
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontSize: '13px'
                }}>
                  Compartir
                </button>
                <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid var(--duino-border)' }} />
                <button style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  border: 'none', 
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontSize: '13px',
                  color: 'var(--duino-danger-500)'
                }}>
                  Eliminar
                </button>
              </div>
            </div>
          }
          placement="bottom-end"
        >
          <Button variant="ghost">Acciones ⋮</Button>
        </Popover>
      </div>
    </div>
  ),
};

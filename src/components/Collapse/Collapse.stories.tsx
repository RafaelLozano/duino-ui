import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Collapse, CollapsePanel } from "./Collapse";
import { Button } from "../Button/Button";
import type { CollapseItem } from "./Collapse";

// Iconos de ejemplo
const QuestionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16,18 22,12 16,6" />
    <polyline points="8,6 2,12 8,18" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-3.5L19 12l1.5 1.5M4.5 16.5L3 12l-1.5-1.5" />
  </svg>
);

// Datos de ejemplo
const faqItems: CollapseItem[] = [
  {
    key: 'what-is-arduino',
    label: '¿Qué es Arduino?',
    children: (
      <div>
        <p>
          <strong>Arduino</strong> es una plataforma de creación de prototipos electrónicos de código abierto (open-source) 
          basada en hardware y software flexibles y fáciles de usar.
        </p>
        <p>
          Está pensado para artistas, diseñadores, aficionados y cualquier persona interesada en crear 
          objetos o entornos interactivos.
        </p>
        <ul>
          <li>Hardware libre y flexible</li>
          <li>Software multiplataforma</li>
          <li>Comunidad activa y global</li>
          <li>Documentación extensa</li>
        </ul>
      </div>
    ),
  },
  {
    key: 'getting-started',
    label: '¿Cómo empezar con Arduino?',
    children: (
      <div>
        <p>Para comenzar con Arduino necesitas:</p>
        <ol>
          <li><strong>Una placa Arduino</strong> (recomendamos Arduino Uno para principiantes)</li>
          <li><strong>El Arduino IDE</strong> (entorno de desarrollo)</li>
          <li><strong>Un cable USB</strong> para conectar la placa</li>
          <li><strong>Componentes básicos</strong> (LEDs, resistencias, protoboard)</li>
        </ol>
        <blockquote>
          💡 <strong>Tip:</strong> Comienza con el kit Arduino Starter Kit que incluye todo lo necesario.
        </blockquote>
        <div style={{ marginTop: '12px' }}>
          <Button size="sm" variant="primary">Descargar IDE</Button>
          <Button size="sm" variant="ghost" style={{ marginLeft: '8px' }}>Ver Tutoriales</Button>
        </div>
      </div>
    ),
  },
  {
    key: 'programming',
    label: '¿Qué lenguaje usa Arduino?',
    children: (
      <div>
        <p>
          Arduino utiliza un lenguaje basado en <strong>C/C++</strong> que es simplificado 
          para hacer la programación más accesible.
        </p>
        
        <h4>Ejemplo básico:</h4>
        <pre>
{`void setup() {
  // Configuración inicial
  pinMode(13, OUTPUT);
}

void loop() {
  // Código que se ejecuta repetidamente
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}`}
        </pre>
        
        <p>
          Este código hace parpadear un LED conectado al pin 13 cada segundo.
        </p>
      </div>
    ),
  },
  {
    key: 'projects',
    label: '¿Qué proyectos puedo hacer?',
    children: (
      <div>
        <p>Con Arduino puedes crear una gran variedad de proyectos:</p>
        
        <h4>🏠 Domótica</h4>
        <ul>
          <li>Control de luces automático</li>
          <li>Sistemas de riego inteligente</li>
          <li>Monitoreo de temperatura</li>
        </ul>
        
        <h4>🤖 Robótica</h4>
        <ul>
          <li>Robots móviles</li>
          <li>Brazos robóticos</li>
          <li>Drones básicos</li>
        </ul>
        
        <h4>🎨 Arte Interactivo</h4>
        <ul>
          <li>Instalaciones lumínicas</li>
          <li>Música reactiva</li>
          <li>Esculturas interactivas</li>
        </ul>
        
        <hr />
        <p>
          <em>La única limitación es tu imaginación.</em> 
          Visita <a href="https://projecthub.arduino.cc" target="_blank">Arduino Project Hub</a> para inspirarte.
        </p>
      </div>
    ),
  },
  {
    key: 'support',
    label: '¿Dónde puedo obtener ayuda?',
    disabled: false,
    extra: <span style={{ fontSize: '12px', color: 'var(--duino-brand-500)' }}>24/7</span>,
    children: (
      <div>
        <p>Arduino tiene una comunidad muy activa y recursos de ayuda:</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', margin: '16px 0' }}>
          <div style={{ padding: '12px', border: '1px solid var(--duino-border)', borderRadius: '6px' }}>
            <h5 style={{ margin: '0 0 8px 0', color: 'var(--duino-brand-600)' }}>📚 Documentación</h5>
            <p style={{ margin: 0, fontSize: '13px' }}>Guías oficiales y referencias</p>
          </div>
          <div style={{ padding: '12px', border: '1px solid var(--duino-border)', borderRadius: '6px' }}>
            <h5 style={{ margin: '0 0 8px 0', color: 'var(--duino-brand-600)' }}>💬 Foro</h5>
            <p style={{ margin: 0, fontSize: '13px' }}>Comunidad de desarrolladores</p>
          </div>
          <div style={{ padding: '12px', border: '1px solid var(--duino-border)', borderRadius: '6px' }}>
            <h5 style={{ margin: '0 0 8px 0', color: 'var(--duino-brand-600)' }}>🎓 Cursos</h5>
            <p style={{ margin: 0, fontSize: '13px' }}>Tutoriales paso a paso</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <Button size="sm">Ir al Foro</Button>
          <Button size="sm" variant="secondary">Ver Docs</Button>
          <Button size="sm" variant="ghost">Contactar</Button>
        </div>
      </div>
    ),
  },
];

const meta: Meta<typeof Collapse> = {
  title: "components/Collapse",
  component: Collapse,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Componente Collapse del sistema de diseño Arduino para mostrar contenido expandible.

**Características:**
- Modo acordeón o múltiple
- Animaciones suaves de altura
- 3 variantes de diseño
- 3 tamaños disponibles
- Iconos personalizables
- Contenido rico (HTML, componentes)
- Responsive y accesible
- Metodología BEM para CSS
        `,
      },
    },
  },
  argTypes: {
    accordion: {
      control: "boolean",
      description: "Modo acordeón (solo un panel abierto)",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del collapse",
    },
    variant: {
      control: "select",
      options: ["default", "ghost", "bordered"],
      description: "Variante visual del collapse",
    },
    bordered: {
      control: "boolean",
      description: "Mostrar bordes",
    },
    ghost: {
      control: "boolean",
      description: "Estilo fantasma",
    },
    collapsible: {
      control: "select",
      options: ["header", "icon", "disabled"],
      description: "Qué área es clickeable",
    },
    expandIconPosition: {
      control: "select",
      options: ["start", "end"],
      description: "Posición del icono de expansión",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapse>;

export const Default: Story = {
  args: {
    items: faqItems.slice(0, 3),
    defaultActiveKey: ['what-is-arduino'],
  },
};

export const Accordion: Story = {
  args: {
    items: faqItems,
    accordion: true,
    defaultActiveKey: 'what-is-arduino',
  },
};

export const Ghost: Story = {
  args: {
    items: faqItems.slice(0, 3),
    variant: "ghost",
    defaultActiveKey: ['what-is-arduino'],
  },
};

export const Bordered: Story = {
  args: {
    items: faqItems.slice(0, 3),
    variant: "bordered",
    defaultActiveKey: ['what-is-arduino'],
  },
};

export const Small: Story = {
  args: {
    items: faqItems.slice(0, 3),
    size: "sm",
    defaultActiveKey: ['what-is-arduino'],
  },
};

export const Large: Story = {
  args: {
    items: faqItems.slice(0, 3),
    size: "lg",
    defaultActiveKey: ['what-is-arduino'],
  },
};

export const IconAtStart: Story = {
  args: {
    items: faqItems.slice(0, 3),
    expandIconPosition: "start",
    defaultActiveKey: ['what-is-arduino'],
  },
};

export const CustomIcon: Story = {
  args: {
    items: faqItems.slice(0, 3),
    expandIcon: ({ isActive }) => (
      <div style={{ 
        width: '20px', 
        height: '20px', 
        borderRadius: '50%',
        background: isActive ? 'var(--duino-brand-500)' : 'var(--duino-border)',
        color: isActive ? 'white' : 'var(--duino-color-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: '600',
        transition: 'all 0.2s ease'
      }}>
        {isActive ? '−' : '+'}
      </div>
    ),
    defaultActiveKey: ['what-is-arduino'],
  },
};

// Usando componentes directos
export const WithPanelComponents: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState<(string | number)[]>(['panel1']);

    return (
      <Collapse 
        activeKey={activeKey}
        onChange={setActiveKey}
      >
        <CollapsePanel 
          key="panel1" 
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <InfoIcon />
              <span>Información General</span>
            </div>
          }
          extra={<span style={{ fontSize: '12px', color: 'var(--duino-brand-500)' }}>Nuevo</span>}
        >
          <p>Este panel usa el componente CollapsePanel directamente.</p>
          <p>Puedes personalizar completamente el header con iconos y contenido extra.</p>
        </CollapsePanel>
        
        <CollapsePanel 
          key="panel2" 
          header="Configuración Avanzada"
          extra={<SettingsIcon />}
        >
          <div>
            <h4>Opciones de configuración:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" defaultChecked />
                <span>Habilitar modo debug</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" />
                <span>Auto-guardar proyecto</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" defaultChecked />
                <span>Mostrar números de línea</span>
              </label>
            </div>
          </div>
        </CollapsePanel>
        
        <CollapsePanel 
          key="panel3" 
          header="Código de Ejemplo"
        >
          <div>
            <p>Aquí tienes un ejemplo básico de Arduino:</p>
            <pre style={{ 
              background: 'var(--duino-brand-50)', 
              padding: '12px', 
              borderRadius: '6px',
              fontSize: '13px',
              overflow: 'auto'
            }}>
{`// Parpadeo de LED
#define LED_PIN 13

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(1000);
  digitalWrite(LED_PIN, LOW);
  delay(1000);
}`}
            </pre>
            <div style={{ marginTop: '12px' }}>
              <Button size="sm" icon={<CodeIcon />}>Copiar Código</Button>
            </div>
          </div>
        </CollapsePanel>
      </Collapse>
    );
  },
};

// Collapse controlado
export const Controlled: Story = {
  render: () => {
    const [activeKeys, setActiveKeys] = useState<(string | number)[]>(['faq1']);

    return (
      <div>
        <div style={{ 
          marginBottom: '16px', 
          padding: '12px', 
          backgroundColor: 'var(--duino-brand-50)', 
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <strong>Paneles activos:</strong> {activeKeys.length > 0 ? activeKeys.join(', ') : 'Ninguno'}
          <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setActiveKeys(['faq1', 'faq2', 'faq3'])}
            >
              Abrir Todos
            </Button>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setActiveKeys([])}
            >
              Cerrar Todos
            </Button>
          </div>
        </div>
        
        <Collapse
          activeKey={activeKeys}
          onChange={setActiveKeys}
          items={faqItems.slice(0, 3).map((item, index) => ({
            ...item,
            key: `faq${index + 1}`
          }))}
        />
      </div>
    );
  },
};

// Diferentes tamaños
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Small
        </h3>
        <Collapse
          size="sm"
          items={[{
            key: 'small',
            label: 'Panel pequeño',
            children: 'Contenido en tamaño pequeño con menos padding.'
          }]}
          defaultActiveKey={['small']}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Medium (Default)
        </h3>
        <Collapse
          size="md"
          items={[{
            key: 'medium',
            label: 'Panel mediano',
            children: 'Contenido en tamaño mediano con padding estándar.'
          }]}
          defaultActiveKey={['medium']}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Large
        </h3>
        <Collapse
          size="lg"
          items={[{
            key: 'large',
            label: 'Panel grande',
            children: 'Contenido en tamaño grande con más padding y mejor legibilidad.'
          }]}
          defaultActiveKey={['large']}
        />
      </div>
    </div>
  ),
};

// Diferentes variantes
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Default
        </h3>
        <Collapse
          variant="default"
          items={[{
            key: 'default',
            label: 'Variante por defecto',
            children: 'Con bordes y fondo estándar.'
          }]}
          defaultActiveKey={['default']}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Ghost
        </h3>
        <Collapse
          variant="ghost"
          items={[{
            key: 'ghost',
            label: 'Variante fantasma',
            children: 'Sin bordes contenedores, cada panel es independiente.'
          }]}
          defaultActiveKey={['ghost']}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Bordered
        </h3>
        <Collapse
          variant="bordered"
          items={[{
            key: 'bordered',
            label: 'Variante con bordes',
            children: 'Con bordes más gruesos y header destacado.'
          }]}
          defaultActiveKey={['bordered']}
        />
      </div>
    </div>
  ),
};

// Ejemplo complejo con documentación
export const DocumentationExample: Story = {
  render: () => {
    const docItems: CollapseItem[] = [
      {
        key: 'installation',
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '24px', 
              height: '24px', 
              backgroundColor: 'var(--duino-brand-500)', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              1
            </div>
            <span>Instalación del Arduino IDE</span>
          </div>
        ),
        children: (
          <div>
            <p>Sigue estos pasos para instalar el Arduino IDE en tu sistema:</p>
            
            <h4>Windows</h4>
            <ol>
              <li>Descarga el instalador desde <code>arduino.cc/downloads</code></li>
              <li>Ejecuta el archivo <code>.exe</code> descargado</li>
              <li>Sigue las instrucciones del asistente de instalación</li>
              <li>Conecta tu placa Arduino via USB</li>
            </ol>
            
            <h4>macOS</h4>
            <ol>
              <li>Descarga el archivo <code>.dmg</code></li>
              <li>Arrastra Arduino IDE a la carpeta Aplicaciones</li>
              <li>Ejecuta la aplicación</li>
            </ol>
            
            <div style={{ marginTop: '16px' }}>
              <Button size="sm" variant="primary">Descargar para Windows</Button>
              <Button size="sm" variant="secondary" style={{ marginLeft: '8px' }}>Descargar para macOS</Button>
            </div>
          </div>
        ),
      },
      {
        key: 'first-project',
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '24px', 
              height: '24px', 
              backgroundColor: 'var(--duino-brand-500)', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              2
            </div>
            <span>Tu Primer Proyecto</span>
          </div>
        ),
        children: (
          <div>
            <p>Vamos a crear el clásico "Hola Mundo" de Arduino: hacer parpadear un LED.</p>
            
            <h4>Materiales necesarios:</h4>
            <ul>
              <li>1x Arduino Uno</li>
              <li>1x LED (cualquier color)</li>
              <li>1x Resistencia 220Ω</li>
              <li>Cables de conexión</li>
              <li>Protoboard</li>
            </ul>
            
            <h4>Código:</h4>
            <pre>
{`void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}`}
            </pre>
            
            <blockquote>
              💡 <strong>Explicación:</strong> Este código configura el pin 13 como salida y 
              alterna entre encender y apagar el LED cada segundo.
            </blockquote>
          </div>
        ),
      },
      {
        key: 'troubleshooting',
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '24px', 
              height: '24px', 
              backgroundColor: 'var(--duino-danger-500)', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              !
            </div>
            <span>Solución de Problemas</span>
          </div>
        ),
        extra: <QuestionIcon />,
        children: (
          <div>
            <h4>Problemas comunes y soluciones:</h4>
            
            <div style={{ marginBottom: '16px' }}>
              <h5 style={{ color: 'var(--duino-danger-500)', margin: '0 0 8px 0' }}>
                ❌ "Puerto no encontrado"
              </h5>
              <p style={{ margin: '0 0 8px 0', fontSize: '13px' }}>
                Verifica que el cable USB esté conectado y que hayas seleccionado el puerto correcto en Herramientas → Puerto.
              </p>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <h5 style={{ color: 'var(--duino-danger-500)', margin: '0 0 8px 0' }}>
                ❌ "Error de compilación"
              </h5>
              <p style={{ margin: '0 0 8px 0', fontSize: '13px' }}>
                Revisa la sintaxis del código. Los errores más comunes son punto y coma faltantes o paréntesis sin cerrar.
              </p>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <h5 style={{ color: 'var(--duino-danger-500)', margin: '0 0 8px 0' }}>
                ❌ "El LED no parpadea"
              </h5>
              <p style={{ margin: '0 0 8px 0', fontSize: '13px' }}>
                Verifica las conexiones físicas y asegúrate de que el LED esté conectado con la polaridad correcta.
              </p>
            </div>
            
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--duino-brand-50)', borderRadius: '6px' }}>
              <p style={{ margin: 0, fontSize: '13px' }}>
                <strong>💡 Tip:</strong> Siempre verifica las conexiones físicas antes de buscar errores en el código.
              </p>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div style={{ maxWidth: '600px' }}>
        <div style={{ 
          marginBottom: '20px', 
          textAlign: 'center',
          padding: '16px',
          backgroundColor: 'var(--duino-brand-100)',
          borderRadius: 'var(--duino-radius)'
        }}>
          <h2 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '20px', 
            fontWeight: '600',
            color: 'var(--duino-brand-700)'
          }}>
            Guía de Arduino
          </h2>
          <p style={{ 
            margin: 0, 
            color: 'var(--duino-brand-600)',
            fontSize: '14px'
          }}>
            Tutorial paso a paso para comenzar
          </p>
        </div>
        
        <Collapse
          items={docItems}
          accordion
          size="md"
          variant="bordered"
        />
      </div>
    );
  },
};

// Ejemplo interactivo completo
export const InteractiveDemo: Story = {
  render: () => {
    const [mode, setMode] = useState<'multiple' | 'accordion'>('multiple');
    const [variant, setVariant] = useState<'default' | 'ghost' | 'bordered'>('default');
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
    const [iconPosition, setIconPosition] = useState<'start' | 'end'>('end');

    return (
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '800px',
        margin: '0 auto'
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
            Configuración del Collapse
          </h3>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Modo:
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid var(--duino-border)',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                <option value="multiple">Múltiple</option>
                <option value="accordion">Acordeón</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Variante:
              </label>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid var(--duino-border)',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                <option value="default">Default</option>
                <option value="ghost">Ghost</option>
                <option value="bordered">Bordered</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Tamaño:
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid var(--duino-border)',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                Icono:
              </label>
              <select
                value={iconPosition}
                onChange={(e) => setIconPosition(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid var(--duino-border)',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                <option value="start">Inicio</option>
                <option value="end">Final</option>
              </select>
            </div>
          </div>
        </div>

        <Collapse
          items={faqItems.slice(0, 4)}
          accordion={mode === 'accordion'}
          variant={variant}
          size={size}
          expandIconPosition={iconPosition}
          defaultActiveKey={mode === 'accordion' ? 'what-is-arduino' : ['what-is-arduino']}
        />
      </div>
    );
  },
};

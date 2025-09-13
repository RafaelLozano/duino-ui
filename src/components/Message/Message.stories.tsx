import type { Meta, StoryObj } from "@storybook/react";
import { MessageProvider, useMessage } from "./MessageProvider";
import type { MessagePlacement, MessageType } from "./MessageProvider";

const meta: Meta<typeof MessageProvider> = {
  title: "Components/Message",
  component: MessageProvider,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    placement: {
      control: "select",
      options: ["top-left", "top-right", "bottom-left", "bottom-right"],
    },
    maxCount: {
      control: "number",
      min: 1,
      max: 10,
    },
  },
};

export default meta;
type Story = StoryObj<typeof MessageProvider>;

// Componente de demostración que usa el hook useMessage
const MessageDemo = ({ placement = "top-right", maxCount = 5 }) => {
  const message = useMessage();

  const showMessage = (type: MessageType, content: string, options?: any) => {
    switch (type) {
      case "info":
        message.info(content, options);
        break;
      case "success":
        message.success(content, options);
        break;
      case "warning":
        message.warning(content, options);
        break;
      case "error":
        message.error(content, options);
        break;
      case "loading":
        message.loading(content, options);
        break;
      default:
        message.open({ type, content, ...options });
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h2>Sistema de Mensajes - Duino UI</h2>
      <p>
        <strong>Posición:</strong> {placement} | <strong>Máximo:</strong> {maxCount} mensajes
      </p>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <button
          className="duino-btn duino-btn--primary"
          onClick={() => showMessage("info", "Información general del sistema")}
        >
          Info
        </button>
        <button
          className="duino-btn duino-btn--primary"
          onClick={() => showMessage("success", "¡Operación completada con éxito!")}
        >
          Success
        </button>
        <button
          className="duino-btn duino-btn--primary"
          onClick={() => showMessage("warning", "Advertencia: Revisa la configuración")}
        >
          Warning
        </button>
        <button
          className="duino-btn duino-btn--danger"
          onClick={() => showMessage("error", "Error: No se pudo conectar al servidor")}
        >
          Error
        </button>
        <button
          className="duino-btn duino-btn--ghost"
          onClick={() => showMessage("loading", "Cargando datos...", { duration: 0, closable: true })}
        >
          Loading
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <button
          className="duino-btn duino-btn--secondary"
          onClick={() => showMessage("info", "Mensaje que se cierra automáticamente", { duration: 1000 })}
        >
          Auto-close (1s)
        </button>
        <button
          className="duino-btn duino-btn--secondary"
          onClick={() => showMessage("success", "Mensaje persistente con botón cerrar", { duration: 0, closable: true })}
        >
          Persistente
        </button>
        <button
          className="duino-btn duino-btn--secondary"
          onClick={() => showMessage("info", "Mensaje con duración larga", { duration: 10000 })}
        >
          Larga duración (10s)
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <button
          className="duino-btn duino-btn--ghost"
          onClick={() => {
            for (let i = 1; i <= 3; i++) {
              setTimeout(() => {
                showMessage("info", `Mensaje ${i} de 3`);
              }, i * 500);
            }
          }}
        >
          Múltiples mensajes
        </button>
        <button
          className="duino-btn duino-btn--ghost"
          onClick={() => {
            const { close } = message.loading("Procesando...", { closable: true });
            setTimeout(() => {
              close();
              message.success("¡Proceso completado!");
            }, 3000);
          }}
        >
          Secuencia Loading → Success
        </button>
      </div>

      <div style={{ marginTop: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h3>Contenido Personalizado</h3>
        <button
          className="duino-btn duino-btn--primary"
          onClick={() => message.info(
            <div>
              <strong>Mensaje con HTML</strong>
              <br />
              <small>Puedes usar cualquier contenido React</small>
            </div>
          )}
        >
          Contenido HTML
        </button>
        
        <button
          className="duino-btn duino-btn--primary"
          style={{ marginLeft: "12px" }}
          onClick={() => message.success(
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>📁</span>
              <div>
                <div><strong>Archivo guardado</strong></div>
                <small>documento.pdf - 1.2 MB</small>
              </div>
            </div>
          )}
        >
          Con icono personalizado
        </button>
      </div>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        <p><strong>Características:</strong></p>
        <ul>
          <li>Auto-close configurable (duration)</li>
          <li>Mensajes persistentes (duration: 0)</li>
          <li>Botón de cerrar opcional (closable)</li>
          <li>Máximo de mensajes simultáneos</li>
          <li>4 posiciones de pantalla</li>
          <li>Contenido React personalizable</li>
          <li>Animaciones suaves</li>
        </ul>
      </div>
    </div>
  );
};

// Template que envuelve con el Provider
const MessageTemplate = (args: any) => (
  <MessageProvider placement={args.placement} maxCount={args.maxCount}>
    <MessageDemo {...args} />
  </MessageProvider>
);

export const Default: Story = {
  render: MessageTemplate,
  args: {
    placement: "top-right",
    maxCount: 5,
  },
};

export const TopLeft: Story = {
  render: MessageTemplate,
  args: {
    placement: "top-left",
    maxCount: 5,
  },
};

export const BottomRight: Story = {
  render: MessageTemplate,
  args: {
    placement: "bottom-right",
    maxCount: 5,
  },
};

export const BottomLeft: Story = {
  render: MessageTemplate,
  args: {
    placement: "bottom-left",
    maxCount: 5,
  },
};

export const LimitedMessages: Story = {
  render: MessageTemplate,
  args: {
    placement: "top-right",
    maxCount: 3,
  },
};

// Story específico para mostrar todos los tipos
const AllTypesDemo = () => {
  const message = useMessage();

  const showAllTypes = () => {
    message.info("Mensaje informativo");
    setTimeout(() => message.success("¡Operación exitosa!"), 200);
    setTimeout(() => message.warning("Advertencia importante"), 400);
    setTimeout(() => message.error("Error crítico"), 600);
    setTimeout(() => message.loading("Cargando...", { duration: 0, closable: true }), 800);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Todos los Tipos de Mensaje</h2>
      <button className="duino-btn duino-btn--primary" onClick={showAllTypes}>
        Mostrar Todos los Tipos
      </button>
    </div>
  );
};

export const AllTypes: Story = {
  render: () => (
    <MessageProvider>
      <AllTypesDemo />
    </MessageProvider>
  ),
};

// Story para demostrar uso programático
const ProgrammaticDemo = () => {
  const message = useMessage();

  const simulateWorkflow = () => {
    // Simular un flujo de trabajo
    const loading = message.loading("Iniciando proceso...", { closable: true });
    
    setTimeout(() => {
      loading.close();
      message.info("Validando datos...");
    }, 1500);

    setTimeout(() => {
      message.warning("Algunos campos requieren atención", { duration: 4000 });
    }, 2500);

    setTimeout(() => {
      message.success("¡Proceso completado exitosamente!", { duration: 3000 });
    }, 4000);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Flujo Programático</h2>
      <p>Simula un flujo de trabajo con diferentes tipos de mensajes</p>
      <button className="duino-btn duino-btn--primary" onClick={simulateWorkflow}>
        Simular Flujo de Trabajo
      </button>
    </div>
  );
};

export const ProgrammaticFlow: Story = {
  render: () => (
    <MessageProvider placement="top-right" maxCount={3}>
      <ProgrammaticDemo />
    </MessageProvider>
  ),
};

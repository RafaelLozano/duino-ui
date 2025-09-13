import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    children: { control: "text" },
    okText: { control: "text" },
    cancelText: { control: "text" },
    maskClosable: { control: "boolean" },
    centered: { control: "boolean" },
    width: { control: "number" },
    destroyOnClose: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Template para manejar el estado del modal
const ModalTemplate = (args: any) => {
  const [open, setOpen] = useState(args.open || false);

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h2>Modal - Duino UI</h2>
      <p>Haz clic en el botón para abrir el modal</p>
      
      <button
        type="button"
        className="duino-btn duino-btn--primary"
        onClick={() => setOpen(true)}
      >
        Abrir Modal
      </button>
      
      <Modal
        {...args}
        open={open}
        onOk={() => {
          args.onOk?.();
          setOpen(false);
        }}
        onCancel={() => {
          args.onCancel?.();
          setOpen(false);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal Básico",
    children: "Este es el contenido del modal básico. Puedes agregar cualquier contenido aquí.",
    okText: "Aceptar",
    cancelText: "Cancelar",
  },
};

export const WithoutFooter: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal Sin Footer",
    children: "Este modal no tiene botones en el footer. Solo se puede cerrar con la X o presionando Escape.",
    footer: null,
  },
};

export const CustomFooter: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal con Footer Personalizado",
    children: "Este modal tiene un footer personalizado con botones específicos.",
    footer: (
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button className="duino-btn duino-btn--ghost">Guardar Borrador</button>
        <button className="duino-btn duino-btn--secondary">Vista Previa</button>
        <button className="duino-btn duino-btn--primary">Publicar</button>
      </div>
    ),
  },
};

export const NotCentered: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal No Centrado",
    children: "Este modal aparece en la parte superior de la pantalla en lugar de estar centrado verticalmente.",
    centered: false,
    okText: "Entendido",
    cancelText: "Cerrar",
  },
};

export const CustomWidth: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal Ancho Personalizado",
    children: "Este modal tiene un ancho personalizado de 800px, ideal para contenido que requiere más espacio horizontal.",
    width: 800,
    okText: "Perfecto",
    cancelText: "Volver",
  },
};

export const SmallWidth: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal Compacto",
    children: "Modal pequeño de 300px de ancho.",
    width: 300,
    okText: "OK",
    cancelText: "No",
  },
};

export const NotMaskClosable: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal No Cerrable por Máscara",
    children: "Este modal no se puede cerrar haciendo clic fuera de él. Solo se puede cerrar usando los botones o la tecla Escape.",
    maskClosable: false,
    okText: "Confirmar",
    cancelText: "Cancelar",
  },
};

export const DestroyOnClose: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal que se Destruye",
    children: "Este modal se destruye completamente cuando se cierra, liberando todos los recursos.",
    destroyOnClose: true,
    okText: "Aceptar",
    cancelText: "Cancelar",
  },
};

export const LongContent: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal con Contenido Largo",
    children: (
      <div>
        <p><strong>Este modal contiene mucho contenido para probar el scroll interno.</strong></p>
        <p>El modal maneja automáticamente el overflow del contenido cuando excede la altura disponible.</p>
        
        <h3>Características del Modal</h3>
        <ul>
          <li>Scroll interno automático</li>
          <li>Enfoque y navegación por teclado</li>
          <li>Trap de foco para accesibilidad</li>
          <li>Soporte para Escape key</li>
          <li>Bloqueo del scroll del body</li>
        </ul>
        
        {Array.from({ length: 15 }, (_, i) => (
          <p key={i}>
            <strong>Párrafo {i + 1}:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        ))}
        
        <p><em>Final del contenido. El modal debería tener scroll si es necesario.</em></p>
      </div>
    ),
    okText: "Entendido",
    cancelText: "Cerrar",
  },
};

export const WithForm: Story = {
  render: ModalTemplate,
  args: {
    title: "Formulario de Contacto",
    children: (
      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label htmlFor="name" style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
              Nombre completo *
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="Ingresa tu nombre"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
          </div>
          
          <div>
            <label htmlFor="email" style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="tu@email.com"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
          </div>
          
          <div>
            <label htmlFor="subject" style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
              Asunto
            </label>
            <select
              id="subject"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            >
              <option value="">Selecciona un asunto</option>
              <option value="support">Soporte técnico</option>
              <option value="sales">Consulta de ventas</option>
              <option value="feedback">Feedback</option>
              <option value="other">Otro</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
              Mensaje *
            </label>
            <textarea
              id="message"
              rows={4}
              required
              placeholder="Escribe tu mensaje aquí..."
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                resize: "vertical",
              }}
            />
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" id="newsletter" />
            <label htmlFor="newsletter" style={{ fontSize: "14px" }}>
              Suscribirme al newsletter
            </label>
          </div>
        </div>
      </form>
    ),
    okText: "Enviar Mensaje",
    cancelText: "Cancelar",
    width: 500,
  },
};

export const ConfirmationDialog: Story = {
  render: ModalTemplate,
  args: {
    title: "⚠️ Confirmar Eliminación",
    children: (
      <div>
        <p>¿Estás seguro de que quieres eliminar este elemento?</p>
        <div style={{ 
          background: "#fef2f2", 
          border: "1px solid #fecaca", 
          borderRadius: "6px", 
          padding: "12px", 
          marginTop: "12px" 
        }}>
          <p style={{ margin: 0, fontSize: "14px", color: "#dc2626" }}>
            <strong>⚠️ Advertencia:</strong> Esta acción no se puede deshacer. 
            Todos los datos asociados se perderán permanentemente.
          </p>
        </div>
      </div>
    ),
    okText: "Sí, Eliminar",
    cancelText: "Cancelar",
    width: 450,
    maskClosable: false,
  },
};

export const SuccessDialog: Story = {
  render: ModalTemplate,
  args: {
    title: "✅ ¡Éxito!",
    children: (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
        <h3 style={{ margin: "0 0 8px 0", color: "#059669" }}>
          ¡Operación Completada!
        </h3>
        <p style={{ margin: "0 0 16px 0", color: "#6b7280" }}>
          Tu solicitud ha sido procesada exitosamente.
        </p>
        <div style={{ 
          background: "#f0fdf4", 
          border: "1px solid #bbf7d0", 
          borderRadius: "6px", 
          padding: "12px" 
        }}>
          <p style={{ margin: 0, fontSize: "14px", color: "#059669" }}>
            Recibirás un email de confirmación en los próximos minutos.
          </p>
        </div>
      </div>
    ),
    okText: "Perfecto",
    cancelText: null,
    footer: (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="duino-btn duino-btn--primary">
          Entendido
        </button>
      </div>
    ),
    width: 400,
  },
};

export const LoadingDialog: Story = {
  render: ModalTemplate,
  args: {
    title: "Procesando...",
    children: (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ 
          width: "40px", 
          height: "40px", 
          border: "4px solid #f3f4f6", 
          borderTop: "4px solid #3b82f6", 
          borderRadius: "50%", 
          animation: "spin 1s linear infinite",
          margin: "0 auto 16px"
        }} />
        <p style={{ margin: 0, fontSize: "16px", fontWeight: "500" }}>
          Procesando tu solicitud...
        </p>
        <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "#6b7280" }}>
          Por favor espera, esto puede tomar unos momentos.
        </p>
      </div>
    ),
    footer: null,
    maskClosable: false,
    width: 350,
  },
};

// Agregar CSS para la animación de loading
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export const InteractiveDemo: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState<'basic' | 'form' | 'confirm' | 'success'>('basic');
    
    const modalConfigs = {
      basic: {
        title: "Modal Básico",
        children: "Este es un modal básico con contenido simple.",
        width: 520,
      },
      form: {
        title: "Formulario",
        children: (
          <div>
            <input placeholder="Nombre" style={{ width: "100%", padding: "8px", marginBottom: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
            <input placeholder="Email" style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
          </div>
        ),
        width: 400,
      },
      confirm: {
        title: "Confirmar Acción",
        children: "¿Estás seguro de que quieres continuar?",
        width: 350,
        maskClosable: false,
      },
      success: {
        title: "¡Éxito!",
        children: "La operación se completó correctamente.",
        width: 300,
        okText: "Genial",
        cancelText: null,
      },
    };
    
    return (
      <div style={{ padding: "20px", fontFamily: "system-ui" }}>
        <h2>Demo Interactivo del Modal</h2>
        <p>Selecciona el tipo de modal que quieres probar:</p>
        
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
          <button
            className={`duino-btn ${modalType === 'basic' ? 'duino-btn--primary' : 'duino-btn--ghost'}`}
            onClick={() => setModalType('basic')}
          >
            Básico
          </button>
          <button
            className={`duino-btn ${modalType === 'form' ? 'duino-btn--primary' : 'duino-btn--ghost'}`}
            onClick={() => setModalType('form')}
          >
            Formulario
          </button>
          <button
            className={`duino-btn ${modalType === 'confirm' ? 'duino-btn--primary' : 'duino-btn--ghost'}`}
            onClick={() => setModalType('confirm')}
          >
            Confirmación
          </button>
          <button
            className={`duino-btn ${modalType === 'success' ? 'duino-btn--primary' : 'duino-btn--ghost'}`}
            onClick={() => setModalType('success')}
          >
            Éxito
          </button>
        </div>
        
        <button
          className="duino-btn duino-btn--primary"
          onClick={() => setOpen(true)}
        >
          Abrir Modal {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
        </button>
        
        <Modal
          {...modalConfigs[modalType]}
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </div>
    );
  },
};

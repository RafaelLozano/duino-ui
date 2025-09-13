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
    <>
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
    </>
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
    children: "Este modal no tiene botones en el footer.",
    footer: null,
  },
};

export const CustomFooter: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal con Footer Personalizado",
    children: "Este modal tiene un footer personalizado.",
    footer: (
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button className="duino-btn duino-btn--ghost">Guardar Borrador</button>
        <button className="duino-btn duino-btn--primary">Publicar</button>
      </div>
    ),
  },
};

export const NotCentered: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal No Centrado",
    children: "Este modal aparece en la parte superior de la pantalla.",
    centered: false,
  },
};

export const CustomWidth: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal Ancho",
    children: "Este modal tiene un ancho personalizado de 800px.",
    width: 800,
  },
};

export const NotMaskClosable: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal No Cerrable por Máscara",
    children: "Este modal no se puede cerrar haciendo clic fuera de él.",
    maskClosable: false,
  },
};

export const DestroyOnClose: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal que se Destruye",
    children: "Este modal se destruye completamente cuando se cierra.",
    destroyOnClose: true,
  },
};

export const LongContent: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal con Contenido Largo",
    children: (
      <div>
        <p>Este modal contiene mucho contenido para probar el scroll interno.</p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            Párrafo {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        ))}
      </div>
    ),
  },
};

export const WithForm: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal con Formulario",
    children: (
      <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label htmlFor="name" style={{ display: "block", marginBottom: "4px" }}>
            Nombre:
          </label>
          <input
            id="name"
            type="text"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div>
          <label htmlFor="email" style={{ display: "block", marginBottom: "4px" }}>
            Email:
          </label>
          <input
            id="email"
            type="email"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div>
          <label htmlFor="message" style={{ display: "block", marginBottom: "4px" }}>
            Mensaje:
          </label>
          <textarea
            id="message"
            rows={4}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              resize: "vertical",
            }}
          />
        </div>
      </form>
    ),
    okText: "Enviar",
    cancelText: "Cancelar",
  },
};

export const ConfirmationDialog: Story = {
  render: ModalTemplate,
  args: {
    title: "Confirmar Acción",
    children: "¿Estás seguro de que quieres eliminar este elemento? Esta acción no se puede deshacer.",
    okText: "Eliminar",
    cancelText: "Cancelar",
    width: 400,
  },
};

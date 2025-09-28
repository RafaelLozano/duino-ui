import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Select,
  Table,
  Upload,
  Collapse,
  Popover,
  Spin,
  MessageProvider,
  useMessage,
  ThemeProvider,
  ThemeSwitcher
} from '@ralorotech/duino-ui';

// ¡No necesitas importar CSS! Los estilos se incluyen automáticamente 🎉

// Ejemplo completo de uso de Duino UI
function CompleteExample() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [uploadFiles, setUploadFiles] = useState([]);
  const message = useMessage();

  const tableData = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', status: 'Activo' },
    { id: 2, name: 'María García', email: 'maria@example.com', status: 'Inactivo' },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', status: 'Activo' },
  ];

  const tableColumns = [
    { key: 'name', title: 'Nombre', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { key: 'status', title: 'Estado', sortable: true },
  ];

  const selectOptions = [
    { label: 'Opción 1', value: '1' },
    { label: 'Opción 2', value: '2' },
    { label: 'Opción 3', value: '3' },
  ];

  const collapseItems = [
    {
      key: '1',
      label: '¿Qué es Duino UI?',
      children: 'Duino UI es un sistema de diseño minimalista inspirado en Arduino, construido con React y TypeScript.'
    },
    {
      key: '2',
      label: '¿Cómo personalizar los temas?',
      children: 'Puedes usar el ThemeSwitcher o personalizar los tokens CSS directamente.'
    },
    {
      key: '3',
      label: '¿Es compatible con Next.js?',
      children: 'Sí, Duino UI es completamente compatible con Next.js y otros frameworks de React.'
    }
  ];

  const handleUpload = (files: any[]) => {
    setUploadFiles(files);
    message.success(`Se subieron ${files.length} archivos correctamente`);
  };

  const showMessage = () => {
    message.info('¡Este es un mensaje de ejemplo!');
  };

  return (
    <ThemeProvider preset="blue">
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Ejemplo Completo - Duino UI</h1>
          <ThemeSwitcher />
        </div>

        {/* Botones */}
        <section style={{ marginBottom: '2rem' }}>
          <h2>Botones</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* Inputs */}
        <section style={{ marginBottom: '2rem' }}>
          <h2>Campos de Entrada</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <Input placeholder="Nombre completo" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Contraseña" type="password" />
            <Select
              options={selectOptions}
              placeholder="Selecciona una opción"
              value={selectedValue}
              onChange={setSelectedValue}
            />
          </div>
        </section>

        {/* Tabla */}
        <section style={{ marginBottom: '2rem' }}>
          <h2>Tabla de Datos</h2>
          <Table
            data={tableData}
            columns={tableColumns}
            size="medium"
            variant="bordered"
          />
        </section>

        {/* Upload */}
        <section style={{ marginBottom: '2rem' }}>
          <h2>Subida de Archivos</h2>
          <Upload
            onUpload={handleUpload}
            accept="image/*"
            multiple
            listType="picture-card"
          />
        </section>

        {/* Collapse */}
        <section style={{ marginBottom: '2rem' }}>
          <h2>Preguntas Frecuentes</h2>
          <Collapse items={collapseItems} />
        </section>

        {/* Popover */}
        <section style={{ marginBottom: '2rem' }}>
          <h2>Popover</h2>
          <Popover
            content="Este es el contenido del popover"
            title="Título del Popover"
            trigger="hover"
          >
            <Button>Hover para ver popover</Button>
          </Popover>
        </section>

        {/* Modal */}
        <section style={{ marginBottom: '2rem' }}>
          <h2>Modal</h2>
          <Button onClick={() => setModalOpen(true)}>
            Abrir Modal
          </Button>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Ejemplo de Modal"
          >
            <p>Este es el contenido del modal. Puedes incluir cualquier contenido aquí.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <Button onClick={() => setModalOpen(false)}>Cerrar</Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>
                Confirmar
              </Button>
            </div>
          </Modal>
        </section>

        {/* Spin */}
        <section style={{ marginBottom: '2rem' }}>
          <h2>Indicadores de Carga</h2>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Spin size="small" />
            <Spin size="medium" />
            <Spin size="large" />
            <Spin type="dots" />
          </div>
        </section>

        {/* Mensajes */}
        <section style={{ marginBottom: '2rem' }}>
          <h2>Sistema de Mensajes</h2>
          <Button onClick={showMessage}>
            Mostrar Mensaje
          </Button>
        </section>
      </div>
    </ThemeProvider>
  );
}

// Wrapper con MessageProvider
export default function App() {
  return (
    <MessageProvider>
      <CompleteExample />
    </MessageProvider>
  );
}

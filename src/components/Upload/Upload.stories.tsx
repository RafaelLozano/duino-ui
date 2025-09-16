import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Upload } from "./Upload";
import { Button } from "../Button/Button";
import type { UploadFile } from "./Upload";

const meta: Meta<typeof Upload> = {
  title: "components/Upload",
  component: Upload,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Componente Upload del sistema de diseño Arduino para subir archivos.

**Características:**
- 3 tipos de upload (select, drag, avatar)
- 3 tipos de lista (text, picture, picture-card)
- Drag & drop integrado
- Preview de imágenes
- Progress tracking
- Validación de archivos
- Multiple file support
- Responsive y accesible
- Metodología BEM para CSS
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["select", "drag", "avatar"],
      description: "Tipo de upload",
    },
    listType: {
      control: "select",
      options: ["text", "picture", "picture-card"],
      description: "Tipo de lista de archivos",
    },
    multiple: {
      control: "boolean",
      description: "Permitir múltiples archivos",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilitar upload",
    },
    maxCount: {
      control: "number",
      description: "Máximo número de archivos",
    },
    accept: {
      control: "text",
      description: "Tipos de archivo aceptados",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Upload>;

export const Default: Story = {
  args: {
    multiple: true,
  },
};

export const DragAndDrop: Story = {
  args: {
    type: "drag",
    multiple: true,
    accept: ".ino,.cpp,.h,.txt",
  },
};

export const Avatar: Story = {
  args: {
    type: "avatar",
    accept: "image/*",
  },
};

export const PictureList: Story = {
  args: {
    type: "drag",
    listType: "picture",
    multiple: true,
    accept: "image/*",
  },
};

export const PictureCard: Story = {
  args: {
    type: "select",
    listType: "picture-card",
    multiple: true,
    accept: "image/*",
    maxCount: 6,
  },
};

// Ejemplo completo con validaciones
export const CompleteExample: Story = {
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
      setFileList(newFileList);
    };

    const handlePreview = (file: UploadFile) => {
      console.log('Preview file:', file);
      // Aquí podrías abrir un modal personalizado
    };

    const handleRemove = (file: UploadFile) => {
      console.log('Remove file:', file);
      return true;
    };

    const beforeUpload = (file: File) => {
      const isValidType = file.type.startsWith('image/') || 
                         file.name.endsWith('.ino') || 
                         file.name.endsWith('.cpp') ||
                         file.name.endsWith('.h');
      
      if (!isValidType) {
        alert('Solo se permiten imágenes y archivos de código Arduino (.ino, .cpp, .h)');
        return false;
      }

      const isValidSize = file.size < 5 * 1024 * 1024; // 5MB
      if (!isValidSize) {
        alert('El archivo debe ser menor a 5MB');
        return false;
      }

      return true;
    };

    const uploadAll = () => {
      setUploading(true);
      // Simular upload masivo
      setTimeout(() => {
        setUploading(false);
        alert('¡Todos los archivos subidos exitosamente!');
      }, 2000);
    };

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ 
          marginBottom: '20px',
          padding: '16px',
          backgroundColor: 'var(--duino-brand-50)',
          borderRadius: 'var(--duino-radius)',
          border: '1px solid var(--duino-brand-200)'
        }}>
          <h3 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '18px', 
            fontWeight: '600',
            color: 'var(--duino-brand-700)'
          }}>
            Subir Archivos de Proyecto
          </h3>
          <p style={{ 
            margin: '0 0 12px 0', 
            fontSize: '14px',
            color: 'var(--duino-color-muted)'
          }}>
            Arrastra archivos aquí o haz click para seleccionar. 
            Soporta imágenes y archivos de código Arduino (.ino, .cpp, .h)
          </p>
          <div style={{ 
            fontSize: '12px',
            color: 'var(--duino-brand-600)'
          }}>
            📁 Archivos: {fileList.length} | 📏 Máximo: 5MB por archivo
          </div>
        </div>

        <Upload
          type="drag"
          listType="picture"
          multiple
          fileList={fileList}
          onChange={handleChange}
          onPreview={handlePreview}
          onRemove={handleRemove}
          beforeUpload={beforeUpload}
          maxCount={10}
          accept="image/*,.ino,.cpp,.h"
          disabled={uploading}
        />

        {fileList.length > 0 && (
          <div style={{ 
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px',
            backgroundColor: 'var(--duino-color-bg)',
            border: '1px solid var(--duino-border)',
            borderRadius: 'var(--duino-radius)'
          }}>
            <div style={{ fontSize: '14px' }}>
              <strong>{fileList.filter(f => f.status === 'done').length}</strong> de{' '}
              <strong>{fileList.length}</strong> archivos completados
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setFileList([])}
                disabled={uploading}
              >
                Limpiar Todo
              </Button>
              <Button 
                size="sm"
                onClick={uploadAll}
                loading={uploading}
                disabled={fileList.length === 0}
              >
                Subir Todo
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  },
};

// Diferentes casos de uso
export const UseCases: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '32px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {/* Avatar upload */}
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Subir Avatar de Usuario
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Upload
            type="avatar"
            accept="image/*"
            maxCount={1}
          />
          <div>
            <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '500' }}>
              Foto de perfil
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--duino-color-muted)' }}>
              JPG, PNG o GIF. Máximo 2MB.
            </p>
          </div>
        </div>
      </div>

      {/* Code files */}
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Subir Sketch de Arduino
        </h3>
        <Upload
          type="drag"
          accept=".ino,.cpp,.h"
          multiple
          listType="text"
        >
          <div style={{ 
            padding: '20px',
            textAlign: 'center',
            border: '2px dashed var(--duino-brand-300)',
            borderRadius: 'var(--duino-radius)',
            backgroundColor: 'var(--duino-brand-50)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📝</div>
            <p style={{ margin: '0 0 4px 0', fontWeight: '500' }}>
              Arrastra tus archivos .ino aquí
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--duino-color-muted)' }}>
              O haz click para seleccionar archivos
            </p>
          </div>
        </Upload>
      </div>

      {/* Image gallery */}
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Galería de Imágenes del Proyecto
        </h3>
        <Upload
          type="select"
          listType="picture-card"
          multiple
          accept="image/*"
          maxCount={8}
        >
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '20px',
            border: '1px dashed var(--duino-border)',
            borderRadius: 'var(--duino-radius)',
            backgroundColor: 'var(--duino-color-bg)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17,8 12,3 7,8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <div style={{ fontSize: '12px', fontWeight: '500' }}>Subir</div>
          </div>
        </Upload>
      </div>
    </div>
  ),
};

// Demo interactivo
export const InteractiveDemo: Story = {
  render: () => {
    const [config, setConfig] = useState({
      type: 'drag' as const,
      listType: 'picture' as const,
      multiple: true,
      maxCount: 5,
    });
    const [fileList, setFileList] = useState<UploadFile[]>([]);

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
          border: '1px solid var(--duino-brand-200)'
        }}>
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '18px', 
            fontWeight: '600',
            color: 'var(--duino-brand-700)'
          }}>
            Configuración del Upload
          </h3>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '12px'
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
                <option value="select">Select</option>
                <option value="drag">Drag & Drop</option>
                <option value="avatar">Avatar</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>
                Lista:
              </label>
              <select
                value={config.listType}
                onChange={(e) => setConfig(prev => ({ ...prev, listType: e.target.value as any }))}
                style={{
                  width: '100%',
                  padding: '4px 6px',
                  border: '1px solid var(--duino-border)',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
              >
                <option value="text">Text</option>
                <option value="picture">Picture</option>
                <option value="picture-card">Picture Card</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>
                Máximo:
              </label>
              <input
                type="number"
                value={config.maxCount}
                onChange={(e) => setConfig(prev => ({ ...prev, maxCount: Number(e.target.value) }))}
                min="1"
                max="20"
                style={{
                  width: '100%',
                  padding: '4px 6px',
                  border: '1px solid var(--duino-border)',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="multiple"
                checked={config.multiple}
                onChange={(e) => setConfig(prev => ({ ...prev, multiple: e.target.checked }))}
              />
              <label htmlFor="multiple" style={{ fontSize: '13px', fontWeight: '500' }}>
                Múltiple
              </label>
            </div>
          </div>

          <div style={{ 
            marginTop: '12px',
            fontSize: '12px',
            color: 'var(--duino-color-muted)'
          }}>
            Archivos actuales: {fileList.length} / {config.maxCount}
          </div>
        </div>

        <Upload
          type={config.type}
          listType={config.listType}
          multiple={config.multiple}
          maxCount={config.maxCount}
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          accept="image/*,.ino,.cpp,.h,.txt"
          beforeUpload={(file) => {
            console.log('Before upload:', file.name);
            return true;
          }}
        />

        {fileList.length > 0 && (
          <div style={{ 
            padding: '12px',
            backgroundColor: 'var(--duino-color-bg)',
            border: '1px solid var(--duino-border)',
            borderRadius: 'var(--duino-radius)',
            fontSize: '13px'
          }}>
            <strong>Estado:</strong><br />
            ✅ Completados: {fileList.filter(f => f.status === 'done').length}<br />
            🔄 Subiendo: {fileList.filter(f => f.status === 'uploading').length}<br />
            ❌ Errores: {fileList.filter(f => f.status === 'error').length}
          </div>
        )}
      </div>
    );
  },
};

// Casos de uso específicos
export const ArduinoUseCases: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '32px',
      maxWidth: '700px',
      margin: '0 auto'
    }}>
      {/* Subir sketch */}
      <div>
        <h3 style={{ 
          marginBottom: '12px', 
          fontSize: '16px', 
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '20px' }}>📝</span>
          Subir Sketch de Arduino
        </h3>
        <Upload
          type="drag"
          accept=".ino,.cpp,.h"
          multiple
          listType="text"
        >
          <div style={{ 
            padding: '30px',
            textAlign: 'center',
            border: '2px dashed var(--duino-brand-300)',
            borderRadius: 'var(--duino-radius)',
            backgroundColor: 'var(--duino-brand-50)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
              Arrastra tu código Arduino
            </h4>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--duino-color-muted)' }}>
              Archivos .ino, .cpp, .h
            </p>
            <Button size="sm" variant="ghost">
              O selecciona archivos
            </Button>
          </div>
        </Upload>
      </div>

      {/* Subir documentación */}
      <div>
        <h3 style={{ 
          marginBottom: '12px', 
          fontSize: '16px', 
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '20px' }}>📸</span>
          Documentación del Proyecto
        </h3>
        <Upload
          type="select"
          listType="picture-card"
          multiple
          accept="image/*"
          maxCount={6}
        >
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '20px',
            border: '1px dashed var(--duino-border)',
            borderRadius: 'var(--duino-radius)',
            backgroundColor: 'var(--duino-color-bg)',
            cursor: 'pointer',
            minHeight: '120px'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>Subir Imágenes</div>
            <div style={{ fontSize: '12px', color: 'var(--duino-color-muted)' }}>
              Fotos del circuito, esquemas, resultados
            </div>
          </div>
        </Upload>
      </div>

      {/* Subir librería */}
      <div>
        <h3 style={{ 
          marginBottom: '12px', 
          fontSize: '16px', 
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '20px' }}>📦</span>
          Subir Librería Personalizada
        </h3>
        <Upload
          type="select"
          accept=".zip,.tar.gz"
          maxCount={1}
        >
          <Button variant="secondary" icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          }>
            Seleccionar Archivo ZIP
          </Button>
        </Upload>
        <p style={{ 
          margin: '8px 0 0 0', 
          fontSize: '12px', 
          color: 'var(--duino-color-muted)' 
        }}>
          Soporta archivos .zip o .tar.gz con tu librería personalizada
        </p>
      </div>
    </div>
  ),
};

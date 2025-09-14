import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "./Select";
import type { SelectOption } from "./Select";

// Iconos de ejemplo
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const TeamIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-3.5L19 12l1.5 1.5M4.5 16.5L3 12l-1.5-1.5" />
  </svg>
);

const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16,18 22,12 16,6" />
    <polyline points="8,6 2,12 8,18" />
  </svg>
);

const DatabaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

// Datos de ejemplo
const basicOptions: SelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
];

const optionsWithIcons: SelectOption[] = [
  { value: 'frontend', label: 'Frontend Developer', icon: <CodeIcon />, description: 'HTML, CSS, JavaScript, React' },
  { value: 'backend', label: 'Backend Developer', icon: <DatabaseIcon />, description: 'Node.js, Python, APIs, Databases' },
  { value: 'fullstack', label: 'Full Stack Developer', icon: <SettingsIcon />, description: 'Frontend + Backend' },
  { value: 'designer', label: 'UI/UX Designer', icon: <UserIcon />, description: 'Design, Prototyping, User Experience' },
  { value: 'manager', label: 'Project Manager', icon: <TeamIcon />, description: 'Team coordination, Planning' },
];

const groupedOptions: SelectOption[] = [
  // Frontend
  { value: 'react', label: 'React', group: 'Frontend', icon: <CodeIcon /> },
  { value: 'vue', label: 'Vue.js', group: 'Frontend', icon: <CodeIcon /> },
  { value: 'angular', label: 'Angular', group: 'Frontend', icon: <CodeIcon /> },
  { value: 'svelte', label: 'Svelte', group: 'Frontend', icon: <CodeIcon /> },
  
  // Backend
  { value: 'nodejs', label: 'Node.js', group: 'Backend', icon: <DatabaseIcon /> },
  { value: 'python', label: 'Python', group: 'Backend', icon: <DatabaseIcon /> },
  { value: 'java', label: 'Java', group: 'Backend', icon: <DatabaseIcon /> },
  { value: 'php', label: 'PHP', group: 'Backend', icon: <DatabaseIcon /> },
  
  // Mobile
  { value: 'reactnative', label: 'React Native', group: 'Mobile', icon: <SettingsIcon /> },
  { value: 'flutter', label: 'Flutter', group: 'Mobile', icon: <SettingsIcon /> },
  { value: 'ionic', label: 'Ionic', group: 'Mobile', icon: <SettingsIcon /> },
  
  // DevOps
  { value: 'docker', label: 'Docker', group: 'DevOps', icon: <TeamIcon /> },
  { value: 'kubernetes', label: 'Kubernetes', group: 'DevOps', icon: <TeamIcon /> },
  { value: 'aws', label: 'AWS', group: 'DevOps', icon: <TeamIcon /> },
];

const countriesOptions: SelectOption[] = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' },
  { value: 'co', label: 'Colombia' },
  { value: 'pe', label: 'Perú' },
  { value: 'cl', label: 'Chile' },
  { value: 'ec', label: 'Ecuador' },
  { value: 've', label: 'Venezuela' },
  { value: 'uy', label: 'Uruguay' },
  { value: 'py', label: 'Paraguay' },
  { value: 'bo', label: 'Bolivia' },
  { value: 'cr', label: 'Costa Rica' },
  { value: 'pa', label: 'Panamá' },
  { value: 'gt', label: 'Guatemala' },
  { value: 'hn', label: 'Honduras' },
  { value: 'ni', label: 'Nicaragua' },
  { value: 'sv', label: 'El Salvador' },
  { value: 'do', label: 'República Dominicana' },
  { value: 'cu', label: 'Cuba' },
  { value: 'pr', label: 'Puerto Rico' },
];

const meta: Meta<typeof Select> = {
  title: "components/Select",
  component: Select,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Componente Select del sistema de diseño Arduino con funcionalidades avanzadas.

**Características:**
- Búsqueda integrada
- Selección múltiple
- Opciones agrupadas
- Estados de loading y error
- 3 variantes de diseño
- 3 tamaños disponibles
- Iconos y descripciones
- Responsive y accesible
- Metodología BEM para CSS
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del select",
    },
    variant: {
      control: "select",
      options: ["default", "filled", "borderless"],
      description: "Variante visual del select",
    },
    multiple: {
      control: "boolean",
      description: "Permitir selección múltiple",
    },
    searchable: {
      control: "boolean",
      description: "Habilitar búsqueda",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilitar el select",
    },
    loading: {
      control: "boolean",
      description: "Mostrar estado de carga",
    },
    clearable: {
      control: "boolean",
      description: "Mostrar botón de limpiar",
    },
    error: {
      control: "boolean",
      description: "Estado de error",
    },
    success: {
      control: "boolean",
      description: "Estado de éxito",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: "Selecciona un framework...",
  },
};

export const WithIcons: Story = {
  args: {
    options: optionsWithIcons,
    placeholder: "Selecciona tu rol...",
  },
};

export const Searchable: Story = {
  args: {
    options: countriesOptions,
    searchable: true,
    placeholder: "Buscar país...",
    searchPlaceholder: "Escribe para buscar...",
  },
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<(string | number)[]>(['react', 'nodejs']);

    return (
      <div style={{ width: '300px' }}>
        <Select
          options={groupedOptions}
          value={value}
          onChange={(newValue) => setValue(newValue as (string | number)[])}
          multiple
          searchable
          placeholder="Selecciona tecnologías..."
          maxTagCount={2}
        />
        <div style={{ marginTop: '12px', fontSize: '14px', color: 'var(--duino-color-muted)' }}>
          Seleccionados: {value.length} tecnologías
        </div>
      </div>
    );
  },
};

export const Grouped: Story = {
  args: {
    options: groupedOptions,
    placeholder: "Selecciona una tecnología...",
    searchable: true,
  },
};

export const WithClear: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>('react');

    return (
      <Select
        options={basicOptions}
        value={value}
        onChange={(newValue) => setValue(newValue as string | number)}
        clearable
        placeholder="Selecciona un framework..."
      />
    );
  },
};

export const Small: Story = {
  args: {
    options: basicOptions,
    size: "sm",
    placeholder: "Tamaño pequeño...",
  },
};

export const Large: Story = {
  args: {
    options: optionsWithIcons,
    size: "lg",
    placeholder: "Tamaño grande...",
  },
};

export const Filled: Story = {
  args: {
    options: basicOptions,
    variant: "filled",
    placeholder: "Variante filled...",
  },
};

export const Borderless: Story = {
  args: {
    options: basicOptions,
    variant: "borderless",
    placeholder: "Sin bordes...",
  },
};

export const Loading: Story = {
  args: {
    options: [],
    loading: true,
    placeholder: "Cargando opciones...",
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    disabled: true,
    defaultValue: "react",
  },
};

export const Error: Story = {
  args: {
    options: basicOptions,
    error: true,
    placeholder: "Estado de error...",
  },
};

export const Success: Story = {
  args: {
    options: basicOptions,
    success: true,
    defaultValue: "react",
  },
};

export const Empty: Story = {
  args: {
    options: [],
    searchable: true,
    placeholder: "Sin opciones...",
    notFoundContent: (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</div>
        <div style={{ fontWeight: '500', marginBottom: '4px' }}>No hay opciones</div>
        <div style={{ fontSize: '14px', color: 'var(--duino-color-muted)' }}>
          Intenta con otros términos de búsqueda
        </div>
      </div>
    ),
  },
};

// Ejemplo complejo con todas las funcionalidades
export const CompleteExample: Story = {
  render: () => {
    const [selectedTechs, setSelectedTechs] = useState<(string | number)[]>(['react', 'nodejs']);
    const [selectedCountry, setSelectedCountry] = useState<string | number>('es');
    const [selectedRole, setSelectedRole] = useState<string | number>('');

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px',
        maxWidth: '600px',
        fontFamily: 'var(--duino-font)'
      }}>
        <div style={{ 
          padding: '20px',
          backgroundColor: 'var(--duino-brand-50)',
          borderRadius: 'var(--duino-radius)',
          border: '1px solid var(--duino-brand-200)'
        }}>
          <h2 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '20px', 
            fontWeight: '600',
            color: 'var(--duino-brand-700)'
          }}>
            Formulario de Desarrollador
          </h2>
          <p style={{ 
            margin: '0 0 20px 0', 
            color: 'var(--duino-color-muted)',
            fontSize: '14px'
          }}>
            Completa tu perfil profesional
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '6px', 
                fontWeight: '500',
                fontSize: '14px'
              }}>
                Rol Profesional *
              </label>
              <Select
                options={optionsWithIcons}
                value={selectedRole}
                onChange={(value) => setSelectedRole(value as string | number)}
                placeholder="¿Cuál es tu rol principal?"
                size="lg"
                clearable
                error={!selectedRole}
              />
              {!selectedRole && (
                <div style={{ 
                  marginTop: '4px', 
                  fontSize: '12px', 
                  color: 'var(--duino-danger-500)' 
                }}>
                  Este campo es requerido
                </div>
              )}
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '6px', 
                fontWeight: '500',
                fontSize: '14px'
              }}>
                Tecnologías ({selectedTechs.length} seleccionadas)
              </label>
              <Select
                options={groupedOptions}
                value={selectedTechs}
                onChange={(value) => setSelectedTechs(value as (string | number)[])}
                multiple
                searchable
                placeholder="Selecciona tus tecnologías..."
                searchPlaceholder="Buscar tecnología..."
                maxTagCount={3}
                maxTagPlaceholder={(omitted) => `+${omitted.length} más`}
                success={selectedTechs.length > 0}
              />
              <div style={{ 
                marginTop: '4px', 
                fontSize: '12px', 
                color: 'var(--duino-color-muted)' 
              }}>
                Selecciona las tecnologías que dominas
              </div>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '6px', 
                fontWeight: '500',
                fontSize: '14px'
              }}>
                País
              </label>
              <Select
                options={countriesOptions}
                value={selectedCountry}
                onChange={(value) => setSelectedCountry(value as string | number)}
                searchable
                placeholder="Selecciona tu país..."
                searchPlaceholder="Buscar país..."
                variant="filled"
              />
            </div>
          </div>

          <div style={{ 
            marginTop: '20px', 
            padding: '12px',
            backgroundColor: 'var(--duino-color-bg)',
            borderRadius: 'calc(var(--duino-radius) / 2)',
            fontSize: '13px'
          }}>
            <strong>Resumen:</strong><br />
            Rol: {selectedRole ? optionsWithIcons.find(opt => opt.value === selectedRole)?.label : 'No seleccionado'}<br />
            Tecnologías: {selectedTechs.length} seleccionadas<br />
            País: {countriesOptions.find(opt => opt.value === selectedCountry)?.label}
          </div>
        </div>
      </div>
    );
  },
};

// Showcase de todas las variantes
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Variantes de Diseño
        </h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ width: '200px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
              Default
            </label>
            <Select
              options={basicOptions.slice(0, 3)}
              placeholder="Default..."
              size="sm"
            />
          </div>
          <div style={{ width: '200px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
              Filled
            </label>
            <Select
              options={basicOptions.slice(0, 3)}
              variant="filled"
              placeholder="Filled..."
              size="sm"
            />
          </div>
          <div style={{ width: '200px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
              Borderless
            </label>
            <Select
              options={basicOptions.slice(0, 3)}
              variant="borderless"
              placeholder="Borderless..."
              size="sm"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Tamaños
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'end', flexWrap: 'wrap' }}>
          <div style={{ width: '150px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
              Small
            </label>
            <Select
              options={basicOptions.slice(0, 3)}
              size="sm"
              placeholder="Small..."
            />
          </div>
          <div style={{ width: '150px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
              Medium
            </label>
            <Select
              options={basicOptions.slice(0, 3)}
              size="md"
              placeholder="Medium..."
            />
          </div>
          <div style={{ width: '150px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
              Large
            </label>
            <Select
              options={basicOptions.slice(0, 3)}
              size="lg"
              placeholder="Large..."
            />
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Estados
        </h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ width: '150px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
              Loading
            </label>
            <Select
              options={[]}
              loading
              placeholder="Cargando..."
              size="sm"
            />
          </div>
          <div style={{ width: '150px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
              Error
            </label>
            <Select
              options={basicOptions.slice(0, 3)}
              error
              placeholder="Error..."
              size="sm"
            />
          </div>
          <div style={{ width: '150px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
              Success
            </label>
            <Select
              options={basicOptions.slice(0, 3)}
              success
              defaultValue="react"
              size="sm"
            />
          </div>
          <div style={{ width: '150px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
              Disabled
            </label>
            <Select
              options={basicOptions.slice(0, 3)}
              disabled
              defaultValue="vue"
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

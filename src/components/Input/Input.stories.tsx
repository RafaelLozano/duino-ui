import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input, TextArea, InputGroup, Search } from "./Input";
import { Button } from "../Button/Button";

// Iconos de ejemplo
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <circle cx="12" cy="16" r="1" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const DollarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: "components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Componente Input del sistema de diseño Arduino para entrada de datos.

**Características:**
- Múltiples tipos (text, password, email, number, etc.)
- 3 variantes de diseño (default, filled, borderless)
- 3 tamaños disponibles (sm, md, lg)
- Estados de validación (error, success, loading)
- Prefix y suffix personalizables
- Botón de limpiar integrado
- Contador de caracteres
- TextArea con auto-resize
- InputGroup para grupos
- Search con botón integrado
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
      description: "Tamaño del input",
    },
    variant: {
      control: "select",
      options: ["default", "filled", "borderless"],
      description: "Variante visual del input",
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url", "search"],
      description: "Tipo de input",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilitar input",
    },
    loading: {
      control: "boolean",
      description: "Mostrar estado de carga",
    },
    error: {
      control: "boolean",
      description: "Estado de error",
    },
    success: {
      control: "boolean",
      description: "Estado de éxito",
    },
    allowClear: {
      control: "boolean",
      description: "Mostrar botón de limpiar",
    },
    showCount: {
      control: "boolean",
      description: "Mostrar contador de caracteres",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Ingresa tu texto...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Nombre de usuario",
    placeholder: "Ingresa tu nombre",
    required: true,
  },
};

export const Password: Story = {
  args: {
    type: "password",
    label: "Contraseña",
    placeholder: "Ingresa tu contraseña",
    prefix: <LockIcon />,
  },
};

export const Email: Story = {
  args: {
    type: "email",
    label: "Correo electrónico",
    placeholder: "tu@email.com",
    prefix: <EmailIcon />,
  },
};

export const WithPrefixSuffix: Story = {
  args: {
    label: "Precio",
    placeholder: "0.00",
    type: "number",
    prefix: <DollarIcon />,
    suffix: "USD",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        size="sm"
        placeholder="Tamaño pequeño"
        label="Small"
      />
      <Input
        size="md"
        placeholder="Tamaño mediano"
        label="Medium"
      />
      <Input
        size="lg"
        placeholder="Tamaño grande"
        label="Large"
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        variant="default"
        placeholder="Variante por defecto"
        label="Default"
      />
      <Input
        variant="filled"
        placeholder="Variante rellena"
        label="Filled"
      />
      <Input
        variant="borderless"
        placeholder="Sin bordes"
        label="Borderless"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        placeholder="Estado normal"
        label="Normal"
      />
      <Input
        loading
        placeholder="Cargando..."
        label="Loading"
      />
      <Input
        error="Este campo es requerido"
        placeholder="Con error"
        label="Error"
      />
      <Input
        success
        defaultValue="arduino@ejemplo.com"
        label="Success"
        helperText="Email verificado correctamente"
      />
      <Input
        disabled
        defaultValue="Campo deshabilitado"
        label="Disabled"
      />
      <Input
        readOnly
        defaultValue="Campo de solo lectura"
        label="Read Only"
      />
    </div>
  ),
};

export const WithFeatures: Story = {
  render: () => {
    const [clearableValue, setClearableValue] = useState('Texto que se puede limpiar');
    const [countValue, setCountValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <Input
          value={clearableValue}
          onChange={(e) => setClearableValue(e.target.value)}
          allowClear
          onClear={() => setClearableValue('')}
          label="Con botón limpiar"
          placeholder="Escribe algo..."
        />
        
        <Input
          value={countValue}
          onChange={(e) => setCountValue(e.target.value)}
          showCount
          maxLength={50}
          label="Con contador de caracteres"
          placeholder="Máximo 50 caracteres"
          helperText="Describe tu proyecto Arduino en pocas palabras"
        />
      </div>
    );
  },
};

// TextArea stories
export const TextAreaBasic: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <TextArea
        label="Descripción del proyecto"
        placeholder="Describe tu proyecto Arduino..."
        rows={4}
        helperText="Incluye detalles sobre componentes y funcionalidad"
      />
    </div>
  ),
};

export const TextAreaAutoSize: Story = {
  render: () => {
    const [value, setValue] = useState('Este textarea se redimensiona automáticamente...');

    return (
      <div style={{ width: '400px' }}>
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoSize={{ minRows: 2, maxRows: 6 }}
          label="Código Arduino"
          placeholder="Pega tu código aquí..."
          showCount
          maxLength={500}
        />
      </div>
    );
  },
};

// Search component
export const SearchExample: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = (value: string) => {
      setLoading(true);
      console.log('Searching for:', value);
      setTimeout(() => setLoading(false), 1500);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <Search
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          placeholder="Buscar componentes..."
          label="Búsqueda simple"
        />
        
        <Search
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          loading={loading}
          enterButton
          placeholder="Buscar en documentación..."
          label="Con botón de búsqueda"
        />
        
        <Search
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          enterButton={<Button size="sm">Buscar</Button>}
          placeholder="Buscar proyectos..."
          label="Con botón personalizado"
        />
      </div>
    );
  },
};

// Input groups
export const InputGroups: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Grupo URL
        </h4>
        <InputGroup>
          <div className="duino-input__addon duino-input__addon--before">https://</div>
          <Input placeholder="mi-proyecto" />
          <div className="duino-input__addon duino-input__addon--after">.arduino.cc</div>
        </InputGroup>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Búsqueda con botón
        </h4>
        <InputGroup>
          <Input placeholder="Buscar componentes..." />
          <Button>Buscar</Button>
        </InputGroup>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Configuración de pin
        </h4>
        <InputGroup compact>
          <div className="duino-input__addon duino-input__addon--before">Pin</div>
          <Input placeholder="13" type="number" />
          <div className="duino-input__addon duino-input__addon--after">Digital</div>
        </InputGroup>
      </div>
    </div>
  ),
};

// Formulario completo
export const CompleteForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      projectName: '',
      description: '',
      email: '',
      password: '',
      budget: '',
      tags: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      
      // Simular validación
      const newErrors: Record<string, string> = {};
      if (!formData.projectName) newErrors.projectName = 'El nombre es requerido';
      if (!formData.email) newErrors.email = 'El email es requerido';
      if (!formData.password) newErrors.password = 'La contraseña es requerida';
      
      setTimeout(() => {
        setErrors(newErrors);
        setLoading(false);
        if (Object.keys(newErrors).length === 0) {
          alert('¡Formulario enviado exitosamente!');
        }
      }, 1500);
    };

    const updateField = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

    return (
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ 
          marginBottom: '24px',
          padding: '20px',
          backgroundColor: 'var(--duino-brand-50)',
          borderRadius: 'var(--duino-radius)',
          border: '1px solid var(--duino-brand-200)',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '20px', 
            fontWeight: '600',
            color: 'var(--duino-brand-700)'
          }}>
            Crear Proyecto Arduino
          </h2>
          <p style={{ 
            margin: 0, 
            color: 'var(--duino-color-muted)',
            fontSize: '14px'
          }}>
            Completa la información de tu nuevo proyecto
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Input
            label="Nombre del proyecto"
            placeholder="Mi Proyecto Arduino"
            value={formData.projectName}
            onChange={(e) => updateField('projectName', e.target.value)}
            error={errors.projectName}
            required
            maxLength={50}
            showCount
            prefix={<UserIcon />}
          />

          <TextArea
            label="Descripción"
            placeholder="Describe tu proyecto, componentes que usa, funcionalidad, etc."
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            autoSize={{ minRows: 3, maxRows: 6 }}
            showCount
            maxLength={500}
            helperText="Incluye detalles técnicos y objetivo del proyecto"
          />

          <Input
            type="email"
            label="Email de contacto"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            error={errors.email}
            required
            prefix={<EmailIcon />}
          />

          <Input
            type="password"
            label="Contraseña"
            placeholder="Mínimo 8 caracteres"
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            error={errors.password}
            required
            helperText="Usa al menos 8 caracteres con números y letras"
          />

          <Input
            type="number"
            label="Presupuesto estimado (opcional)"
            placeholder="0"
            value={formData.budget}
            onChange={(e) => updateField('budget', e.target.value)}
            prefix={<DollarIcon />}
            suffix="USD"
            helperText="Costo aproximado de componentes"
          />

          <Input
            label="Tags del proyecto"
            placeholder="iot, sensor, led, bluetooth"
            value={formData.tags}
            onChange={(e) => updateField('tags', e.target.value)}
            allowClear
            onClear={() => updateField('tags', '')}
            helperText="Separa los tags con comas"
          />

          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'flex-end',
            marginTop: '8px'
          }}>
            <Button 
              type="button" 
              variant="ghost"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              loading={loading}
            >
              Crear Proyecto
            </Button>
          </div>
        </form>
      </div>
    );
  },
};

// Demo interactivo
export const InteractiveDemo: Story = {
  render: () => {
    const [config, setConfig] = useState({
      size: 'md' as const,
      variant: 'default' as const,
      type: 'text' as const,
      withLabel: true,
      withIcon: true,
      allowClear: true,
      showCount: false,
      error: false,
      success: false,
      loading: false,
      disabled: false,
    });

    const [value, setValue] = useState('Texto de ejemplo');

    const iconMap = {
      text: <UserIcon />,
      email: <EmailIcon />,
      password: <LockIcon />,
      number: <DollarIcon />,
      tel: <UserIcon />,
      url: <UserIcon />,
      search: <UserIcon />,
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
          border: '1px solid var(--duino-brand-200)'
        }}>
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '18px', 
            fontWeight: '600',
            color: 'var(--duino-brand-700)'
          }}>
            Configuración del Input
          </h3>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '12px',
            marginBottom: '16px'
          }}>
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
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>
                Variante:
              </label>
              <select
                value={config.variant}
                onChange={(e) => setConfig(prev => ({ ...prev, variant: e.target.value as any }))}
                style={{
                  width: '100%',
                  padding: '4px 6px',
                  border: '1px solid var(--duino-border)',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
              >
                <option value="default">Default</option>
                <option value="filled">Filled</option>
                <option value="borderless">Borderless</option>
              </select>
            </div>

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
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="password">Password</option>
                <option value="number">Number</option>
                <option value="tel">Tel</option>
                <option value="url">URL</option>
              </select>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '8px'
          }}>
            {[
              ['withLabel', 'Label'],
              ['withIcon', 'Icono'],
              ['allowClear', 'Limpiar'],
              ['showCount', 'Contador'],
              ['error', 'Error'],
              ['success', 'Success'],
              ['loading', 'Loading'],
              ['disabled', 'Disabled'],
            ].map(([key, label]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                <input
                  type="checkbox"
                  checked={config[key as keyof typeof config] as boolean}
                  onChange={(e) => setConfig(prev => ({ ...prev, [key]: e.target.checked }))}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ 
          padding: '30px',
          border: '2px dashed var(--duino-brand-300)',
          borderRadius: 'var(--duino-radius)',
          backgroundColor: 'var(--duino-color-bg)'
        }}>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            size={config.size}
            variant={config.variant}
            type={config.type}
            label={config.withLabel ? 'Campo de ejemplo' : undefined}
            prefix={config.withIcon ? iconMap[config.type] : undefined}
            allowClear={config.allowClear}
            showCount={config.showCount}
            maxLength={config.showCount ? 30 : undefined}
            error={config.error ? 'Error de ejemplo' : false}
            success={config.success}
            loading={config.loading}
            disabled={config.disabled}
            placeholder={`Input ${config.type} ${config.size}...`}
            helperText={!config.error ? 'Texto de ayuda para el usuario' : undefined}
          />
        </div>
      </div>
    );
  },
};

// Casos de uso específicos de Arduino
export const ArduinoUseCases: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '24px',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <div style={{ 
        textAlign: 'center',
        marginBottom: '16px'
      }}>
        <h2 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '20px', 
          fontWeight: '600',
          color: 'var(--duino-brand-700)'
        }}>
          Configuración de Arduino
        </h2>
        <p style={{ 
          margin: 0, 
          color: 'var(--duino-color-muted)',
          fontSize: '14px'
        }}>
          Configura los parámetros de tu proyecto
        </p>
      </div>

      {/* Configuración de pines */}
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Configuración de Pines
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Input
            type="number"
            label="Pin LED"
            defaultValue="13"
            min="0"
            max="53"
            helperText="Pin digital para LED"
          />
          <Input
            type="number"
            label="Pin Sensor"
            defaultValue="A0"
            helperText="Pin analógico para sensor"
          />
        </div>
      </div>

      {/* Configuración de red */}
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Configuración WiFi
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input
            label="Nombre de red (SSID)"
            placeholder="MiWiFi"
            prefix={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z"/>
                <path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                <path d="M9 17l2 2c.87-.87 2.13-.87 3 0l2-2C14.12 15.12 9.88 15.12 9 17z"/>
              </svg>
            }
          />
          <Input
            type="password"
            label="Contraseña WiFi"
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Parámetros del sensor */}
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Parámetros del Sensor
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <InputGroup>
            <div className="duino-input__addon duino-input__addon--before">Intervalo</div>
            <Input 
              type="number" 
              defaultValue="1000"
              placeholder="1000"
            />
            <div className="duino-input__addon duino-input__addon--after">ms</div>
          </InputGroup>
          
          <InputGroup>
            <div className="duino-input__addon duino-input__addon--before">Umbral</div>
            <Input 
              type="number" 
              defaultValue="50"
              placeholder="50"
            />
            <div className="duino-input__addon duino-input__addon--after">%</div>
          </InputGroup>
        </div>
      </div>

      {/* Código inicial */}
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Código Inicial
        </h4>
        <TextArea
          label="Sketch base"
          placeholder="void setup() {&#10;  // Tu código aquí&#10;}&#10;&#10;void loop() {&#10;  // Código principal&#10;}"
          autoSize={{ minRows: 6, maxRows: 12 }}
          showCount
          maxLength={2000}
          helperText="Código C++ que se ejecutará en Arduino"
          style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
        />
      </div>

      <div style={{ 
        padding: '16px',
        backgroundColor: 'var(--duino-color-bg)',
        border: '1px solid var(--duino-border)',
        borderRadius: 'var(--duino-radius)',
        textAlign: 'center'
      }}>
        <Button 
          type="submit"
          size="lg"
          loading={loading}
          disabled={loading}
          style={{ minWidth: '150px' }}
        >
          {loading ? 'Creando...' : 'Crear Proyecto'}
        </Button>
      </div>
    </div>
  ),
};

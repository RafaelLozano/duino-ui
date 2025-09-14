import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Table } from "./Table";
import type { TableColumn } from "./Table";

// Iconos de ejemplo
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6" />
    <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1 2-2h4a2,2 0 0,1 2,2v2" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Datos de ejemplo
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  projects: number;
  lastActivity: string;
}

const generateUsers = (count: number): User[] => {
  const roles = ['Admin', 'Developer', 'Designer', 'Manager', 'Analyst'];
  const statuses: User['status'][] = ['active', 'inactive', 'pending'];
  const names = [
    'Ana García', 'Carlos López', 'María Rodríguez', 'Juan Martínez', 'Laura Sánchez',
    'Pedro González', 'Carmen Fernández', 'Antonio Ruiz', 'Isabel Moreno', 'Francisco Jiménez',
    'Pilar Muñoz', 'José Álvarez', 'Teresa Romero', 'Manuel Navarro', 'Rosa Torres'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@arduino.cc`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    joinDate: new Date(2020 + Math.floor(i / 12), i % 12, Math.floor(Math.random() * 28) + 1).toLocaleDateString('es-ES'),
    projects: Math.floor(Math.random() * 15) + 1,
    lastActivity: `Hace ${Math.floor(Math.random() * 30) + 1} días`,
  }));
};

const userData = generateUsers(50);

const meta: Meta<typeof Table> = {
  title: "components/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Componente Table del sistema de diseño Arduino con funcionalidades completas.

**Características:**
- Sorting por columnas
- Paginación integrada
- Selección de filas
- Estados de loading y empty
- 4 variantes de diseño
- 3 tamaños disponibles
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
      description: "Tamaño de la tabla",
    },
    variant: {
      control: "select",
      options: ["default", "striped", "bordered", "minimal"],
      description: "Variante visual de la tabla",
    },
    loading: {
      control: "boolean",
      description: "Mostrar estado de carga",
    },
    bordered: {
      control: "boolean",
      description: "Mostrar bordes en las celdas",
    },
    striped: {
      control: "boolean",
      description: "Filas alternadas con color de fondo",
    },
    hoverable: {
      control: "boolean",
      description: "Efecto hover en las filas",
    },
    sticky: {
      control: "boolean",
      description: "Header fijo al hacer scroll",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// Columnas básicas
const basicColumns: TableColumn<User>[] = [
  {
    key: 'name',
    title: 'Nombre',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Rol',
    dataIndex: 'role',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Estado',
    dataIndex: 'status',
    render: (status: User['status']) => (
      <span
        style={{
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500',
          textTransform: 'uppercase',
          backgroundColor: 
            status === 'active' ? '#dcfce7' :
            status === 'pending' ? '#fef3c7' : '#fee2e2',
          color:
            status === 'active' ? '#166534' :
            status === 'pending' ? '#92400e' : '#991b1b',
        }}
      >
        {status === 'active' ? 'Activo' : status === 'pending' ? 'Pendiente' : 'Inactivo'}
      </span>
    ),
  },
];

// Columnas con acciones
const columnsWithActions: TableColumn<User>[] = [
  ...basicColumns,
  {
    key: 'actions',
    title: 'Acciones',
    width: 120,
    align: 'center',
    render: (_, record) => (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button
          className="duino-btn duino-btn--ghost duino-btn--sm"
          style={{ padding: '4px' }}
          title="Editar"
        >
          <EditIcon />
        </button>
        <button
          className="duino-btn duino-btn--ghost duino-btn--sm"
          style={{ padding: '4px', color: 'var(--duino-danger-500)' }}
          title="Eliminar"
        >
          <DeleteIcon />
        </button>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    columns: basicColumns,
    data: userData.slice(0, 10),
    sortable: true,
  },
};

export const WithPagination: Story = {
  args: {
    columns: basicColumns,
    data: userData,
    sortable: true,
    pagination: {
      pageSize: 10,
      showSizeChanger: true,
    },
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

    return (
      <div>
        <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: 'var(--duino-brand-50)', borderRadius: '8px' }}>
          <strong>Seleccionados:</strong> {selectedKeys.length} usuarios
          {selectedKeys.length > 0 && (
            <button
              className="duino-btn duino-btn--ghost duino-btn--sm"
              style={{ marginLeft: '12px' }}
              onClick={() => setSelectedKeys([])}
            >
              Limpiar selección
            </button>
          )}
        </div>
        <Table
          columns={basicColumns}
          data={userData.slice(0, 15)}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => setSelectedKeys(keys),
          }}
          sortable
        />
      </div>
    );
  },
};

export const WithActions: Story = {
  args: {
    columns: columnsWithActions,
    data: userData.slice(0, 10),
    sortable: true,
    hoverable: true,
  },
};

export const Striped: Story = {
  args: {
    columns: basicColumns,
    data: userData.slice(0, 8),
    striped: true,
    sortable: true,
  },
};

export const Bordered: Story = {
  args: {
    columns: basicColumns,
    data: userData.slice(0, 8),
    bordered: true,
    sortable: true,
  },
};

export const Minimal: Story = {
  args: {
    columns: basicColumns,
    data: userData.slice(0, 8),
    variant: "minimal",
    sortable: true,
  },
};

export const Small: Story = {
  args: {
    columns: basicColumns,
    data: userData.slice(0, 12),
    size: "sm",
    sortable: true,
  },
};

export const Large: Story = {
  args: {
    columns: basicColumns,
    data: userData.slice(0, 6),
    size: "lg",
    sortable: true,
  },
};

export const Loading: Story = {
  args: {
    columns: basicColumns,
    data: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: basicColumns,
    data: [],
    emptyText: (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <UserIcon />
        <div style={{ marginTop: '8px', fontSize: '16px', fontWeight: '500' }}>
          No hay usuarios
        </div>
        <div style={{ marginTop: '4px', color: 'var(--duino-color-muted)', fontSize: '14px' }}>
          Agrega usuarios para comenzar
        </div>
      </div>
    ),
  },
};

// Tabla compleja con todas las funcionalidades
export const CompleteExample: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);

    const complexColumns: TableColumn<User>[] = [
      {
        key: 'name',
        title: 'Usuario',
        dataIndex: 'name',
        sortable: true,
        render: (name: string, record: User) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--duino-brand-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--duino-brand-700)',
              }}
            >
              {name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: '500' }}>{name}</div>
              <div style={{ fontSize: '13px', color: 'var(--duino-color-muted)' }}>
                {record.email}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: 'role',
        title: 'Rol',
        dataIndex: 'role',
        sortable: true,
        width: 120,
      },
      {
        key: 'status',
        title: 'Estado',
        dataIndex: 'status',
        sortable: true,
        width: 100,
        render: (status: User['status']) => (
          <span
            style={{
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500',
              textTransform: 'uppercase',
              backgroundColor: 
                status === 'active' ? '#dcfce7' :
                status === 'pending' ? '#fef3c7' : '#fee2e2',
              color:
                status === 'active' ? '#166534' :
                status === 'pending' ? '#92400e' : '#991b1b',
            }}
          >
            {status === 'active' ? 'Activo' : status === 'pending' ? 'Pendiente' : 'Inactivo'}
          </span>
        ),
      },
      {
        key: 'projects',
        title: 'Proyectos',
        dataIndex: 'projects',
        sortable: true,
        width: 100,
        align: 'center',
        render: (projects: number) => (
          <span style={{ 
            fontWeight: '600',
            color: projects > 10 ? 'var(--duino-brand-600)' : 'var(--duino-color-muted)'
          }}>
            {projects}
          </span>
        ),
      },
      {
        key: 'joinDate',
        title: 'Fecha de Ingreso',
        dataIndex: 'joinDate',
        sortable: true,
        width: 130,
      },
      {
        key: 'lastActivity',
        title: 'Última Actividad',
        dataIndex: 'lastActivity',
        width: 130,
      },
      {
        key: 'actions',
        title: 'Acciones',
        width: 120,
        align: 'center',
        render: (_, record) => (
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
            <button
              className="duino-btn duino-btn--ghost duino-btn--sm"
              style={{ padding: '6px' }}
              title="Editar usuario"
            >
              <EditIcon />
            </button>
            <button
              className="duino-btn duino-btn--ghost duino-btn--sm"
              style={{ padding: '6px', color: 'var(--duino-danger-500)' }}
              title="Eliminar usuario"
            >
              <DeleteIcon />
            </button>
          </div>
        ),
      },
    ];

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px',
          padding: '16px',
          backgroundColor: 'var(--duino-brand-50)',
          borderRadius: 'var(--duino-radius)',
        }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>
              Gestión de Usuarios
            </h3>
            <p style={{ margin: 0, color: 'var(--duino-color-muted)', fontSize: '14px' }}>
              {selectedKeys.length > 0 
                ? `${selectedKeys.length} usuarios seleccionados`
                : `${userData.length} usuarios totales`
              }
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {selectedKeys.length > 0 && (
              <>
                <button className="duino-btn duino-btn--secondary duino-btn--sm">
                  Exportar ({selectedKeys.length})
                </button>
                <button 
                  className="duino-btn duino-btn--danger duino-btn--sm"
                  onClick={() => {
                    if (confirm(`¿Eliminar ${selectedKeys.length} usuarios?`)) {
                      setSelectedKeys([]);
                    }
                  }}
                >
                  Eliminar ({selectedKeys.length})
                </button>
              </>
            )}
            <button 
              className="duino-btn duino-btn--ghost duino-btn--sm"
              onClick={handleRefresh}
            >
              Actualizar
            </button>
            <button className="duino-btn duino-btn--primary duino-btn--sm">
              Agregar Usuario
            </button>
          </div>
        </div>

        <Table
          columns={complexColumns}
          data={userData}
          loading={loading}
          sortable
          hoverable
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: setSelectedKeys,
            getCheckboxProps: (record) => ({
              disabled: record.status === 'inactive',
            }),
          }}
          pagination={{
            pageSize: 15,
            showSizeChanger: true,
          }}
          scroll={{ x: 800 }}
        />
      </div>
    );
  },
};

// Showcase de todas las variantes
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Default</h3>
        <Table
          columns={basicColumns.slice(0, 3)}
          data={userData.slice(0, 4)}
          size="sm"
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Striped</h3>
        <Table
          columns={basicColumns.slice(0, 3)}
          data={userData.slice(0, 4)}
          size="sm"
          striped
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Bordered</h3>
        <Table
          columns={basicColumns.slice(0, 3)}
          data={userData.slice(0, 4)}
          size="sm"
          bordered
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Minimal</h3>
        <Table
          columns={basicColumns.slice(0, 3)}
          data={userData.slice(0, 4)}
          size="sm"
          variant="minimal"
        />
      </div>
    </div>
  ),
};

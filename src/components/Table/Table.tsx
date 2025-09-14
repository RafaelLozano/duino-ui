import React, { useState, useMemo, ReactNode } from 'react';
import './table.css';

export type TableSize = 'sm' | 'md' | 'lg';
export type SortDirection = 'asc' | 'desc' | null;
export type TableVariant = 'default' | 'striped' | 'bordered' | 'minimal';

export interface TableColumn<T = any> {
  key: string;
  title: ReactNode;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  className?: string;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  size?: TableSize;
  variant?: TableVariant;
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  sticky?: boolean;
  
  // Selection
  rowSelection?: {
    selectedRowKeys?: React.Key[];
    onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
    getCheckboxProps?: (record: T) => { disabled?: boolean };
  };
  
  // Sorting
  sortable?: boolean;
  defaultSortOrder?: { key: string; direction: SortDirection };
  onSort?: (key: string, direction: SortDirection) => void;
  
  // Pagination
  pagination?: {
    current?: number;
    pageSize?: number;
    total?: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    onChange?: (page: number, pageSize: number) => void;
  } | false;
  
  // Row props
  rowKey?: string | ((record: T) => React.Key);
  onRow?: (record: T, index: number) => React.HTMLAttributes<HTMLTableRowElement>;
  
  // Empty state
  emptyText?: ReactNode;
  
  // Styling
  className?: string;
  scroll?: { x?: number | string; y?: number | string };
}

// Componente de paginación simple
const TablePagination: React.FC<{
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  onChange: (page: number, pageSize: number) => void;
}> = ({ current, pageSize, total, showSizeChanger, onChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onChange(page, pageSize);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    onChange(1, newSize);
  };

  return (
    <div className="duino-table__pagination">
      <div className="duino-table__pagination-info">
        Mostrando {((current - 1) * pageSize) + 1}-{Math.min(current * pageSize, total)} de {total}
      </div>
      
      <div className="duino-table__pagination-controls">
        {showSizeChanger && (
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="duino-table__page-size-selector"
          aria-label="Elementos por página"
        >
            <option value={10}>10 / página</option>
            <option value={20}>20 / página</option>
            <option value={50}>50 / página</option>
            <option value={100}>100 / página</option>
          </select>
        )}
        
        <div className="duino-table__pagination-buttons">
          <button
            onClick={() => handlePageChange(current - 1)}
            disabled={current <= 1}
            className="duino-btn duino-btn--ghost duino-btn--sm"
          >
            ‹ Anterior
          </button>
          
          <span className="duino-table__pagination-current">
            {current} de {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(current + 1)}
            disabled={current >= totalPages}
            className="duino-btn duino-btn--ghost duino-btn--sm"
          >
            Siguiente ›
          </button>
        </div>
      </div>
    </div>
  );
};

export const Table = <T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  size = 'md',
  variant = 'default',
  bordered = false,
  striped = false,
  hoverable = true,
  sticky = false,
  rowSelection,
  sortable = false,
  defaultSortOrder,
  onSort,
  pagination,
  rowKey = 'id',
  onRow,
  emptyText = 'No hay datos',
  className = '',
  scroll,
}: TableProps<T>) => {
  const [sortState, setSortState] = useState<{ key: string; direction: SortDirection }>({
    key: defaultSortOrder?.key || '',
    direction: defaultSortOrder?.direction || null,
  });

  const [currentPage, setCurrentPage] = useState(
    (pagination !== false && pagination?.current) || 1
  );
  const [pageSize, setPageSize] = useState(
    (pagination !== false && pagination?.pageSize) || 10
  );

  // Función para obtener la clave de la fila
  const getRowKey = (record: T, index: number): React.Key => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index;
  };

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.direction) return data;
    
    const column = columns.find(col => col.key === sortState.key);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = column.dataIndex ? a[column.dataIndex] : a[column.key];
      const bValue = column.dataIndex ? b[column.dataIndex] : b[column.key];
      
      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;
      
      return sortState.direction === 'desc' ? -comparison : comparison;
    });
  }, [data, sortState, columns]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, pageSize, pagination]);

  // Handle sort
  const handleSort = (columnKey: string) => {
    if (!sortable) return;
    
    let newDirection: SortDirection = 'asc';
    if (sortState.key === columnKey) {
      if (sortState.direction === 'asc') newDirection = 'desc';
      else if (sortState.direction === 'desc') newDirection = null;
    }
    
    const newSortState = { key: columnKey, direction: newDirection };
    setSortState(newSortState);
    onSort?.(columnKey, newDirection);
  };

  // Handle selection
  const handleSelectAll = (checked: boolean) => {
    if (!rowSelection) return;
    
    const keys = checked ? paginatedData.map((record, index) => getRowKey(record, index)) : [];
    const selectedRows = checked ? [...paginatedData] : [];
    rowSelection.onChange?.(keys, selectedRows);
  };

  const handleSelectRow = (record: T, index: number, checked: boolean) => {
    if (!rowSelection) return;
    
    const key = getRowKey(record, index);
    const currentKeys = rowSelection.selectedRowKeys || [];
    const newKeys = checked 
      ? [...currentKeys, key]
      : currentKeys.filter(k => k !== key);
    
    const selectedRows = data.filter((item, idx) => 
      newKeys.includes(getRowKey(item, idx))
    );
    
    rowSelection.onChange?.(newKeys, selectedRows);
  };

  // Build table classes
  const tableClasses = [
    'duino-table',
    `duino-table--${size}`,
    `duino-table--${variant}`,
    bordered && 'duino-table--bordered',
    striped && 'duino-table--striped',
    hoverable && 'duino-table--hoverable',
    sticky && 'duino-table--sticky',
    loading && 'duino-table--loading',
    className
  ].filter(Boolean).join(' ');

  const hasSelection = !!rowSelection;
  const selectedKeys = rowSelection?.selectedRowKeys || [];
  const isAllSelected = paginatedData.length > 0 && 
    paginatedData.every((record, index) => 
      selectedKeys.includes(getRowKey(record, index))
    );

  return (
    <div className="duino-table-wrapper">
      <div 
        className="duino-table-container"
        style={{
          overflowX: scroll?.x ? 'auto' : undefined,
          overflowY: scroll?.y ? 'auto' : undefined,
          maxHeight: scroll?.y,
        }}
      >
        <table className={tableClasses}>
          <thead className="duino-table__head">
            <tr>
              {hasSelection && (
                <th className="duino-table__cell duino-table__cell--selection">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="duino-table__checkbox"
                  aria-label="Seleccionar todos"
                />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`duino-table__cell duino-table__cell--head ${column.className || ''}`}
                  style={{
                    width: column.width,
                    textAlign: column.align || 'left',
                  }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="duino-table__header-content">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <span className="duino-table__sort-icon">
                        {sortState.key === column.key ? (
                          sortState.direction === 'asc' ? '↑' : 
                          sortState.direction === 'desc' ? '↓' : '↕'
                        ) : '↕'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="duino-table__body">
            {loading ? (
              <tr>
                <td 
                  colSpan={columns.length + (hasSelection ? 1 : 0)}
                  className="duino-table__cell duino-table__cell--loading"
                >
                  <div className="duino-table__loading">
                    <div className="duino-table__spinner" />
                    <span>Cargando...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (hasSelection ? 1 : 0)}
                  className="duino-table__cell duino-table__cell--empty"
                >
                  <div className="duino-table__empty">
                    {emptyText}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((record, index) => {
                const key = getRowKey(record, index);
                const isSelected = selectedKeys.includes(key);
                const rowProps = onRow?.(record, index) || {};
                
                return (
                  <tr
                    key={key}
                    className={`duino-table__row ${isSelected ? 'duino-table__row--selected' : ''}`}
                    {...rowProps}
                  >
                    {hasSelection && (
                      <td className="duino-table__cell duino-table__cell--selection">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(record, index, e.target.checked)}
                          className="duino-table__checkbox"
                          {...(rowSelection.getCheckboxProps?.(record) || {})}
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      const value = column.dataIndex ? record[column.dataIndex] : record[column.key];
                      const cellContent = column.render ? 
                        column.render(value, record, index) : 
                        value;

                      return (
                        <td
                          key={column.key}
                          className={`duino-table__cell ${column.className || ''}`}
                          style={{
                            textAlign: column.align || 'left',
                          }}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && !loading && paginatedData.length > 0 && (
        <TablePagination
          current={currentPage}
          pageSize={pageSize}
          total={pagination.total || data.length}
          showSizeChanger={pagination.showSizeChanger}
          onChange={(page, size) => {
            setCurrentPage(page);
            setPageSize(size);
            pagination.onChange?.(page, size);
          }}
        />
      )}
    </div>
  );
};

Table.displayName = 'Table';

import React, { useState, useRef, ReactNode } from 'react';
import { Button } from '../Button/Button';
import { Spin } from '../Spin/Spin';
import './upload.css';

export type UploadType = 'select' | 'drag' | 'avatar';
export type UploadListType = 'text' | 'picture' | 'picture-card';

export interface UploadFile {
  uid: string;
  name: string;
  status: 'uploading' | 'done' | 'error' | 'removed';
  size?: number;
  type?: string;
  url?: string;
  thumbUrl?: string;
  response?: any;
  error?: any;
  percent?: number;
  originFileObj?: File;
}

export interface UploadProps {
  // Basic props
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  directory?: boolean;
  
  // Upload behavior
  action?: string | ((file: File) => string | Promise<string>);
  method?: 'POST' | 'PUT' | 'PATCH';
  data?: Record<string, any> | ((file: File) => Record<string, any>);
  headers?: Record<string, string>;
  withCredentials?: boolean;
  
  // File management
  fileList?: UploadFile[];
  defaultFileList?: UploadFile[];
  maxCount?: number;
  maxSize?: number; // en bytes
  
  // UI
  type?: UploadType;
  listType?: UploadListType;
  showUploadList?: boolean;
  previewFile?: (file: File) => Promise<string>;
  
  // Content
  children?: ReactNode;
  
  // Styling
  className?: string;
  
  // Callbacks
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  onChange?: (info: { file: UploadFile; fileList: UploadFile[] }) => void;
  onPreview?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => boolean | Promise<boolean>;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  
  // Custom request
  customRequest?: (options: {
    file: File;
    onProgress: (percent: number) => void;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
  }) => void;
}

// Utilidades
const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

// Componente de lista de archivos
const UploadList: React.FC<{
  fileList: UploadFile[];
  listType: UploadListType;
  onPreview?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
}> = ({ fileList, listType, onPreview, onRemove }) => {
  if (fileList.length === 0) return null;

  const renderFileItem = (file: UploadFile) => {
    const extension = getFileExtension(file.name);
    const isImage = file.type?.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);

    if (listType === 'picture-card') {
      return (
        <div key={file.uid} className="duino-upload__file-card">
          {isImage && (file.url || file.thumbUrl) ? (
            <img
              src={file.url || file.thumbUrl}
              alt={file.name}
              className="duino-upload__file-thumbnail"
            />
          ) : (
            <div className="duino-upload__file-icon">
              📄
            </div>
          )}
          
          <div className="duino-upload__file-actions">
            {file.status === 'done' && onPreview && (
              <button
                className="duino-upload__action-btn"
                onClick={() => onPreview(file)}
                title="Preview"
              >
                👁
              </button>
            )}
            <button
              className="duino-upload__action-btn duino-upload__action-btn--danger"
              onClick={() => onRemove?.(file)}
              title="Eliminar"
            >
              🗑
            </button>
          </div>

          {file.status === 'uploading' && (
            <div className="duino-upload__file-progress">
              <div 
                className="duino-upload__progress-bar"
                style={{ width: `${file.percent || 0}%` }}
              />
            </div>
          )}

          <div className="duino-upload__file-name">
            {file.name}
          </div>
        </div>
      );
    }

    // Text and picture list types
    return (
      <div key={file.uid} className={`duino-upload__file-item duino-upload__file-item--${file.status}`}>
        {listType === 'picture' && isImage && (file.url || file.thumbUrl) && (
          <img
            src={file.url || file.thumbUrl}
            alt={file.name}
            className="duino-upload__file-thumb"
          />
        )}
        
        <div className="duino-upload__file-info">
          <div className="duino-upload__file-name">{file.name}</div>
          {file.size && (
            <div className="duino-upload__file-size">{formatFileSize(file.size)}</div>
          )}
          {file.status === 'uploading' && (
            <div className="duino-upload__file-progress">
              <div 
                className="duino-upload__progress-bar"
                style={{ width: `${file.percent || 0}%` }}
              />
              <span className="duino-upload__progress-text">{file.percent || 0}%</span>
            </div>
          )}
          {file.status === 'error' && (
            <div className="duino-upload__file-error">Error al subir archivo</div>
          )}
        </div>

        <div className="duino-upload__file-actions">
          {file.status === 'done' && onPreview && (
            <button
              className="duino-upload__action-btn"
              onClick={() => onPreview(file)}
            >
              Ver
            </button>
          )}
          <button
            className="duino-upload__action-btn duino-upload__action-btn--danger"
            onClick={() => onRemove?.(file)}
          >
            Eliminar
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`duino-upload__list duino-upload__list--${listType}`}>
      {fileList.map(renderFileItem)}
    </div>
  );
};

export const Upload: React.FC<UploadProps> = ({
  accept,
  multiple = false,
  disabled = false,
  directory = false,
  action,
  method = 'POST',
  data,
  headers,
  withCredentials = false,
  fileList: controlledFileList,
  defaultFileList = [],
  maxCount,
  maxSize,
  type = 'select',
  listType = 'text',
  showUploadList = true,
  previewFile,
  children,
  className = '',
  beforeUpload,
  onChange,
  onPreview,
  onRemove,
  onDrop,
  customRequest,
}) => {
  const [internalFileList, setInternalFileList] = useState<UploadFile[]>(defaultFileList);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fileList = controlledFileList !== undefined ? controlledFileList : internalFileList;

  // Generar UID único para archivos
  const generateUID = (): string => {
    return `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Subir archivo
  const uploadFile = async (file: File): Promise<void> => {
    const uid = generateUID();
    const uploadFile: UploadFile = {
      uid,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      percent: 0,
      originFileObj: file,
    };

    // Agregar archivo a la lista
    const newFileList = [...fileList, uploadFile];
    if (controlledFileList === undefined) {
      setInternalFileList(newFileList);
    }
    onChange?.({ file: uploadFile, fileList: newFileList });

    try {
      if (customRequest) {
        // Usar request personalizado
        customRequest({
          file,
          onProgress: (percent) => {
            const updatedFile = { ...uploadFile, percent };
            const updatedList = newFileList.map(f => f.uid === uid ? updatedFile : f);
            if (controlledFileList === undefined) {
              setInternalFileList(updatedList);
            }
            onChange?.({ file: updatedFile, fileList: updatedList });
          },
          onSuccess: (response) => {
            const successFile = { 
              ...uploadFile, 
              status: 'done' as const, 
              percent: 100,
              response,
              url: response?.url || URL.createObjectURL(file)
            };
            const updatedList = newFileList.map(f => f.uid === uid ? successFile : f);
            if (controlledFileList === undefined) {
              setInternalFileList(updatedList);
            }
            onChange?.({ file: successFile, fileList: updatedList });
          },
          onError: (error) => {
            const errorFile = { ...uploadFile, status: 'error' as const, error };
            const updatedList = newFileList.map(f => f.uid === uid ? errorFile : f);
            if (controlledFileList === undefined) {
              setInternalFileList(updatedList);
            }
            onChange?.({ file: errorFile, fileList: updatedList });
          },
        });
      } else {
        // Simular upload para demo
        for (let percent = 0; percent <= 100; percent += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          const updatedFile = { ...uploadFile, percent };
          const updatedList = newFileList.map(f => f.uid === uid ? updatedFile : f);
          if (controlledFileList === undefined) {
            setInternalFileList(updatedList);
          }
          onChange?.({ file: updatedFile, fileList: updatedList });
        }

        // Completar upload
        const successFile = { 
          ...uploadFile, 
          status: 'done' as const, 
          percent: 100,
          url: URL.createObjectURL(file)
        };
        const updatedList = newFileList.map(f => f.uid === uid ? successFile : f);
        if (controlledFileList === undefined) {
          setInternalFileList(updatedList);
        }
        onChange?.({ file: successFile, fileList: updatedList });
      }
    } catch (error) {
      const errorFile = { ...uploadFile, status: 'error' as const, error };
      const updatedList = newFileList.map(f => f.uid === uid ? errorFile : f);
      if (controlledFileList === undefined) {
        setInternalFileList(updatedList);
      }
      onChange?.({ file: errorFile, fileList: updatedList });
    }
  };

  // Manejar selección de archivos
  const handleFileSelect = async (files: FileList | null) => {
    if (!files || disabled) return;

    const fileArray = Array.from(files);
    
    // Validar límites
    if (maxCount && fileList.length + fileArray.length > maxCount) {
      alert(`Máximo ${maxCount} archivos permitidos`);
      return;
    }

    for (const file of fileArray) {
      // Validar tamaño
      if (maxSize && file.size > maxSize) {
        alert(`El archivo ${file.name} excede el tamaño máximo de ${formatFileSize(maxSize)}`);
        continue;
      }

      // Validar con beforeUpload
      if (beforeUpload) {
        const shouldUpload = await beforeUpload(file, fileArray);
        if (!shouldUpload) continue;
      }

      uploadFile(file);
    }
  };

  // Manejar click en input
  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  // Manejar drag & drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled && !dragOver) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragOver) {
      setDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    if (disabled) return;
    
    onDrop?.(e);
    handleFileSelect(e.dataTransfer.files);
  };

  // Manejar eliminación de archivo
  const handleRemove = async (file: UploadFile) => {
    if (onRemove) {
      const shouldRemove = await onRemove(file);
      if (!shouldRemove) return;
    }

    const newFileList = fileList.filter(f => f.uid !== file.uid);
    if (controlledFileList === undefined) {
      setInternalFileList(newFileList);
    }
    onChange?.({ file: { ...file, status: 'removed' }, fileList: newFileList });
  };

  // Construir clases CSS
  const uploadClasses = [
    'duino-upload',
    `duino-upload--${type}`,
    disabled && 'duino-upload--disabled',
    dragOver && 'duino-upload--drag-over',
    className
  ].filter(Boolean).join(' ');

  // Renderizar área de upload
  const renderUploadArea = () => {
    if (type === 'avatar') {
      const avatarFile = fileList[0];
      return (
        <div className="duino-upload__avatar" onClick={handleClick}>
          {avatarFile && avatarFile.status === 'uploading' ? (
            <div className="duino-upload__avatar-loading">
              <Spin size="sm" />
            </div>
          ) : avatarFile && avatarFile.url ? (
            <img
              src={avatarFile.url}
              alt="Avatar"
              className="duino-upload__avatar-img"
            />
          ) : (
            <div className="duino-upload__avatar-placeholder">
              <svg className="duino-upload__avatar-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <div className="duino-upload__avatar-text">Subir Avatar</div>
            </div>
          )}
        </div>
      );
    }

    if (type === 'drag') {
      return (
        <div
          className="duino-upload__dragger"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="duino-upload__dragger-content">
            <svg className="duino-upload__dragger-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
            <div className="duino-upload__dragger-text">
              <p className="duino-upload__dragger-hint">
                Haz click o arrastra archivos aquí para subir
              </p>
              <p className="duino-upload__dragger-description">
                Soporta archivos individuales o múltiples
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Type: select (default)
    return children || (
      <Button icon={
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7,10 12,15 17,10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      }>
        Seleccionar Archivos
      </Button>
    );
  };

  const canUploadMore = !maxCount || fileList.length < maxCount;

  return (
    <div className={uploadClasses}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => handleFileSelect(e.target.files)}
        style={{ display: 'none' }}
        {...(directory ? { webkitdirectory: '', directory: '' } as any : {})}
      />

      {canUploadMore && renderUploadArea()}

      {showUploadList && fileList.length > 0 && (
        <UploadList
          fileList={fileList}
          listType={listType}
          onPreview={onPreview}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
};

Upload.displayName = 'Upload';

import React, { useState, useCallback, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Stack,
  Chip,
  Alert,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import { brandColors } from '../../tokens';

export type FileUploadVariant = 'dropzone' | 'button' | 'compact';

export interface UploadFile {
  /** Unique identifier */
  id: string;
  /** Original file object */
  file: File;
  /** File name */
  name: string;
  /** File size in bytes */
  size: number;
  /** MIME type */
  type: string;
  /** Upload progress (0-100) */
  progress: number;
  /** Upload status */
  status: 'pending' | 'uploading' | 'complete' | 'error';
  /** Error message if status is 'error' */
  error?: string;
  /** Preview URL for images */
  preview?: string;
}

export interface FileUploadProps {
  /** Visual variant */
  variant?: FileUploadVariant;
  /** Accepted file types (e.g., 'image/*,.pdf') */
  accept?: string;
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Current files (controlled) */
  files?: UploadFile[];
  /** Callback when files change */
  onFilesChange?: (files: UploadFile[]) => void;
  /** Callback when a file is selected */
  onFileSelect?: (files: File[]) => void;
  /** Callback when a file is removed */
  onFileRemove?: (file: UploadFile) => void;
  /** Custom upload function - return promise that resolves on success */
  onUpload?: (file: File) => Promise<void>;
  /** Whether upload is disabled */
  disabled?: boolean;
  /** Helper text shown below the dropzone */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Show file list */
  showFileList?: boolean;
  /** Compact size */
  size?: 'small' | 'medium';
  /** Custom styles */
  sx?: object;
}

// Helper functions
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return <ImageIcon />;
  if (type.startsWith('video/')) return <VideoLibraryIcon />;
  if (type === 'application/pdf') return <PictureAsPdfIcon />;
  if (type.includes('document') || type.includes('text')) return <DescriptionIcon />;
  return <InsertDriveFileIcon />;
};

const generateId = () => `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

/**
 * FileUpload component provides drag-and-drop file upload functionality
 * with progress indicators, file validation, and preview support.
 *
 * @example
 * ```tsx
 * const [files, setFiles] = useState<UploadFile[]>([]);
 *
 * <FileUpload
 *   files={files}
 *   onFilesChange={setFiles}
 *   accept="image/*,.pdf"
 *   multiple
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   maxFiles={5}
 *   onUpload={async (file) => {
 *     await uploadToServer(file);
 *   }}
 * />
 * ```
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  variant = 'dropzone',
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  files: controlledFiles,
  onFilesChange,
  onFileSelect,
  onFileRemove,
  onUpload,
  disabled = false,
  helperText,
  error: externalError,
  showFileList = true,
  size = 'medium',
  sx,
}) => {
  const [internalFiles, setInternalFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const files = controlledFiles ?? internalFiles;
  
  // Helper to update files - handles both controlled and uncontrolled
  const updateFiles = useCallback((updater: UploadFile[] | ((prev: UploadFile[]) => UploadFile[])) => {
    if (typeof updater === 'function') {
      if (onFilesChange) {
        onFilesChange(updater(controlledFiles ?? internalFiles));
      } else {
        setInternalFiles(updater);
      }
    } else {
      if (onFilesChange) {
        onFilesChange(updater);
      } else {
        setInternalFiles(updater);
      }
    }
  }, [controlledFiles, internalFiles, onFilesChange]);

  // Validate file
  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`;
    }
    if (maxFiles && files.length >= maxFiles) {
      return `Maximum ${maxFiles} files allowed`;
    }
    return null;
  };

  // Process selected files
  const processFiles = useCallback(
    async (selectedFiles: FileList | File[]) => {
      const fileArray = Array.from(selectedFiles);
      const validFiles: UploadFile[] = [];
      const errors: string[] = [];

      for (const file of fileArray) {
        const validationError = validateFile(file);
        if (validationError) {
          errors.push(validationError);
          continue;
        }

        const uploadFile: UploadFile = {
          id: generateId(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: 'pending',
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        };

        validFiles.push(uploadFile);
      }

      if (errors.length > 0) {
        setError(errors[0]);
      } else {
        setError(null);
      }

      if (validFiles.length > 0) {
        const newFiles = multiple ? [...files, ...validFiles] : validFiles;
        updateFiles(newFiles);
        onFileSelect?.(validFiles.map((f) => f.file));

        // Auto-upload if handler provided
        if (onUpload) {
          for (const uploadFile of validFiles) {
            try {
              // Update status to uploading
              updateFiles((prev: UploadFile[]) =>
                prev.map((f) =>
                  f.id === uploadFile.id ? { ...f, status: 'uploading' as const } : f
                )
              );

              // Simulate progress
              const progressInterval = setInterval(() => {
                updateFiles((prev: UploadFile[]) =>
                  prev.map((f) =>
                    f.id === uploadFile.id && f.progress < 90
                      ? { ...f, progress: f.progress + 10 }
                      : f
                  )
                );
              }, 200);

              await onUpload(uploadFile.file);

              clearInterval(progressInterval);

              // Update status to complete
              updateFiles((prev: UploadFile[]) =>
                prev.map((f) =>
                  f.id === uploadFile.id
                    ? { ...f, status: 'complete' as const, progress: 100 }
                    : f
                )
              );
            } catch (err) {
              // Update status to error
              updateFiles((prev: UploadFile[]) =>
                prev.map((f) =>
                  f.id === uploadFile.id
                    ? {
                        ...f,
                        status: 'error' as const,
                        error: err instanceof Error ? err.message : 'Upload failed',
                      }
                    : f
                )
              );
            }
          }
        }
      }
    },
    [files, updateFiles, maxSize, maxFiles, multiple, onFileSelect, onUpload]
  );

  // Event handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        processFiles(droppedFiles);
      }
    },
    [disabled, processFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (selectedFiles && selectedFiles.length > 0) {
        processFiles(selectedFiles);
      }
      // Reset input
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [processFiles]
  );

  const handleRemoveFile = useCallback(
    (file: UploadFile) => {
      // Revoke preview URL
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
      const newFiles = files.filter((f) => f.id !== file.id);
      updateFiles(newFiles);
      onFileRemove?.(file);
    },
    [files, updateFiles, onFileRemove]
  );

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const displayError = externalError || error;

  // Hidden file input
  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      accept={accept}
      multiple={multiple}
      onChange={handleFileSelect}
      style={{ display: 'none' }}
      disabled={disabled}
    />
  );

  // Keyboard handler for dropzone accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
        e.preventDefault();
        openFilePicker();
      }
    },
    [disabled]
  );

  // Dropzone variant
  if (variant === 'dropzone') {
    return (
      <Box sx={sx}>
        {fileInput}
        <Paper
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={`Upload files${accept ? `. Accepted formats: ${accept}` : ''}. Drag and drop or press Enter to browse`}
          aria-disabled={disabled}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFilePicker}
          onKeyDown={handleKeyDown}
          sx={{
            p: size === 'small' ? 3 : 4,
            border: '2px dashed',
            borderColor: displayError
              ? 'error.main'
              : isDragging
              ? 'primary.main'
              : 'divider',
            borderRadius: '12px',
            bgcolor: isDragging
              ? 'action.hover'
              : disabled
              ? 'action.disabledBackground'
              : 'background.paper',
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: disabled ? undefined : 'action.hover',
              borderColor: disabled ? undefined : 'primary.main',
            },
          }}
        >
          <CloudUploadIcon
            sx={{
              fontSize: size === 'small' ? 40 : 56,
              color: isDragging ? 'primary.main' : 'action.active',
              mb: 2,
            }}
          />
          <Typography variant={size === 'small' ? 'body1' : 'h6'} gutterBottom>
            {isDragging ? 'Drop files here' : 'Drag & drop files here'}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            or click to browse
          </Typography>
          {helperText && (
            <Typography variant="caption" color="text.secondary">
              {helperText}
            </Typography>
          )}
        </Paper>

        {displayError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {displayError}
          </Alert>
        )}

        {showFileList && files.length > 0 && (
          <FileList files={files} onRemove={handleRemoveFile} />
        )}
      </Box>
    );
  }

  // Button variant
  if (variant === 'button') {
    return (
      <Box sx={sx}>
        {fileInput}
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={openFilePicker}
          disabled={disabled}
          size={size}
        >
          Upload {multiple ? 'Files' : 'File'}
        </Button>

        {displayError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {displayError}
          </Alert>
        )}

        {showFileList && files.length > 0 && (
          <FileList files={files} onRemove={handleRemoveFile} />
        )}
      </Box>
    );
  }

  // Compact variant
  return (
    <Box sx={sx}>
      {fileInput}
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
        <Button
          variant="outlined"
          size="small"
          startIcon={<CloudUploadIcon />}
          onClick={openFilePicker}
          disabled={disabled}
        >
          Browse
        </Button>
        {files.map((file) => (
          <Chip
            key={file.id}
            icon={file.status === 'complete' ? <CheckCircleIcon /> : getFileIcon(file.type)}
            label={file.name}
            onDelete={() => handleRemoveFile(file)}
            color={file.status === 'error' ? 'error' : file.status === 'complete' ? 'success' : 'default'}
            size="small"
            sx={{
              maxWidth: 200,
              '& .MuiChip-label': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
          />
        ))}
      </Stack>
      {displayError && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
          {displayError}
        </Typography>
      )}
    </Box>
  );
};

// File List subcomponent
interface FileListProps {
  files: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onRemove }) => (
  <List dense sx={{ mt: 2 }}>
    {files.map((file) => (
      <ListItem
        key={file.id}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '8px',
          mb: 1,
          border: '1px solid',
          borderColor: file.status === 'error' ? 'error.light' : 'divider',
        }}
      >
        <ListItemIcon>
          {file.status === 'complete' ? (
            <CheckCircleIcon color="success" />
          ) : file.status === 'error' ? (
            <ErrorIcon color="error" />
          ) : (
            getFileIcon(file.type)
          )}
        </ListItemIcon>
        <ListItemText
          primary={file.name}
          secondary={
            <Box component="span">
              {formatFileSize(file.size)}
              {file.error && (
                <Typography component="span" color="error" sx={{ ml: 1 }}>
                  • {file.error}
                </Typography>
              )}
            </Box>
          }
          sx={{
            '& .MuiListItemText-primary': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }}
        />
        {file.status === 'uploading' && (
          <Box sx={{ width: 100, mr: 2 }}>
            <LinearProgress variant="determinate" value={file.progress} />
          </Box>
        )}
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={() => onRemove(file)} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
);

export default FileUpload;

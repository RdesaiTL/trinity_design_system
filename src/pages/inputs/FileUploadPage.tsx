import * as React from 'react';
import { useState, useRef } from 'react';
import { Box, Stack, Typography, Paper, Button, IconButton, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { ComponentPage, Section, Showcase } from '../../components/shared';

interface UploadedFile {
  name: string;
  size: number;
  progress: number;
}

const FileUploadDemo: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const addFiles = (newFiles: File[]) => {
    const uploadedFiles = newFiles.map((file) => ({
      name: file.name,
      size: file.size,
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...uploadedFiles]);
    
    // Simulate upload progress
    uploadedFiles.forEach((_, index) => {
      const interval = setInterval(() => {
        setFiles((prev) => {
          const newFiles = [...prev];
          const fileIndex = prev.length - uploadedFiles.length + index;
          if (newFiles[fileIndex] && newFiles[fileIndex].progress < 100) {
            newFiles[fileIndex] = {
              ...newFiles[fileIndex],
              progress: Math.min(newFiles[fileIndex].progress + 10, 100),
            };
          }
          return newFiles;
        });
      }, 200);
      setTimeout(() => clearInterval(interval), 2200);
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Box>
      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files) addFiles(Array.from(e.target.files));
        }}
      />
      <Paper
        sx={{
          p: 4,
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'grey.300',
          bgcolor: isDragging ? 'action.hover' : 'background.paper',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Drag and drop files here
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          or click to browse
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Supports: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG (Max 10MB)
        </Typography>
      </Paper>

      {files.length > 0 && (
        <Stack spacing={1} sx={{ mt: 2 }}>
          {files.map((file, index) => (
            <Paper key={index} sx={{ p: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <InsertDriveFileIcon color="primary" />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2">{file.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatSize(file.size)}
                  </Typography>
                  {file.progress < 100 && (
                    <LinearProgress
                      variant="determinate"
                      value={file.progress}
                      sx={{ mt: 1 }}
                    />
                  )}
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFiles((prev) => prev.filter((_, i) => i !== index));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export const FileUploadPage: React.FC = () => {
  return (
    <ComponentPage
      title="File Upload"
      description="File upload components allow users to select and upload files from their device."
    >
      <Section title="Drag and Drop Upload">
        <FileUploadDemo />
      </Section>

      <Section title="Simple Upload Button">
        <Showcase>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload File
            <input type="file" hidden />
          </Button>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload File
            <input type="file" hidden />
          </Button>
        </Showcase>
      </Section>

      <Section title="Multiple Files">
        <Showcase>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload Multiple
            <input type="file" hidden multiple />
          </Button>
        </Showcase>
      </Section>
    </ComponentPage>
  );
};

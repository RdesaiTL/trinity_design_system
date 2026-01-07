import * as React from 'react';
import {
  Box,
  Paper,
  IconButton,
  Divider,
  Tooltip,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  alpha,
  useTheme,
  FormControl,
} from '@mui/material';
import {
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatUnderlined as UnderlineIcon,
  StrikethroughS as StrikeIcon,
  FormatListBulleted as BulletListIcon,
  FormatListNumbered as NumberListIcon,
  FormatQuote as QuoteIcon,
  Code as CodeIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  FormatAlignLeft as AlignLeftIcon,
  FormatAlignCenter as AlignCenterIcon,
  FormatAlignRight as AlignRightIcon,
  FormatAlignJustify as AlignJustifyIcon,
  FormatClear as ClearFormatIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
} from '@mui/icons-material';

// ============================================
// Types
// ============================================

export type HeadingLevel = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export interface RichTextEditorProps {
  /** Initial HTML content */
  value?: string;
  /** Callback when content changes */
  onChange?: (html: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Editor height */
  height?: number | string;
  /** Minimum height */
  minHeight?: number | string;
  /** Maximum height */
  maxHeight?: number | string;
  /** Read-only mode */
  readOnly?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Show toolbar */
  showToolbar?: boolean;
  /** Toolbar items to show */
  toolbarItems?: ToolbarItem[];
  /** Callback when image is inserted */
  onImageUpload?: (file: File) => Promise<string>;
  /** Callback when link is inserted */
  onLinkInsert?: (url: string, text: string) => void;
  /** Auto-focus on mount */
  autoFocus?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  sx?: Record<string, unknown>;
}

export type ToolbarItem =
  | 'heading'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'divider'
  | 'bulletList'
  | 'numberList'
  | 'quote'
  | 'code'
  | 'link'
  | 'image'
  | 'align'
  | 'undo'
  | 'redo'
  | 'clearFormat'
  | 'fullscreen';

const defaultToolbarItems: ToolbarItem[] = [
  'heading',
  'divider',
  'bold',
  'italic',
  'underline',
  'strike',
  'divider',
  'bulletList',
  'numberList',
  'quote',
  'code',
  'divider',
  'align',
  'divider',
  'link',
  'image',
  'divider',
  'undo',
  'redo',
  'clearFormat',
  'divider',
  'fullscreen',
];

// ============================================
// Toolbar Component
// ============================================

interface ToolbarProps {
  items: ToolbarItem[];
  formats: Set<string>;
  headingLevel: HeadingLevel;
  textAlign: TextAlign;
  onFormat: (format: string) => void;
  onHeadingChange: (level: HeadingLevel) => void;
  onAlignChange: (align: TextAlign) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClearFormat: () => void;
  onLinkInsert: () => void;
  onImageInsert: () => void;
  onFullscreen: () => void;
  isFullscreen: boolean;
  canUndo: boolean;
  canRedo: boolean;
  disabled: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  items,
  formats,
  headingLevel,
  textAlign,
  onFormat,
  onHeadingChange,
  onAlignChange,
  onUndo,
  onRedo,
  onClearFormat,
  onLinkInsert,
  onImageInsert,
  onFullscreen,
  isFullscreen,
  canUndo,
  canRedo,
  disabled,
}) => {
  const theme = useTheme();

  const renderItem = (item: ToolbarItem, index: number) => {
    switch (item) {
      case 'divider':
        return (
          <Divider
            key={`divider-${index}`}
            orientation="vertical"
            flexItem
            sx={{ mx: 0.5 }}
          />
        );

      case 'heading':
        return (
          <FormControl key="heading" size="small" sx={{ minWidth: 100, mr: 1 }}>
            <Select
              value={headingLevel}
              onChange={(e) => onHeadingChange(e.target.value as HeadingLevel)}
              disabled={disabled}
              sx={{
                '& .MuiSelect-select': {
                  py: 0.5,
                  fontSize: '0.875rem',
                },
              }}
            >
              <MenuItem value="p">Paragraph</MenuItem>
              <MenuItem value="h1">Heading 1</MenuItem>
              <MenuItem value="h2">Heading 2</MenuItem>
              <MenuItem value="h3">Heading 3</MenuItem>
              <MenuItem value="h4">Heading 4</MenuItem>
              <MenuItem value="h5">Heading 5</MenuItem>
              <MenuItem value="h6">Heading 6</MenuItem>
            </Select>
          </FormControl>
        );

      case 'bold':
        return (
          <Tooltip key="bold" title="Bold (Ctrl+B)">
            <ToggleButton
              value="bold"
              selected={formats.has('bold')}
              onChange={() => onFormat('bold')}
              disabled={disabled}
              size="small"
            >
              <BoldIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
        );

      case 'italic':
        return (
          <Tooltip key="italic" title="Italic (Ctrl+I)">
            <ToggleButton
              value="italic"
              selected={formats.has('italic')}
              onChange={() => onFormat('italic')}
              disabled={disabled}
              size="small"
            >
              <ItalicIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
        );

      case 'underline':
        return (
          <Tooltip key="underline" title="Underline (Ctrl+U)">
            <ToggleButton
              value="underline"
              selected={formats.has('underline')}
              onChange={() => onFormat('underline')}
              disabled={disabled}
              size="small"
            >
              <UnderlineIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
        );

      case 'strike':
        return (
          <Tooltip key="strike" title="Strikethrough">
            <ToggleButton
              value="strikeThrough"
              selected={formats.has('strikeThrough')}
              onChange={() => onFormat('strikeThrough')}
              disabled={disabled}
              size="small"
            >
              <StrikeIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
        );

      case 'bulletList':
        return (
          <Tooltip key="bulletList" title="Bullet List">
            <ToggleButton
              value="insertUnorderedList"
              selected={formats.has('insertUnorderedList')}
              onChange={() => onFormat('insertUnorderedList')}
              disabled={disabled}
              size="small"
            >
              <BulletListIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
        );

      case 'numberList':
        return (
          <Tooltip key="numberList" title="Numbered List">
            <ToggleButton
              value="insertOrderedList"
              selected={formats.has('insertOrderedList')}
              onChange={() => onFormat('insertOrderedList')}
              disabled={disabled}
              size="small"
            >
              <NumberListIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
        );

      case 'quote':
        return (
          <Tooltip key="quote" title="Block Quote">
            <IconButton
              onClick={() => onFormat('formatBlock')}
              disabled={disabled}
              size="small"
            >
              <QuoteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );

      case 'code':
        return (
          <Tooltip key="code" title="Code Block">
            <IconButton
              onClick={() => onFormat('code')}
              disabled={disabled}
              size="small"
            >
              <CodeIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );

      case 'link':
        return (
          <Tooltip key="link" title="Insert Link">
            <IconButton
              onClick={onLinkInsert}
              disabled={disabled}
              size="small"
            >
              <LinkIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );

      case 'image':
        return (
          <Tooltip key="image" title="Insert Image">
            <IconButton
              onClick={onImageInsert}
              disabled={disabled}
              size="small"
            >
              <ImageIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );

      case 'align':
        return (
          <ToggleButtonGroup
            key="align"
            value={textAlign}
            exclusive
            onChange={(_, newAlign) => newAlign && onAlignChange(newAlign)}
            size="small"
            disabled={disabled}
          >
            <ToggleButton value="left">
              <Tooltip title="Align Left">
                <AlignLeftIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="center">
              <Tooltip title="Align Center">
                <AlignCenterIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="right">
              <Tooltip title="Align Right">
                <AlignRightIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="justify">
              <Tooltip title="Justify">
                <AlignJustifyIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        );

      case 'undo':
        return (
          <Tooltip key="undo" title="Undo (Ctrl+Z)">
            <span>
              <IconButton
                onClick={onUndo}
                disabled={disabled || !canUndo}
                size="small"
              >
                <UndoIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        );

      case 'redo':
        return (
          <Tooltip key="redo" title="Redo (Ctrl+Y)">
            <span>
              <IconButton
                onClick={onRedo}
                disabled={disabled || !canRedo}
                size="small"
              >
                <RedoIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        );

      case 'clearFormat':
        return (
          <Tooltip key="clearFormat" title="Clear Formatting">
            <IconButton
              onClick={onClearFormat}
              disabled={disabled}
              size="small"
            >
              <ClearFormatIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );

      case 'fullscreen':
        return (
          <Tooltip key="fullscreen" title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
            <IconButton
              onClick={onFullscreen}
              disabled={disabled}
              size="small"
            >
              {isFullscreen ? (
                <FullscreenExitIcon fontSize="small" />
              ) : (
                <FullscreenIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1,
        py: 0.5,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: alpha(theme.palette.background.default, 0.5),
        flexWrap: 'wrap',
        '& .MuiToggleButton-root': {
          border: 'none',
          borderRadius: 1,
          p: 0.5,
        },
        '& .MuiIconButton-root': {
          p: 0.5,
        },
      }}
    >
      {items.map((item, index) => renderItem(item, index))}
    </Box>
  );
};

// ============================================
// RichTextEditor Component
// ============================================

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = '',
  onChange,
  placeholder = 'Start typing...',
  height = 300,
  minHeight = 150,
  maxHeight,
  readOnly = false,
  disabled = false,
  showToolbar = true,
  toolbarItems = defaultToolbarItems,
  onImageUpload,
  autoFocus = false,
  className,
  sx,
}) => {
  const theme = useTheme();
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [formats, setFormats] = React.useState<Set<string>>(new Set());
  const [headingLevel, setHeadingLevel] = React.useState<HeadingLevel>('p');
  const [textAlign, setTextAlign] = React.useState<TextAlign>('left');
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [canUndo, setCanUndo] = React.useState(false);
  const [canRedo, setCanRedo] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Initialize content
  React.useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Auto-focus
  React.useEffect(() => {
    if (autoFocus && editorRef.current) {
      editorRef.current.focus();
    }
  }, [autoFocus]);

  // Update active formats on selection change
  const updateActiveFormats = React.useCallback(() => {
    const newFormats = new Set<string>();

    if (document.queryCommandState('bold')) newFormats.add('bold');
    if (document.queryCommandState('italic')) newFormats.add('italic');
    if (document.queryCommandState('underline')) newFormats.add('underline');
    if (document.queryCommandState('strikeThrough')) newFormats.add('strikeThrough');
    if (document.queryCommandState('insertUnorderedList')) newFormats.add('insertUnorderedList');
    if (document.queryCommandState('insertOrderedList')) newFormats.add('insertOrderedList');

    setFormats(newFormats);

    // Update heading level
    const block = document.queryCommandValue('formatBlock');
    if (block && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].includes(block.toLowerCase())) {
      setHeadingLevel(block.toLowerCase() as HeadingLevel);
    }

    // Update alignment
    if (document.queryCommandState('justifyLeft')) setTextAlign('left');
    else if (document.queryCommandState('justifyCenter')) setTextAlign('center');
    else if (document.queryCommandState('justifyRight')) setTextAlign('right');
    else if (document.queryCommandState('justifyFull')) setTextAlign('justify');
  }, []);

  // Handle content change
  const handleInput = React.useCallback(() => {
    if (editorRef.current) {
      onChange?.(editorRef.current.innerHTML);
      updateActiveFormats();
    }
  }, [onChange, updateActiveFormats]);

  // Handle format command
  const handleFormat = React.useCallback((command: string) => {
    if (command === 'code') {
      document.execCommand('formatBlock', false, 'pre');
    } else if (command === 'formatBlock') {
      document.execCommand('formatBlock', false, 'blockquote');
    } else {
      document.execCommand(command, false);
    }
    updateActiveFormats();
    editorRef.current?.focus();
  }, [updateActiveFormats]);

  // Handle heading change
  const handleHeadingChange = React.useCallback((level: HeadingLevel) => {
    document.execCommand('formatBlock', false, level);
    setHeadingLevel(level);
    editorRef.current?.focus();
  }, []);

  // Handle alignment change
  const handleAlignChange = React.useCallback((align: TextAlign) => {
    const commands: Record<TextAlign, string> = {
      left: 'justifyLeft',
      center: 'justifyCenter',
      right: 'justifyRight',
      justify: 'justifyFull',
    };
    document.execCommand(commands[align], false);
    setTextAlign(align);
    editorRef.current?.focus();
  }, []);

  // Handle undo/redo
  const handleUndo = () => document.execCommand('undo');
  const handleRedo = () => document.execCommand('redo');

  // Handle clear formatting
  const handleClearFormat = () => {
    document.execCommand('removeFormat');
    updateActiveFormats();
  };

  // Handle link insert
  const handleLinkInsert = React.useCallback(() => {
    const url = window.prompt('Enter URL:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
    editorRef.current?.focus();
  }, []);

  // Handle image insert
  const handleImageInsert = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = React.useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let url: string;
    if (onImageUpload) {
      url = await onImageUpload(file);
    } else {
      // Create object URL as fallback
      url = URL.createObjectURL(file);
    }

    document.execCommand('insertImage', false, url);
    e.target.value = '';
    editorRef.current?.focus();
  }, [onImageUpload]);

  // Handle fullscreen toggle
  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          handleFormat('bold');
          break;
        case 'i':
          e.preventDefault();
          handleFormat('italic');
          break;
        case 'u':
          e.preventDefault();
          handleFormat('underline');
          break;
        case 'z':
          if (e.shiftKey) {
            e.preventDefault();
            handleRedo();
          }
          break;
      }
    }
  }, [handleFormat]);

  // Update undo/redo state
  React.useEffect(() => {
    const checkUndoRedo = () => {
      setCanUndo(document.queryCommandEnabled('undo'));
      setCanRedo(document.queryCommandEnabled('redo'));
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener('input', checkUndoRedo);
      return () => editor.removeEventListener('input', checkUndoRedo);
    }
  }, []);

  return (
    <Paper
      className={className}
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...(isFullscreen && {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: theme.zIndex.modal,
          borderRadius: 0,
        }),
        ...sx,
      }}
    >
      {/* Toolbar */}
      {showToolbar && !readOnly && (
        <Toolbar
          items={toolbarItems}
          formats={formats}
          headingLevel={headingLevel}
          textAlign={textAlign}
          onFormat={handleFormat}
          onHeadingChange={handleHeadingChange}
          onAlignChange={handleAlignChange}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onClearFormat={handleClearFormat}
          onLinkInsert={handleLinkInsert}
          onImageInsert={handleImageInsert}
          onFullscreen={handleFullscreen}
          isFullscreen={isFullscreen}
          canUndo={canUndo}
          canRedo={canRedo}
          disabled={disabled}
        />
      )}

      {/* Editor */}
      <Box
        ref={editorRef}
        contentEditable={!readOnly && !disabled}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onSelect={updateActiveFormats}
        sx={{
          flex: 1,
          p: 2,
          overflow: 'auto',
          outline: 'none',
          height: isFullscreen ? 'auto' : height,
          minHeight: isFullscreen ? 'auto' : minHeight,
          maxHeight: isFullscreen ? 'none' : maxHeight,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body1.fontSize,
          lineHeight: 1.6,
          color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
          cursor: disabled ? 'not-allowed' : 'text',
          '&:empty::before': {
            content: `"${placeholder}"`,
            color: theme.palette.text.secondary,
            fontStyle: 'italic',
          },
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            marginTop: 0,
            marginBottom: '0.5em',
            fontWeight: 600,
          },
          '& h1': { fontSize: '2em' },
          '& h2': { fontSize: '1.5em' },
          '& h3': { fontSize: '1.25em' },
          '& h4': { fontSize: '1em' },
          '& p': { marginBottom: '1em' },
          '& ul, & ol': {
            paddingLeft: '1.5em',
            marginBottom: '1em',
          },
          '& blockquote': {
            borderLeft: `4px solid ${theme.palette.divider}`,
            paddingLeft: 2,
            marginLeft: 0,
            color: theme.palette.text.secondary,
            fontStyle: 'italic',
          },
          '& pre': {
            backgroundColor: alpha(theme.palette.text.primary, 0.05),
            padding: 2,
            borderRadius: 1,
            fontFamily: 'monospace',
            overflow: 'auto',
          },
          '& a': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 1,
          },
        }}
        suppressContentEditableWarning
      />

      {/* Hidden file input for images */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </Paper>
  );
};

export default RichTextEditor;

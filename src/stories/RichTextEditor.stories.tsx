import type { Meta, StoryObj } from '@storybook/react';
import { RichTextEditor } from '../components/RichTextEditor';
import { Box, Typography, Button, Paper } from '@mui/material';
import React from 'react';

const meta: Meta<typeof RichTextEditor> = {
  title: 'Components/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A WYSIWYG rich text editor with a customizable toolbar. Supports formatting, headings, lists, alignment, links, images, and fullscreen mode.',
      },
    },
  },
  argTypes: {
    minHeight: {
      control: { type: 'number', min: 100, max: 800 },
    },
    maxHeight: {
      control: { type: 'number', min: 200, max: 1000 },
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleContent = `<h2>Welcome to the Editor</h2>
<p>This is a <strong>rich text editor</strong> with various formatting options.</p>
<p>You can create <em>italic text</em>, <u>underlined text</u>, and <s>strikethrough text</s>.</p>
<h3>Lists</h3>
<ul>
  <li>Unordered list item 1</li>
  <li>Unordered list item 2</li>
</ul>
<ol>
  <li>Ordered list item 1</li>
  <li>Ordered list item 2</li>
</ol>
<p>You can also add <a href="https://example.com">links</a> and <code>inline code</code>.</p>`;

export const Default: Story = {
  args: {
    placeholder: 'Start writing...',
    minHeight: 200,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 800 }}>
        <Story />
      </Box>
    ),
  ],
};

export const WithInitialContent: Story = {
  args: {
    value: sampleContent,
    minHeight: 300,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 800 }}>
        <Story />
      </Box>
    ),
  ],
};

export const MinimalToolbar: Story = {
  args: {
    toolbar: ['bold', 'italic', 'underline', 'separator', 'link'],
    placeholder: 'Basic formatting only...',
    minHeight: 150,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 600 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'A minimal toolbar with only essential formatting options.',
      },
    },
  },
};

export const FullToolbar: Story = {
  args: {
    toolbar: [
      'heading',
      'separator',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'separator',
      'bulletList',
      'orderedList',
      'separator',
      'alignLeft',
      'alignCenter',
      'alignRight',
      'alignJustify',
      'separator',
      'link',
      'image',
      'code',
      'quote',
      'separator',
      'undo',
      'redo',
      'separator',
      'fullscreen',
    ],
    minHeight: 350,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 900 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Full toolbar with all available formatting options.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a detailed description...',
    minHeight: 200,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 700 }}>
        <Story />
      </Box>
    ),
  ],
};

export const WithHelperText: Story = {
  args: {
    label: 'Article Content',
    helperText: 'You can use the toolbar to format your text',
    placeholder: 'Write your article...',
    minHeight: 250,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 700 }}>
        <Story />
      </Box>
    ),
  ],
};

export const WithError: Story = {
  args: {
    label: 'Required Field',
    error: true,
    errorMessage: 'This field is required',
    placeholder: 'Enter content...',
    minHeight: 150,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 600 }}>
        <Story />
      </Box>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    value: '<p>This editor is disabled.</p>',
    disabled: true,
    minHeight: 150,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 600 }}>
        <Story />
      </Box>
    ),
  ],
};

export const ReadOnly: Story = {
  args: {
    value: sampleContent,
    readOnly: true,
    minHeight: 300,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 700 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Read-only mode hides the toolbar and prevents editing.',
      },
    },
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    maxLength: 500,
    showCharacterCount: true,
    minHeight: 200,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 600 }}>
        <Story />
      </Box>
    ),
  ],
};

export const ControlledComponent: Story = {
  render: () => {
    const [value, setValue] = React.useState('<p>Edit this text...</p>');

    return (
      <Box sx={{ maxWidth: 700 }}>
        <RichTextEditor
          label="Controlled Editor"
          value={value}
          onChange={setValue}
          minHeight={200}
        />
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setValue('')}
          >
            Clear
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setValue('<p><strong>Reset</strong> to default content.</p>')}
          >
            Reset
          </Button>
        </Box>
        <Paper sx={{ mt: 2, p: 2, bgcolor: 'grey.100' }}>
          <Typography variant="caption" color="text.secondary" component="div">
            Raw HTML:
          </Typography>
          <Typography variant="body2" component="pre" sx={{ fontSize: 11, overflow: 'auto' }}>
            {value}
          </Typography>
        </Paper>
      </Box>
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      title: '',
      content: '',
    });
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <Box sx={{ maxWidth: 700 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Title
              </Typography>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter article title..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid #e0e0e0',
                  fontSize: 14,
                }}
              />
            </Box>
            <RichTextEditor
              label="Content"
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Write your article..."
              minHeight={250}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button type="submit" variant="contained">
                Publish
              </Button>
              <Button type="button" variant="outlined" onClick={() => setFormData({ title: '', content: '' })}>
                Clear
              </Button>
            </Box>
          </Box>
        </form>
        {submitted && (
          <Paper sx={{ mt: 3, p: 2, bgcolor: 'success.50' }}>
            <Typography variant="subtitle2" color="success.main" gutterBottom>
              Form Submitted!
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Title:</strong> {formData.title}
            </Typography>
            <Typography variant="body2">
              <strong>Content length:</strong> {formData.content.length} characters
            </Typography>
          </Paper>
        )}
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing integration with a form.',
      },
    },
  },
};

export const CompactEditor: Story = {
  args: {
    toolbar: ['bold', 'italic', 'link'],
    placeholder: 'Add a comment...',
    minHeight: 80,
    maxHeight: 200,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 500 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'A compact editor suitable for comments or short inputs.',
      },
    },
  },
};

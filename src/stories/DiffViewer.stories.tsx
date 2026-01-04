import type { Meta, StoryObj } from '@storybook/react';
import { DiffViewer } from '../components/DiffViewer';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ViewColumn, ViewStream } from '@mui/icons-material';
import React from 'react';

const meta: Meta<typeof DiffViewer> = {
  title: 'Components/DiffViewer',
  component: DiffViewer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A code/text diff viewer component with side-by-side and unified view modes. Supports syntax highlighting, line numbers, and custom styling.',
      },
    },
  },
  argTypes: {
    viewMode: {
      control: 'select',
      options: ['side-by-side', 'unified'],
    },
    showLineNumbers: {
      control: 'boolean',
    },
    wordWrap: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample code for demos
const originalCode = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

function formatPrice(price) {
  return '$' + price.toFixed(2);
}`;

const modifiedCode = `function calculateTotal(items) {
  // Use reduce for cleaner code
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

function formatPrice(price, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
}`;

const simpleOriginal = `Hello World
This is a test
Goodbye World`;

const simpleModified = `Hello World
This is a modified test
This is a new line
Goodbye World`;

const configOriginal = `{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^17.0.0",
    "lodash": "^4.17.0"
  }
}`;

const configModified = `{
  "name": "my-app",
  "version": "2.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "lodash": "^4.17.21",
    "@mui/material": "^5.14.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}`;

export const Default: Story = {
  args: {
    original: originalCode,
    modified: modifiedCode,
    viewMode: 'side-by-side',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 1000 }}>
        <Story />
      </Box>
    ),
  ],
};

export const UnifiedView: Story = {
  args: {
    original: originalCode,
    modified: modifiedCode,
    viewMode: 'unified',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 800 }}>
        <Story />
      </Box>
    ),
  ],
};

export const SimpleTextDiff: Story = {
  args: {
    original: simpleOriginal,
    modified: simpleModified,
    viewMode: 'side-by-side',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 800 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Simple text diff showing added and removed lines.',
      },
    },
  },
};

export const WithTitles: Story = {
  args: {
    original: originalCode,
    modified: modifiedCode,
    originalTitle: 'Before (v1.0)',
    modifiedTitle: 'After (v2.0)',
    viewMode: 'side-by-side',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 1000 }}>
        <Story />
      </Box>
    ),
  ],
};

export const JSONDiff: Story = {
  args: {
    original: configOriginal,
    modified: configModified,
    originalTitle: 'package.json (old)',
    modifiedTitle: 'package.json (new)',
    language: 'json',
    viewMode: 'side-by-side',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 900 }}>
        <Story />
      </Box>
    ),
  ],
};

export const NoLineNumbers: Story = {
  args: {
    original: simpleOriginal,
    modified: simpleModified,
    showLineNumbers: false,
    viewMode: 'unified',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 600 }}>
        <Story />
      </Box>
    ),
  ],
};

export const WordWrap: Story = {
  args: {
    original: `This is a very long line of text that should wrap when word wrap is enabled. It contains many words to demonstrate the wrapping behavior of the diff viewer component.`,
    modified: `This is a modified long line of text that should wrap when word wrap is enabled. It has been changed slightly to show the diff highlighting on wrapped text.`,
    wordWrap: true,
    viewMode: 'side-by-side',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 800 }}>
        <Story />
      </Box>
    ),
  ],
};

export const InteractiveViewToggle: Story = {
  render: () => {
    const [viewMode, setViewMode] = React.useState<'side-by-side' | 'unified'>('side-by-side');

    return (
      <Box sx={{ maxWidth: 1000 }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, value) => value && setViewMode(value)}
            size="small"
          >
            <ToggleButton value="side-by-side">
              <ViewColumn fontSize="small" sx={{ mr: 0.5 }} />
              Side by Side
            </ToggleButton>
            <ToggleButton value="unified">
              <ViewStream fontSize="small" sx={{ mr: 0.5 }} />
              Unified
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <DiffViewer
          original={originalCode}
          modified={modifiedCode}
          viewMode={viewMode}
          originalTitle="Original"
          modifiedTitle="Modified"
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle between side-by-side and unified view modes.',
      },
    },
  },
};

export const NoDifferences: Story = {
  args: {
    original: simpleOriginal,
    modified: simpleOriginal,
    originalTitle: 'File A',
    modifiedTitle: 'File B',
    viewMode: 'side-by-side',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 800 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'When files are identical, no differences are highlighted.',
      },
    },
  },
};

export const LargeDiff: Story = {
  render: () => {
    // Generate larger code samples
    const generateCode = (prefix: string, count: number) => {
      return Array.from({ length: count }, (_, i) => 
        `${prefix} line ${i + 1}: const value${i + 1} = ${Math.random().toFixed(4)};`
      ).join('\n');
    };

    const original = generateCode('// Original', 50);
    const modified = original
      .split('\n')
      .map((line, i) => i % 5 === 0 ? line.replace('Original', 'Modified') : line)
      .join('\n');

    return (
      <Box sx={{ maxWidth: 1000 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Large diff with 50 lines (every 5th line modified)
        </Typography>
        <DiffViewer
          original={original}
          modified={modified}
          viewMode="side-by-side"
          originalTitle="original.js"
          modifiedTitle="modified.js"
        />
      </Box>
    );
  },
};

export const PullRequestStyle: Story = {
  render: () => (
    <Box sx={{ maxWidth: 1000 }}>
      <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="subtitle2">
          Pull Request #42: Refactor calculateTotal function
        </Typography>
        <Typography variant="body2" color="text.secondary">
          2 files changed, 12 additions, 8 deletions
        </Typography>
      </Box>
      <DiffViewer
        original={originalCode}
        modified={modifiedCode}
        originalTitle="src/utils/price.js"
        modifiedTitle="src/utils/price.js"
        viewMode="unified"
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example styled like a GitHub pull request diff view.',
      },
    },
  },
};

export const EmptyComparison: Story = {
  args: {
    original: '',
    modified: `// New file
export function newFunction() {
  return 'Hello, World!';
}`,
    originalTitle: '(empty)',
    modifiedTitle: 'newFile.js',
    viewMode: 'unified',
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
        story: 'Comparing an empty file with a new file (all additions).',
      },
    },
  },
};

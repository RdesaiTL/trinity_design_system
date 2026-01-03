/**
 * Commitlint Configuration
 * 
 * Enforces Conventional Commits format for automated changelog generation.
 * @see https://commitlint.js.org/
 * @see https://www.conventionalcommits.org/
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allowed commit types
    'type-enum': [
      2, // Error level
      'always',
      [
        'feat',      // New feature
        'fix',       // Bug fix
        'docs',      // Documentation only
        'style',     // Formatting, no code change
        'refactor',  // Code change without feat/fix
        'perf',      // Performance improvement
        'test',      // Adding/updating tests
        'chore',     // Maintenance tasks
        'revert',    // Reverting commits
        'deprecate', // Deprecation notices
        'ci',        // CI/CD changes
        'build',     // Build system changes
      ],
    ],

    // Component/system scopes (warning, not error to allow new scopes)
    'scope-enum': [
      1, // Warning level
      'always',
      [
        // Core systems
        'tokens',
        'theme',
        'a11y',
        'hooks',
        
        // Component categories
        'AI',
        'Charts',
        'DataTable',
        'navigation',
        
        // Individual components
        'Accordion',
        'Alert',
        'Autocomplete',
        'Avatar',
        'Badge',
        'Breadcrumbs',
        'Button',
        'Card',
        'Chip',
        'DateTime',
        'FileUpload',
        'Grid',
        'Icon',
        'IllustratedMessage',
        'Layout',
        'Loader',
        'Menu',
        'Modal',
        'PageHeader',
        'Progress',
        'Rating',
        'Select',
        'Skeleton',
        'Slider',
        'StatusIndicator',
        'Switch',
        'Tabs',
        'TextField',
        'Toast',
        'Tooltip',
        'TopNavHeader',
        'TopNavWithSidebar',
        'Typography',
        
        // Infrastructure
        'deps',
        'storybook',
        'build',
        'ci',
        'release',
        'config',
      ],
    ],

    // Subject (description) rules
    'subject-case': [
      2,
      'always',
      ['lower-case', 'sentence-case'], // Allow both
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],

    // Type rules
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],

    // Body rules
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [1, 'always', 100], // Warning at 100 chars

    // Footer rules
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [1, 'always', 100],
  },

  // Custom prompt configuration for interactive commits
  prompt: {
    questions: {
      type: {
        description: "Select the type of change you're committing",
        enum: {
          feat: {
            description: 'A new feature',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'A bug fix',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: 'Changes that do not affect the meaning of the code',
            title: 'Styles',
            emoji: '💄',
          },
          refactor: {
            description: 'A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
            emoji: '♻️',
          },
          perf: {
            description: 'A code change that improves performance',
            title: 'Performance Improvements',
            emoji: '⚡',
          },
          test: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '✅',
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: 'Chores',
            emoji: '🔧',
          },
          deprecate: {
            description: 'Deprecating existing functionality',
            title: 'Deprecations',
            emoji: '⚠️',
          },
          revert: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
            emoji: '⏪',
          },
        },
      },
      scope: {
        description: 'What is the scope of this change (e.g., component name)',
      },
      subject: {
        description: 'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the change (optional)',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description: 'Describe the breaking changes',
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issues: {
        description: 'Add issue references (e.g., "Fixes #123")',
      },
    },
  },
};

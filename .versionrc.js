/**
 * Standard Version Configuration
 * 
 * Controls automated changelog generation and version bumping.
 * @see https://github.com/conventional-changelog/standard-version
 */
module.exports = {
  // Changelog section headers with emojis
  types: [
    { type: 'feat', section: '✨ Features' },
    { type: 'fix', section: '🐛 Bug Fixes' },
    { type: 'perf', section: '⚡ Performance' },
    { type: 'deprecate', section: '⚠️ Deprecations' },
    { type: 'docs', section: '📚 Documentation', hidden: false },
    { type: 'style', section: '💄 Styling', hidden: true },
    { type: 'refactor', section: '♻️ Refactoring', hidden: true },
    { type: 'test', section: '✅ Tests', hidden: true },
    { type: 'build', section: '🏗️ Build', hidden: true },
    { type: 'ci', section: '👷 CI/CD', hidden: true },
    { type: 'chore', section: '🔧 Maintenance', hidden: true },
    { type: 'revert', section: '⏪ Reverts', hidden: false },
  ],

  // URL templates for GitHub
  commitUrlFormat: 'https://github.com/your-org/trinity-design-system/commit/{{hash}}',
  compareUrlFormat: 'https://github.com/your-org/trinity-design-system/compare/{{previousTag}}...{{currentTag}}',
  issueUrlFormat: 'https://github.com/your-org/trinity-design-system/issues/{{id}}',
  userUrlFormat: 'https://github.com/{{user}}',

  // Release commit message
  releaseCommitMessageFormat: 'chore(release): {{currentTag}}',

  // Tag prefix (empty for v1.0.0 style)
  tagPrefix: 'v',

  // Files to bump version in
  bumpFiles: [
    {
      filename: 'package.json',
      type: 'json',
    },
    {
      filename: 'package-lock.json',
      type: 'json',
    },
  ],

  // Package files to read version from
  packageFiles: ['package.json'],

  // Skip certain lifecycle steps
  skip: {
    // Uncomment to skip steps during testing
    // bump: false,
    // changelog: false,
    // commit: false,
    // tag: false,
  },

  // Scripts to run at lifecycle points
  scripts: {
    // Run before version bump
    prerelease: 'npm run typecheck && npm run lint && npm test',
    // Run after changelog is generated
    postchangelog: 'npm run format:changelog || true',
    // Run after everything
    // postrelease: 'npm run notify-slack',
  },

  // Header for the changelog
  header: `# Changelog

All notable changes to the Trinity Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`,

  // Preset configuration
  preset: {
    name: 'conventionalcommits',
    types: [
      { type: 'feat', section: '✨ Features' },
      { type: 'fix', section: '🐛 Bug Fixes' },
      { type: 'perf', section: '⚡ Performance' },
      { type: 'deprecate', section: '⚠️ Deprecations' },
      { type: 'docs', section: '📚 Documentation' },
      { type: 'revert', section: '⏪ Reverts' },
    ],
  },
};

import { fixupPluginRules } from '@eslint/compat'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import stylisticJsx from '@stylistic/eslint-plugin-jsx'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import preferArrow from 'eslint-plugin-prefer-arrow'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

/**
 * @typedef {import('eslint').Linter.FlatConfig} FlatConfig
 */

/**
 * Create the ESLint config for React + TypeScript projects
 * @param {Object} [options] - Configuration options
 * @param {boolean} [options.typescript=true] - Enable TypeScript rules
 * @param {boolean} [options.react=true] - Enable React rules
 * @returns {FlatConfig[]} The ESLint configuration
 */
const createConfig = ({ typescript = true, react: useReact = true }) => {
  /**
   * Plugins Registration
   * Register all plugins with proper fixups for compatibility.
   */
  const plugins = {
    '@stylistic': stylistic,
    '@stylistic/jsx': stylisticJsx,
    '@stylistic/ts': stylisticTs,
    '@typescript-eslint': fixupPluginRules(typescriptEslint),
    'prefer-arrow': preferArrow,
    react: fixupPluginRules(react),
    'sort-imports': importPlugin,
    'unused-imports': unusedImports
  }

  const rules = {}

  /**
  * Merges configuration objects by combining their plugins and rules
  * @param {Array<Object>} configs - Array of configuration objects to merge from
  * @param {Array<string>} [properties=['plugins', 'rules']] - Properties to merge
  */
  const mergeConfigs = (configs, properties = [ 'plugins', 'rules' ]) => {
    const target = { plugins, rules }
    for (const config of configs) {
      for (const prop of properties) {
        if (config[prop]) {
          target[prop] = target[prop] || {}
          Object.assign(target[prop], config[prop])
        }
      }
    }
  }

  mergeConfigs([ js.configs.recommended ])

  // Add React configs if enabled
  if (useReact) {
    mergeConfigs([
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs['recommended-latest']
    ])
  }

  // Add TypeScript configs if enabled
  if (typescript) {
    mergeConfigs(tseslint.config(
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked
    ))
  }

  // Add our custom configuration
  return {
    plugins,

    /**
     * Custom Rules Configuration
     * Rules are organized by category for improved maintainability.
     */
    rules: {
      ...rules,

      /**
       * React Specific Rules
       */
      'react/prop-types': 'off', // TypeScript handles prop validation

      /**
       * TypeScript Rules
       */
      '@typescript-eslint/no-unused-vars': 'off', // We use unused-imports plugin instead
      '@typescript-eslint/array-type': [ 'error', { default: 'generic' } ], // Prefer Array<T> over T[]

      /**
       * Import and Module Organization
       */
      // Prevent relative imports using dot notation
      'no-restricted-imports': [ 'error', { patterns: [ '.*' ] } ],

      // Remove unused imports automatically
      'unused-imports/no-unused-imports': 'error',

      // Handle unused variables with customizable patterns for ignoring
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_', // Variables starting with underscore are ignored
          args: 'after-used',
          argsIgnorePattern: '^_' // Function args starting with underscore are ignored
        }
      ],

      // Organize imports with consistent grouping and alphabetization
      'sort-imports/order': [
        'error',
        {
          groups: [ 'builtin', 'external', 'internal', 'parent', 'sibling', 'index' ],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always' // Add empty lines between import groups
        }
      ],

      // Disable the core sort-imports to avoid conflicts with our custom sorter
      'sort-imports': 'off',

      /**
       * Function Style Rules
       */
      // Prefer arrow functions where appropriate
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true, // Don't use arrow functions for object prototype methods
          singleReturnOnly: false, // Use arrow functions even for multi-statement functions
          classPropertiesAllowed: false // Don't use arrow functions for class properties
        }
      ],

      // Encourage arrow callbacks for function expressions passed as arguments
      'prefer-arrow-callback': [ 'error', { allowNamedFunctions: true } ],

      // Use function expressions rather than declarations
      'func-style': [ 'error', 'expression', { allowArrowFunctions: true } ],

      /**
       * Code Quality Rules
       */
      // Prevent implicit type coercion for clearer code intentions
      'no-implicit-coercion': [
        'error',
        {
          boolean: true, // Prevent implicit boolean conversions like !!foo
          number: true, // Prevent implicit number conversions like +foo
          string: true, // Prevent implicit string conversions like '' + foo
          allow: [] // No exceptions
        }
      ],

      /**
       * JSX Formatting Rules
       */
      // Enforce PascalCase for JSX components
      '@stylistic/jsx/jsx-pascal-case': [ 'error', {} ],

      // Control expressions within JSX
      '@stylistic/jsx/jsx-one-expression-per-line': [ 'error', { allow: 'single-line' } ],

      // Tag positioning rules
      '@stylistic/jsx/jsx-closing-bracket-location': [ 1, 'line-aligned' ],
      '@stylistic/jsx/jsx-closing-tag-location': [ 'error', 'line-aligned' ],

      // Spacing within JSX
      '@stylistic/jsx/jsx-curly-spacing': [ 2, 'never' ],
      '@stylistic/jsx/jsx-equals-spacing': [ 2, 'never' ],
      '@stylistic/jsx-quotes': [ 'error', 'prefer-single' ],

      // Tag and attribute spacing
      '@stylistic/jsx/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'allow'
        }
      ],

      // JSX prop formatting
      '@stylistic/jsx/jsx-first-prop-new-line': [ 'error', 'multiprop' ],
      '@stylistic/jsx/jsx-max-props-per-line': [ 1, { maximum: 1, when: 'always' } ],
      '@stylistic/jsx/jsx-props-no-multi-spaces': 'error',

      // JSX indentation
      '@stylistic/jsx/jsx-indent-props': [ 2, 2 ],
      '@stylistic/jsx/jsx-indent': [ 'error', 2 ],

      /**
       * General Formatting Rules
       */
      // Ternary expression formatting
      '@stylistic/multiline-ternary': [ 'error', 'always-multiline' ],

      // Type spacing
      '@stylistic/type-generic-spacing': [ 'error' ],

      // Line length limits
      '@stylistic/max-len': [
        'error',
        {
          code: 100, // Maximum line length
          tabWidth: 2,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true
        }
      ],

      // Spacing around arrows
      '@stylistic/arrow-spacing': 'error',

      // Function call formatting
      '@stylistic/function-call-argument-newline': [ 'error', 'consistent' ],
      '@stylistic/function-paren-newline': [ 'error', 'consistent' ],

      /**
       * TypeScript-specific Formatting Rules
       */
      // Function call spacing
      '@stylistic/ts/function-call-spacing': [ 'error', 'never' ],

      // Block and brace formatting
      '@stylistic/ts/block-spacing': 'error',
      '@stylistic/ts/brace-style': [ 'error', '1tbs' ],

      // Comma formatting
      '@stylistic/ts/comma-dangle': [ 'error', 'never' ],
      '@stylistic/ts/comma-spacing': [ 'error', { before: false, after: true } ],

      // Keyword spacing
      '@stylistic/ts/keyword-spacing': [ 'error', { before: true } ],

      // Object literal formatting
      '@stylistic/ts/object-curly-spacing': [ 'error', 'always' ],
      '@stylistic/ts/object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, consistent: true },
          ObjectPattern: { multiline: true },
          ImportDeclaration: 'never'
        }
      ],
      '@stylistic/object-property-newline': [ 'error', { 'allowAllPropertiesOnSameLine': true } ],

      // Basic code style
      '@stylistic/ts/indent': [ 'error', 2 ],
      '@stylistic/ts/quotes': [ 'error', 'single' ],
      '@stylistic/ts/semi': [ 'error', 'never' ],

      // Type annotation spacing
      '@stylistic/ts/type-annotation-spacing': 'error',

      /**
       * Additional Stylistic Rules
       */
      // Limit statements per line
      '@stylistic/max-statements-per-line': [ 'error', { max: 1 } ],

      // Constructor formatting
      '@stylistic/new-parens': 'error',

      // Space management
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1, // Maximum one empty line within code
          maxEOF: 0, // No empty lines at end of file
          maxBOF: 0 // No empty lines at beginning of file
        }
      ],

      // Statement formatting
      '@stylistic/nonblock-statement-body-position': [ 'error', 'beside' ],

      // Array formatting
      '@stylistic/array-bracket-newline': [ 'error', 'consistent' ],
      '@stylistic/array-bracket-spacing': [ 'error', 'always' ],
      '@stylistic/array-element-newline': [ 'error', 'consistent' ],

      // Whitespace management
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-whitespace-before-property': 'error',

      // Line endings
      '@stylistic/linebreak-style': [ 'error', 'unix' ],

      // Comment formatting
      '@stylistic/spaced-comment': [ 'error', 'always', { markers: [ '/' ] } ]
    }
  }
}

export default {
  configs: {
    'typed-react': createConfig({ typescript: true, react: true }),
    typed: createConfig({ typescript: true, react: false }),
    default: createConfig({ typescript: false, react: false })
  }
}

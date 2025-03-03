/**
 * ESLint Configuration
 *
 * - Organized by plugin references
 * - Grouped rules logically (React, TypeScript, Imports, Arrow style, Best practices, Stylistic)
 * - Includes comments for easier maintenance
 */

const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat')

// Plugins
const react = require('eslint-plugin-react')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const preferArrow = require('eslint-plugin-prefer-arrow')
const unusedImports = require('eslint-plugin-unused-imports')
const importPlugin = require('eslint-plugin-import')
const stylistic = require('@stylistic/eslint-plugin')
const stylisticTs = require('@stylistic/eslint-plugin-ts')
const stylisticJsx = require('@stylistic/eslint-plugin-jsx')

module.exports = {
  /**
   * ----------------------------------------------------------------
   * Register Plugins (alphabetically)
   * ----------------------------------------------------------------
   */
  plugins: {
    '@stylistic': stylistic,
    '@stylistic/jsx': stylisticJsx,
    '@stylistic/ts': stylisticTs,
    '@typescript-eslint': fixupPluginRules(typescriptEslint),
    'prefer-arrow': preferArrow,
    'react': fixupPluginRules(react),
    'sort-imports': importPlugin,
    'unused-imports': unusedImports
  },

  /**
   * ----------------------------------------------------------------
   * Extend Shared & Recommended Configurations
   * (Removed duplicate "plugin:react/recommended")
   * ----------------------------------------------------------------
   */
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked'
  ],

  /**
   * ----------------------------------------------------------------
   * Custom ESLint Rules
   * ----------------------------------------------------------------
   */
  rules: {
    /**
     * ----------------------------
     * React-Specific Rules
     * ----------------------------
     */
    'react/prop-types': 'off',

    /**
     * ----------------------------
     * TypeScript Rules
     * ----------------------------
     */
    '@typescript-eslint/no-unused-vars': 'off', // We'll rely on unused-imports instead
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],

    /**
     * ----------------------------
     * Import / Unused Rules
     * ----------------------------
     */
    'no-restricted-imports': ['error', { patterns: ['.*'] }],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'sort-imports/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always'
      }
    ],
    // Disable core sort-imports to avoid conflicts with eslint-plugin-import
    'sort-imports': 'off',

    /**
     * ----------------------------
     * Arrow Function Preferences
     * ----------------------------
     */
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false
      }
    ],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'func-style': [
      'error',
      'expression',
      {
        allowArrowFunctions: true
      }
    ],

    /**
     * ----------------------------
     * General Best Practices
     * ----------------------------
     */
    'no-implicit-coercion': [
      'error',
      {
        boolean: true,
        number: true,
        string: true,
        allow: []
      }
    ],

    /**
     * ----------------------------
     * Stylistic Rules (via @stylistic/*)
     * ----------------------------
     *
     * React/JSX styles, general code formatting, line lengths, etc.
     */

    // -- JSX (from @stylistic/jsx)
    '@stylistic/jsx/jsx-pascal-case': ['error', {}],
    '@stylistic/jsx/jsx-one-expression-per-line': ['error', { allow: 'single-line' }],
    '@stylistic/jsx/jsx-closing-bracket-location': [1, 'line-aligned'],
    '@stylistic/jsx/jsx-closing-tag-location': ['error', 'line-aligned'],
    '@stylistic/jsx/jsx-curly-spacing': [2, 'never'],
    '@stylistic/jsx/jsx-equals-spacing': [2, 'never'],
    '@stylistic/jsx-quotes': ['error', 'prefer-single'],
    '@stylistic/jsx/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'allow'
      }
    ],
    '@stylistic/jsx/jsx-first-prop-new-line': ['error', 'multiprop'],
    '@stylistic/jsx/jsx-max-props-per-line': [1, { maximum: 1, when: 'always' }],
    '@stylistic/jsx/jsx-props-no-multi-spaces': 'error',
    '@stylistic/jsx/jsx-indent-props': [2, 2],
    '@stylistic/jsx/jsx-indent': ['error', 2],

    // -- General stylistic
    '@stylistic/multiline-ternary': ['error', 'always-multiline'],
    '@stylistic/type-generic-spacing': ['error'],
    '@stylistic/max-len': [
      'error',
      {
        code: 100,
        tabWidth: 2,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    '@stylistic/arrow-spacing': 'error',
    '@stylistic/function-call-argument-newline': ['error', 'consistent'],
    '@stylistic/function-paren-newline': ['error', 'consistent'],

    // -- TypeScript-specific stylistic
    '@stylistic/ts/function-call-spacing': ['error', 'never'],
    '@stylistic/ts/block-spacing': 'error',
    '@stylistic/ts/brace-style': ['error', '1tbs'],
    '@stylistic/ts/comma-dangle': ['error', 'never'],
    '@stylistic/ts/comma-spacing': ['error', { before: false, after: true }],
    '@stylistic/ts/keyword-spacing': ['error', { before: true }],
    '@stylistic/ts/object-curly-spacing': ['error', 'always'],
    '@stylistic/ts/object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true, consistent: true },
        ObjectPattern: { multiline: true },
        ImportDeclaration: 'never'
      }
    ],
    '@stylistic/ts/indent': ['error', 2],
    '@stylistic/ts/quotes': ['error', 'single'],
    '@stylistic/ts/semi': ['error', 'never'],
    '@stylistic/ts/type-annotation-spacing': 'error',

    // -- Other stylistic
    '@stylistic/max-statements-per-line': ['error', { max: 1 }],
    '@stylistic/new-parens': 'error',
    '@stylistic/no-multi-spaces': 'error',
    '@stylistic/no-multiple-empty-lines': [
      'error',
      {
        max: 1,   // at most 1 consecutive empty line
        maxEOF: 0, // no empty lines at the end of file
        maxBOF: 0  // no empty lines at the beginning of file
      }
    ],
    '@stylistic/nonblock-statement-body-position': ['error', 'beside'],
    '@stylistic/array-bracket-newline': ['error', 'consistent'],
    '@stylistic/array-bracket-spacing': ['error', 'always'],
    '@stylistic/array-element-newline': ['error', 'consistent'],
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/no-whitespace-before-property': 'error',
    '@stylistic/linebreak-style': ['error', 'unix'],
    '@stylistic/spaced-comment': ['error', 'always', { markers: ['/'] }]
  }
}

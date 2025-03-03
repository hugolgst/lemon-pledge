/**
 * ESLint Config for Lemon Pledge
 *
 * This shareable configuration is written as a CommonJS module
 * to ensure compatibility with projects that do not use ESM.
 */

const { fixupConfigRules, fixupPluginRules } = require("@eslint/compat");

// Use a self-executing async function to handle dynamic imports
(async () => {
  const react = require("eslint-plugin-react");
  const typescriptEslint = require("@typescript-eslint/eslint-plugin");
  const preferArrow = require("eslint-plugin-prefer-arrow");
  const unusedImports = require("eslint-plugin-unused-imports");
  const importPlugin = require("eslint-plugin-import");

  // Use dynamic imports for ESM modules
  const stylistic = await import("@stylistic/eslint-plugin");
  const stylisticTs = await import("@stylistic/eslint-plugin-ts");
  const stylisticJsx = await import("@stylistic/eslint-plugin-jsx");

  module.exports = {
    /**
     * ----------------------------------------------------------------
     * Plugins
     * ----------------------------------------------------------------
     * All plugin references are fixed-up to ensure compatibility.
     * They are listed alphabetically for consistency.
     */
    plugins: {
      "@stylistic": stylistic.default,
      "@stylistic/jsx": stylisticJsx.default,
      "@stylistic/ts": stylisticTs.default,
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      "prefer-arrow": preferArrow,
      react: fixupPluginRules(react),
      "sort-imports": importPlugin,
      "unused-imports": unusedImports,
    },

    /**
     * ----------------------------------------------------------------
     * Extends
     * ----------------------------------------------------------------
     * Shared and recommended ESLint configurations.
     */
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:@typescript-eslint/stylistic-type-checked",
    ],

    /**
     * ----------------------------------------------------------------
     * Rules
     * ----------------------------------------------------------------
     * Rules are grouped by category for maintainability.
     */
    rules: {
      // React-specific rules
      "react/prop-types": "off",

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": "off", // Rely on unused-imports
      "@typescript-eslint/array-type": ["error", { default: "generic" }],

      // Import and unused rules
      "no-restricted-imports": ["error", { patterns: [".*"] }],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "sort-imports/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          alphabetize: { order: "asc", caseInsensitive: true },
          'newlines-between': "always",
        },
      ],
      "sort-imports": "off", // Disable core rule to avoid conflicts

      // Arrow function preferences
      "prefer-arrow/prefer-arrow-functions": [
        "error",
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],
      "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
      "func-style": ["error", "expression", { allowArrowFunctions: true }],

      // Best practices
      "no-implicit-coercion": [
        "error",
        {
          boolean: true,
          number: true,
          string: true,
          allow: [],
        },
      ],

      // Stylistic rules (JSX and general formatting)
      "@stylistic/jsx/jsx-pascal-case": ["error", {}],
      "@stylistic/jsx/jsx-one-expression-per-line": ["error", { allow: "single-line" }],
      "@stylistic/jsx/jsx-closing-bracket-location": [1, "line-aligned"],
      "@stylistic/jsx/jsx-closing-tag-location": ["error", "line-aligned"],
      "@stylistic/jsx/jsx-curly-spacing": [2, "never"],
      "@stylistic/jsx/jsx-equals-spacing": [2, "never"],
      "@stylistic/jsx-quotes": ["error", "prefer-single"],
      "@stylistic/jsx/jsx-tag-spacing": [
        "error",
        {
          closingSlash: "never",
          beforeSelfClosing: "always",
          afterOpening: "never",
          beforeClosing: "allow",
        },
      ],
      "@stylistic/jsx/jsx-first-prop-new-line": ["error", "multiprop"],
      "@stylistic/jsx/jsx-max-props-per-line": [1, { maximum: 1, when: "always" }],
      "@stylistic/jsx/jsx-props-no-multi-spaces": "error",
      "@stylistic/jsx/jsx-indent-props": [2, 2],
      "@stylistic/jsx/jsx-indent": ["error", 2],
      "@stylistic/multiline-ternary": ["error", "always-multiline"],
      "@stylistic/type-generic-spacing": ["error"],
      "@stylistic/max-len": [
        "error",
        {
          code: 100,
          tabWidth: 2,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      "@stylistic/arrow-spacing": "error",
      "@stylistic/function-call-argument-newline": ["error", "consistent"],
      "@stylistic/function-paren-newline": ["error", "consistent"],

      // TypeScript-specific stylistic rules
      "@stylistic/ts/function-call-spacing": ["error", "never"],
      "@stylistic/ts/block-spacing": "error",
      "@stylistic/ts/brace-style": ["error", "1tbs"],
      "@stylistic/ts/comma-dangle": ["error", "never"],
      "@stylistic/ts/comma-spacing": ["error", { before: false, after: true }],
      "@stylistic/ts/keyword-spacing": ["error", { before: true }],
      "@stylistic/ts/object-curly-spacing": ["error", "always"],
      "@stylistic/ts/object-curly-newline": [
        "error",
        {
          ObjectExpression: { multiline: true, consistent: true },
          ObjectPattern: { multiline: true },
          ImportDeclaration: "never",
        },
      ],
      "@stylistic/ts/indent": ["error", 2],
      "@stylistic/ts/quotes": ["error", "single"],
      "@stylistic/ts/semi": ["error", "never"],
      "@stylistic/ts/type-annotation-spacing": "error",

      // Other stylistic rules
      "@stylistic/max-statements-per-line": ["error", { max: 1 }],
      "@stylistic/new-parens": "error",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],
      "@stylistic/nonblock-statement-body-position": ["error", "beside"],
      "@stylistic/array-bracket-newline": ["error", "consistent"],
      "@stylistic/array-bracket-spacing": ["error", "always"],
      "@stylistic/array-element-newline": ["error", "consistent"],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-whitespace-before-property": "error",
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/spaced-comment": ["error", "always", { markers: ["/"] }],
    },
  };
})();

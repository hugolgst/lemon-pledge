const { fixupConfigRules, fixupPluginRules } = require("@eslint/compat");

const react = require("eslint-plugin-react");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const preferArrow = require("eslint-plugin-prefer-arrow");
const unusedImports = require("eslint-plugin-unused-imports");
const importPlugin = require("eslint-plugin-import");
const stylistic = require("@stylistic/eslint-plugin");

module.exports = {
  languageOptions: {
    globals: {
      MyGlobal: true
    }
  },

  plugins: {
    "react": fixupPluginRules(react),
    "@typescript-eslint": fixupPluginRules(typescriptEslint),
    "prefer-arrow": preferArrow,
    "unused-imports": unusedImports,
    "sort-imports": importPlugin,
    "@stylistic": stylistic
  },

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended"
  ],

  rules: {
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "off",

    "no-restricted-imports": ["error", {
      patterns: [".*"],
    }],

    "prefer-arrow/prefer-arrow-functions": ["error", {
      disallowPrototype: true,
      singleReturnOnly: false,
      classPropertiesAllowed: false
    }],

    "prefer-arrow-callback": ["error", {
      allowNamedFunctions: true
    }],

    "func-style": ["error", "expression", {
      allowArrowFunctions: true
    }],

    "@typescript-eslint/array-type": ["error", {
      default: "generic"
    }],

    "no-implicit-coercion": ["error", {
      boolean: true,
      number: true,
      string: true,
      allow: []
    }],

    "unused-imports/no-unused-imports": "error",

    "unused-imports/no-unused-vars": ["error", {
      vars: "all",
      varsIgnorePattern: "^_",
      args: "after-used",
      argsIgnorePattern: "^_"
    }],

    "sort-imports/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "alphabetize": { "order": "asc", "caseInsensitive": true },
        "newlines-between": "always"
      }
    ],

    "sort-imports": "off", // Disable this to avoid conflicts with import/order

    "@stylistic/jsx-pascal-case": ["error", {}],
    "@stylistic/jsx-one-expression-per-line": ["error", { "allow": "single-line" }],
    "@stylistic/jsx-closing-bracket-location": [1, "line-aligned"],
    "@stylistic/jsx-closing-tag-location": ["error", "line-aligned"],
    "@stylistic/jsx-curly-spacing": [2, "never"],
    "@stylistic/jsx-equals-spacing": [2, "never"],
    "@stylistic/jsx-quotes": ["error", "prefer-single"],
    "@stylistic/jsx-tag-spacing": ["error", {
      "closingSlash": "never",
      "beforeSelfClosing": "always",
      "afterOpening": "never",
      "beforeClosing": "allow"
    }],
    "@stylistic/jsx-first-prop-new-line": ["error", "multiprop"],
    "@stylistic/jsx-max-props-per-line": [1, { "maximum": 1 }],
    "@stylistic/jsx-props-no-multi-spaces": "error",
    "@stylistic/jsx-indent-props": [2, 2],

    "@stylistic/max-len": [
      "error",
      {
        code: 100,
        tabWidth: 2,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    "@stylistic/array-bracket-newline": ["error", "consistent"],
    "@stylistic/arrow-spacing": "error",
    "@stylistic/block-spacing": "error",
    "@stylistic/comma-dangle": ["error", "never"],
    "@stylistic/comma-spacing": ["error", { "before": false, "after": true }],
    "@stylistic/curly-newline": ["error", "always"],
    "@stylistic/function-call-spacing": ["error", "never"],
    "@stylistic/keyword-spacing": ["error", { "before": true }],
    "@stylistic/max-statements-per-line": ["error", { "max": 1 }],
    "@stylistic/new-parens": "error",
    "@stylistic/no-multi-spaces": "error",
    "@stylistic/no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 0,
        "maxBOF": 0
      }
    ],
    "@stylistic/no-trailing-spaces": "error",
    "@stylistic/no-whitespace-before-property": "error",
    "@stylistic/nonblock-statement-body-position": ["error", "beside"],
    "@stylistic/object-curly-spacing": ["error", "always"],
    "@stylistic/array-bracket-spacing": ["error", "always"],
    "@stylistic/indent": ["error", 2],
    "@stylistic/linebreak-style": ["error", "unix"],
    "@stylistic/quotes": ["error", "single"],
    "@stylistic/semi": ["error", "never"],
    "@stylistic/spaced-comment": ["error", "always", { "markers": ["/"] }]
  }
};


<img align="right" height="240" src="https://github.com/user-attachments/assets/b7205f89-5816-480d-add2-31068bf18349" />

## `lemon-pledge`
A shareable ESLint configuration that leverages TypeScript, React, and [Stylistic ESLint Plugins](https://github.com/ota-meshi/eslint-plugin-stylistic). This config aims for clean, consistent, and modern code style.

```
npm i lemon-pledge
```

<br/>

```js
import lemonPledge from 'lemon-pledge'
export default [
  lemonPledge.configs.default // Standard JS
  // OR
  lemonPledge.configs.typed // TypeScript
  // OR
  lemonPledge.configs['typed-react'] // TypeScript + React
]
```

## Features

- **React**: Includes [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react) and [`react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks).
- **TypeScript**: Integrates [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin) for type-safe linting.
- **Imports**: Relies on [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import) to keep imports tidy and well-ordered.
- **Unused Imports**: Removes unused imports/variables automatically via [`eslint-plugin-unused-imports`](https://www.npmjs.com/package/eslint-plugin-unused-imports).
- **Prefer Arrow**: Enforces arrow functions in most cases with [`eslint-plugin-prefer-arrow`](https://www.npmjs.com/package/eslint-plugin-prefer-arrow).
- **Stylistic**: Applies consistent stylistic rules with [`@stylistic/eslint-plugin`](https://github.com/ota-meshi/eslint-plugin-stylistic) (including `jsx` and `ts` extensions).

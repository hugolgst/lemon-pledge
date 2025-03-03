import lemonPledge from 'lemon-pledge'

export default [
  lemonPledge.configs.default,
  {
    files: [ '**/*.mjs' ],

    languageOptions: {}
  }
]

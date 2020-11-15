module.exports = {
  rules: {
    'no-undef': require('./lib/rules/no-undef'),
    'no-unused-vars': require('./lib/rules/no-unused-vars')
  },
  configs: {
    recommended: {
      parserOptions: {
        ecmaVersion: 6
      },
      plugins: [
        '@minar-kotonoha/eslint-plugin-react-directives'
      ],
      rules: {
        '@minar-kotonoha/eslint-plugin-react-directives/no-undef': 'error',
        '@minar-kotonoha/eslint-plugin-react-directives/no-unused-vars': 'error'
      }
    }
  }
};

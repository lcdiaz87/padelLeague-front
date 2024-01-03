module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      // Agrega tus reglas específicas de ESLint aquí

      // Deshabilitar la regla que prohíbe el uso de 'any'
      '@typescript-eslint/no-explicit-any': 'off',
    },
  };
  
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': isProduction ? 'warn' : 'off',
    'no-debugger': isProduction ? 'warn' : 'off',
    'no-unused-vars': isProduction ? 'warn' : 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    'no-useless-catch': 'off',
    camelcase: 'off',
    'arrow-body-style': 'off',
  },
};

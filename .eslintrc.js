module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'vue',
  ],
  rules: {
    semi: [2, 'never'],
    quotes: [2, 'single'],
  },
}

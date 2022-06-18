module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'plugin:vue/essential'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: [
        'vue',
        'import'
    ],
    rules: {

        // allow async-await
        'generator-star-spacing': 'off',
        // allow paren-less arrow functions
        'arrow-parens': 'off',
        'one-var': 'off',
        'no-void': 'off',
        'multiline-ternary': 'off',

        'import/first': 'off',
        'import/named': 'error',
        'import/namespace': 'error',
        'import/default': 'error',
        'import/export': 'error',
        'import/extensions': 'off',
        'prefer-promise-reject-errors': 'off',

        'max-classes-per-file': 'off',
        'class-methods-use-this': 'off',
        'comma-dangle': 'off',
        'import/no-extraneous-dependencies': 'off',
        'vue/multi-word-component-names': 'off',
        semi: [2, 'never'],
        quotes: [2, 'single'],
    },
}

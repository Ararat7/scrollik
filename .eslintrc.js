module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    camelcase: 0,
    'max-len': [2, 200, 4],
    'arrow-parens': [2, 'as-needed'],
    'consistent-return': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'prefer-template': 0,
    'no-bitwise': 0,
    'no-plusplus': 0,
    'no-restricted-syntax': 0,
    'no-case-declarations': 0,
    'no-mixed-operators': 0,
    'no-use-before-define': 0,
    'no-prototype-builtins': 0,
    'no-restricted-properties': 0,
    'no-return-assign': 0,
    'no-nested-ternary': 0,
    'no-underscore-dangle': 0,
    'no-unused-expressions': 0,
    'no-unused-vars': 0,
    'no-shadow': 0,
    'no-undef': 0,
    'import/no-extraneous-dependencies': [0, {
      devDependencies: false,
      optionalDependencies: false,
      peerDependencies: false,
    }],
    'import/no-webpack-loader-syntax': 0,
    // babel plugin
    'babel/no-unused-expressions': 0,
    // react plugin
    'react/button-has-type': 0,
    'react/prop-types': 0,
    'react/jsx-key': 2,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-max-props-per-line': [2, { maximum: 1 }],
    'react/jsx-child-element-spacing': 2,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-no-target-blank': 0,
    'react/no-danger': 0,
    // jsx-a11y
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/alt-text': 0,
    'jsx-a11y/media-has-caption': 0,
    'jsx-quotes': [2, 'prefer-double'],
    // typescript-eslint
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-shadow': 2,
  },
};

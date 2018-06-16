const path = require('path');

module.exports = {
  "extends": "airbnb-base",
  "settings": {
    "import/resolver": {
      node: {
        paths: [path.resolve('./src')]
      }
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "ecmaVersion": 8,
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": 1,
    "comma-dangle": 0,
    "eol-last": 0,
    "no-console": 0,
    'func-names': 0,
    'template-curly-spacing': 0,
    'import/no-extraneous-dependencies': 0,
    'import/first': 0,
    'require-yield': 0
  }
};
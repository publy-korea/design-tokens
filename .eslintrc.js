module.exports ={
  env: {
    node: true,
    browser: false,
    commonjs: true,
    es2021: true
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    'plugin:prettier/recommended'
  ],
  plugins: [
    "@typescript-eslint",
    "prettier"
  ],
    parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: "latest",
    project: "tsconfig.json"
  },
  ignorePatterns: [
    "node_modules/",
    "tsconfig.json"
  ],
  rules: {
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        "functions": false,
        "classes": true,
        "variables": true,
        "typedefs": true
      }
    ],
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/order": [
      "warn",
      {
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": false
        }
      }
    ],
    "jsx-a11y/accessible-emoji": "off",
    "jsx-a11y/alt-text": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/anchor-is-valid": [
      "warn",
      {
        "components": [
          "Link"
        ],
        "specialLink": [
          "hrefLeft",
          "hrefRight"
        ],
        "aspects": [
          "invalidHref",
          "preferButton"
        ]
      }
    ],
    "jsx-a11y/label-has-associated-control": [
      "warn",
      {
        "assert": "either"
      }
    ],
    "jsx-a11y/no-autofocus": "off",
    "global-require": "off",
    "lines-between-class-members": "off",
    "no-shadow": "off",
    "no-use-before-define": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "no-param-reassign": [
      "error",
      {
        "props": true,
        "ignorePropertyModificationsFor": [
          "draft",
          "e"
        ]
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {}
    ],
    "no-console": "off"
  }
}
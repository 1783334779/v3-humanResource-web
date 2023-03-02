/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "prettier", // 解决prettier和eslint的冲突
    "plugin:prettier/recommended", // 解决prettier和eslint的冲突
    "airbnb-base",
    "./.eslintrc-auto-import.json",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      // node: {
      //   extensions: [".js", ".jsx", ".ts", ".tsx"],
      // },
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  // "off"或者0    //关闭规则关闭
  // "warn"或者1    //在打开的规则作为警告（不影响退出代码）
  // "error"或者2    //把规则作为一个错误（退出代码触发时为1）
  rules: {
    "no-console": "off",
    "no-debugger": "warn",
    "no-plusplus": 0,
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    "import/no-unresolved": [2, { ignore: ["\\.ts$"] }],
    quotes: 0,
    // js 以及 ts文件忽略后缀
    "import/extensions": [
      "error",
      "never",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    // semi: ['error', 'never'],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: [
          "state", // for vuex state
          "acc", // for reduce accumulators
          "e", // for e.returnvalue
        ],
      },
    ],
    // allow optionalDependencies
    "import/no-extraneous-dependencies": 0,
    "max-len": [
      "error",
      {
        code: 124, // vscode代码格式化一行最大字符就是124，所以这里要用124
        tabWidth: 2,
        // "comments": 100,//enforces a maximum line length for comments; defaults to value of code
        // "ignorePattern": true,
        // ignores lines matching a regular expression; can only match a single
        //  line and need to be double escaped when written in YAML or JSON
        ignoreComments: false, // ignores all trailing comments and comments on their own line
        ignoreTrailingComments: false, // ignores only trailing comments
        ignoreUrls: true, // ignores lines that contain a URL
        ignoreStrings: true, // ignores lines that contain a double-quoted or single-quoted string
        ignoreTemplateLiterals: true, // ignores lines that contain a template literal
        ignoreRegExpLiterals: true, // ignores lines that contain a RegExp literal
      },
    ],
    "consistent-return": ["off"],
    "no-underscore-dangle": ["off"],
    eqeqeq: ["off"],
    "eol-last": ["off"],
    "linebreak-style": ["off"],
    "no-restricted-syntax": ["off"],
    "@typescript-eslint/ban-ts-ignore": "off",
  },
};

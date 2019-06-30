# Back-end

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg) ![License](https://img.shields.io/github/license/Dmendoza99/posine.svg) ![Issues](https://img.shields.io/github/issues/Dmendoza99/posine.svg)

This is the back-end for the whole POS system.

## Motivation

This project exists because of the need of cheap open source solutions in Honduras.

## Code style

I'm using just using [Expo's](https://github.com/expo) eslint-config-universe for linting and prettier for style

![Style](https://img.shields.io/badge/Coding_Style-eslint--config--unverse-blue.svg)

### Eslint

```js
This is the .eslintrc.js
module.exports = {
  extends: ["universe/web", "prettier"],
  parserOptions: {
    es6: true,
  },
};
```

### Prettier

```json
this is the .prettierrc
{
  "printWidth": 100,
  "tabWidth": 2,
  "singleQuote": false,
  "jsxBracketSameLine": true,
  "trailingComma": "es5"
}
```

## Tech/framework used

### Dependecies

- body-parser
- cors
- crypto-js
- eslint-config-universe
- express
- jsonwebtoken
- sqlite

### Dev dependecies

- electron-builder

## Installation

```bash
git clone https://github.com/Dmendoza99/posine
cd posine
cd Server
npm install
```

## Bugs 🐛

This Back-end is getting upgrades in my free time if there is a problem please create a bug report in the issues section.

## License

- Licensed under [GNU GPLv3](https://github.com/Dmendoza99/posine/blob/master/LICENSE)

# POSine

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg) ![License](https://img.shields.io/github/license/Dmendoza99/posine.svg) ![Issues](https://img.shields.io/github/issues/Dmendoza99/posine.svg)

This is a small Point Of Sales (POS) for Honduran market with RTN Clients and CAI receipts.

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

## Screenshots

![Main Dashboard](https://i.ibb.co/QmXT5hN/image.png "Main Dashboard")

## Tech/framework used

### Dependecies

- electron-serve

### Dev dependecies

- concurrently
- electron
- electron-packager

## Installation

```bash
git clone https://github.com/Dmendoza99/posine
cd posine
npm install
```

## Database Model

![ER](https://raw.githubusercontent.com/Dmendoza99/posine/master/Modelo%20de%20la%20base%20de%20datos.png?token=AHIBVQFMOIX3JEEXVITQL525D3BBQ "Modelo Relacional")

## Bugs 🐛

This electron app is getting upgrades in my free time if there is a problem please create a bug report in the issues section.

## License

- Licensed under [GNU GPLv3](https://github.com/Dmendoza99/posine/blob/master/LICENSE)

# POSine Client

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg) ![License](https://img.shields.io/github/license/Dmendoza99/posine.svg) ![Issues](https://img.shields.io/github/issues/Dmendoza99/posine.svg)

This is the UI for the whole POS system.

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

- bootstrap
- chartist
- eslint-config-universe
- jwt-decode
- node-sass
- react
- react-bootstrap
- react-chartist
- react-dom
- react-google-maps
- react-notification-system
- react-router
- react-router-dom
- react-scripts
- react-toggle

### Dev dependecies

- @types/googlemaps
- @types/markerclustererplus
- @types/react
- typescript

## Installation

```bash
git clone https://github.com/Dmendoza99/posine
cd posine
cd Client
npm install
```

## Bugs 🐛

This UI is getting upgrades in my free time if there is a problem please create a bug report in the issues section.

## License

- Copyright 2018 [Creative Tim](https://www.creative-tim.com?ref=lbdr-readme)
- Licensed under [GNU GPLv3](https://github.com/Dmendoza99/posine/blob/master/LICENSE)

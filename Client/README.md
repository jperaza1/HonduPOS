# Front-end made with ❤, ☕ and some 🍺

![GitHub package.json version](https://img.shields.io/github/package-json/v/dmendoza99/posine) ![License](https://img.shields.io/github/license/Dmendoza99/posine.svg) ![Issues](https://img.shields.io/github/issues/Dmendoza99/posine.svg)

This is the front-end for the whole POS system.

## Motivation

This front-end exists because I obviously needed a GUI for the end user.

## Code style

I'm using just using [Expo's](https://github.com/expo) eslint-config-universe for linting and prettier for style.

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
- react-text-mask

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

This front-end is getting upgrades in my free time if there is a problem please create a bug report in the issues section.

## Commits

Inspired by [dannyfritz/commit-message-emoji](https://github.com/dannyfritz/commit-message-emoji)

| Commit type              | Emoji                                                     |
| :----------------------- | :-------------------------------------------------------- |
| Initial commit           | :tada: `:tada:`                                           |
| Version tag              | :bookmark: `:bookmark:`                                   |
| New feature              | :sparkles: `:sparkles:`                                   |
| Bugfix                   | :bug: `:bug:`                                             |
| Documenting source code  | :bulb: `:bulb:`                                           |
| Performance              | :racehorse: `:racehorse:`                                 |
| Cosmetic                 | :lipstick: `:lipstick:`                                   |
| General update           | :zap: `:zap:`                                             |
| Improve format/structure | :art: `:art:`                                             |
| Refactor code            | :hammer: `:hammer:`                                       |
| Removing code/files      | :fire: `:fire:`                                           |
| Security                 | :lock: `:lock:`                                           |
| Upgrading dependencies   | :arrow_up: `:arrow_up:`                                   |
| Downgrading dependencies | :arrow_down: `:arrow_down:`                               |
| Lint                     | :shirt: `:shirt:`                                         |
| Translation              | :alien: `:alien:`                                         |
| Text                     | :pencil: `:pencil:`                                       |
| Critical hotfix          | :ambulance: `:ambulance:`                                 |
| Deploying stuff          | :rocket: `:rocket:`                                       |
| Fixing on MacOS          | :apple: `:apple:`                                         |
| Fixing on Linux          | :penguin: `:penguin:`                                     |
| Fixing on Windows        | :checkered_flag: `:checkered_flag:`                       |
| Work in progress         | :construction: `:construction:`                           |
| Removing a dependency    | :heavy_minus_sign: `:heavy_minus_sign:`                   |
| Adding a dependency      | :heavy_plus_sign: `:heavy_plus_sign:`                     |
| Configuration files      | :wrench: `:wrench:`                                       |
| Package.json in JS       | :package: `:package:`                                     |
| Merging branches         | :twisted_rightwards_arrows: `:twisted_rightwards_arrows:` |
| Bad code / need improv.  | :hankey: `:hankey:`                                       |
| Reverting changes        | :rewind: `:rewind:`                                       |
| Breaking changes         | :boom: `:boom:`                                           |
| Code review changes      | :ok_hand: `:ok_hand:`                                     |
| Accessibility            | :wheelchair: `:wheelchair:`                               |
| Move/rename repository   | :truck: `:truck:`                                         |
| Other                    | [Be creative](http://www.emoji-cheat-sheet.com/)          |

## License

- Copyright 2018 [Creative Tim](https://www.creative-tim.com?ref=lbdr-readme)
- Licensed under [GNU GPLv3](https://github.com/Dmendoza99/posine/blob/master/LICENSE)

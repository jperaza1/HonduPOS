# HonduPOS made with ❤, ☕ and some 🍺

![GitHub package.json version](https://img.shields.io/github/package-json/v/dmendoza99/HonduPOS) ![License](https://img.shields.io/github/license/Dmendoza99/HonduPOS.svg) ![Issues](https://img.shields.io/github/issues/Dmendoza99/HonduPOS.svg)

This is a small Point Of Sales (POS) for Honduran market with RTN Clients and CAI receipts.

## Motivation

This project exists because of the need of cheap open source solutions in Honduras.

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

![Main Dashboard](assets/Images/screenshot.PNG "Main Dashboard")

## Tech/framework used

### Dependecies

- electron-serve

### Dev dependecies

- concurrently
- electron
- electron-packager

## Installation

```bash
git clone https://github.com/Dmendoza99/HonduPOS
cd HonduPOS
npm install
```

## Database Model

![ER](assets/Images/Modelodelabasededatos.png "Modelo Relacional")

## Bugs 🐛

This electron app is getting upgrades in my free time if there is a problem please create a bug report in the issues section.

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
| Removal                  |:Wastebasket:`:Wastebasket:`                               |
| Reverting changes        | :rewind: `:rewind:`                                       |
| Breaking changes         | :boom: `:boom:`                                           |
| Code review changes      | :ok_hand: `:ok_hand:`                                     |
| Accessibility            | :wheelchair: `:wheelchair:`                               |
| Move/rename repository   | :truck: `:truck:`                                         |
| Other                    | [Be creative](http://www.emoji-cheat-sheet.com/)          |

## License

- Licensed under [GNU GPLv3](https://github.com/Dmendoza99/HonduPOS/blob/master/LICENSE)

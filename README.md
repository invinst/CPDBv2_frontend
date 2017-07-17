==>

# CPDB v2 Frontend

## Getting Started

- `sudo ansible-galaxy install Heroqu.nodejs4x`
- `sudo ansible-galaxy install nicolai86.phantomjs`
- Make sure your node and npm version match: (node v6.10.3, npm v3.10.10 and yarn v0.23.4)
- `yarn install`

## Run Tests

- `yarn test` to run tests.
- `yarn cover` will run tests and output coverage statistics to `./lcov.info`

## Run Selenium Tests

- `yarn selenium install` to install latest selenium and driver.
- `yarn selenium start` to start selenium standalone server.
- `yarn live-test` to run selenium tests.

## Development

First create a symlink to let the local devserver serve fonts correctly:

```bash
mkdir src/dist
cd src/dist
ln -s ../fonts fonts
```

Then:

- `yarn start` to run development server (powered by [budo](https://github.com/mattdesl/budo))
- visit `localhost:9966` to see live changes.

## Deployment

We use instances from Azure for now. Both can be ssh'ed into with "ansible" user and same password as v1 instance.

- Staging node: [23.96.180.229](http://23.96.180.229)
- Production node: [13.92.132.7](http://13.92.132.7)
- `bin/setup-staging`: Setup the infrastructure of staging. (password is the same as deploy user's on v1). Before setting up with the recent scripts, please ensure that you have your ssh keys on the server.
- `bin/deploy-staging`: Deploy the new updates to staging.
- `bin/setup-production`: Setup production instance.
- `bin/deploy-production`: Deploy newest code to production instance.

## Browser supports

Chrome 45+, Firefox 45+, IE 11, Safari 9+ and iOS 8+ Safari.

## CSS Development Guide

[Read here](docs/css-development-guide.md)

## Animation Development Guide

[Read here](docs/animation-development-guide.md)

## Miscellaneous Frontend Best Practices

[Read here](docs/miscellaneous-frontend-best-practices.md)

## Redux Testing Guide

Redux has well-documented testing guideline, please read it [here](http://redux.js.org/docs/recipes/WritingTests.html).

## Reducers

We use [redux-actions](https://github.com/acdlite/redux-actions) to create action. The simplest way to create a reducer is using `handleActions` from redux-actions. You can read it [here](https://github.com/acdlite/redux-actions#handleactionsreducermap-defaultstate).

## Axios Mock Client(`utils/axios-mock-client`)

[Read here](docs/axios-mock-client-development-guide.md)

## Configured Axios Middleware(`middleware/configured-axios-middleware`)

[Read here](docs/configured-axios-middleware-development-guide.md)

## Async Action Creators

[Read here](docs/async-action-creators-development-guide.md)

## Selectors

[Read here](docs/selectors-development-guide.md)

## Nightwatch end-2-end testing

[Read here](docs/nightwatch-testing-guide.md)

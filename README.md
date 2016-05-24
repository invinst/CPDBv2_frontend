==>

# CPDB v2 Frontend

## Getting Started

- `sudo ansible-galaxy install Heroqu.nodejs4x`
- `sudo ansible-galaxy install nicolai86.phantomjs`
- Make sure your node and npm version match vagrant's: (node v4.4.3 and npm v3.8.7)
- `npm install`
- `vagrant up`
- `vagrant rsync-auto` (put this on another console this required for live reload)
- `vagrant ssh`
- `cd /code`

Almost everything dev related should be done inside vagrant box. Exceptions are when you have to install a new npm package, `npm shrinkwrap` and push/pull code. This is because currently we don't have a way for host machine to see file changes made within vagrant.

## Run Tests

- `npm test` to run tests.
- `npm run cover` will run tests and output coverage statistics to `./lcov.info`

## Development

- `npm start` to run development server (powered by [budo](https://github.com/mattdesl/budo))
- visit `localhost:9966` to see live changes.

## Deployment

We use instances from Azure for now.

- Staging IP address: [23.96.180.229](http://23.96.180.229)
- `bin/deploy-staging`: deploy to staging. (password is the same as deploy user's on v1)

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

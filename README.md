# CPDB v2 Frontend

## Table of contents
* [Development](#development)
* [Deployment](#deployment)
* [Browser supports](#browser-supports)
* [Development Guides](#development-guides)

## Development

### Getting Started

- Install `yarn`
- `yarn start` to run development server.
- visit `localhost:9966` to see live changes.

### Run Unit Tests

- `yarn test` to run tests.
- `yarn cover` will run tests and output coverage statistics to console.

### Run Integration Tests

- `yarn integration-test` to run selenium tests.
- `yarn integration-test -- --spec ./integration-test/<test-name>.js` to run specific test.

### CircleCI 

#### Setup

We're using CircleCI 2.0 which makes use of docker images. For this repo, we're running CircleCI on our
[custom image](https://circleci.com/docs/2.0/custom-images/) which is built from `.circleci/docker/Dockerfile` and currently published as `cpdbdev/cpdbv2_frontend`
on Docker Hub.

#### Environment Variables:
- `SKIP_COVERALLS`: set to `true` to skip sending coverage report to Coveralls. Only do this if Coveralls is down.

## Deployment

Deployment should be almost automatic depending on which branch you pushed. 
- `master` branch push will trigger production deploy
- `beta` branch push will trigger beta deploy
- `staging` branch push will trigger staging deploy

If you want to see each step, look at `.circleci/config.yml`.

### Building & pushing the docker image

**Important: Current version of Docker image is 0.1.2. Please update this when you make changes to it.**

```bash
docker login
docker build -t cpdbdev/cpdbv2_frontend:0.1.2 .circleci/docker
docker push cpdbdev/cpdbv2_frontend:0.1.2
```

Remember to bump the version of course.

## Browser supports

Chrome 45+, Firefox 45+, IE 11, Safari 9+ and iOS 8+ Safari.

## Development Guides

- [CSS development guide](docs/css-development-guide.md)
- [Animation development guide](docs/animation-development-guide.md)
- [redux-actions usage](https://github.com/acdlite/redux-actions#usage)
- [Redux testing guidelines](http://redux.js.org/docs/recipes/WritingTests.html)
- [Axios mock client](docs/axios-mock-client-development-guide.md)
- [Configured Axios middleware](docs/configured-axios-middleware-development-guide.md)
- [Async action creators](docs/async-action-creators-development-guide.md)
- [Selectors](docs/selectors-development-guide.md)
- [WebdriverIO tests](docs/webdriverio.md)
- [Miscelaneous topics](docs/miscellaneous-frontend-best-practices.md)
- [Others](docs/other-development-guides.md)

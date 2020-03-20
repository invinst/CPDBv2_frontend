==>

# CPDB v2 Frontend

## Getting Started

- `yarn`

## Run Tests

- `yarn test` to run tests.
- `yarn cover` will run tests and output coverage statistics to console.

## Run Selenium Tests

- `yarn integration-test` to run selenium tests.
- `yarn integration-test -- --spec ./integration-test/<test-name>.js` to run specific test.

## Development

- `yarn start` to run development server.
- visit `localhost:9966` to see live changes.

## Deployment
Deployment should be almost automatic depending on which branch you pushed. 
`master` branch push will trigger production deploy whereas
`beta` branch push will trigger beta deploy and
`staging` branch push will trigger staging deploy.
If you want to see each step, look at `.circleci/config.yml`.

## localStorageVersion

We have to refresh local storage after we make some database or client changes to maintain the reliability of our website. Remember to bump `localStorageVersion` in `config/base.js` after every changes.

## CircleCI setup

We're using CircleCI 2.0 which makes use of docker images. For this repo, we're running CircleCI on our
[custom image][1] which is built from `.circleci/docker/Dockerfile` and currently published as `cpdbdev/cpdbv2_frontend`
on Docker Hub.

We need the custom image because the CircleCI-provided node 6 image (circleci/node:6.10.3-browsers):

- Does not have java, which we need in order to run selenium
- Has a fixed yarn version, which does not match our current one

By building from our own Dockerfile, we can add java and control the yarn version exactly as we want.

Other benefits:

- Speed. It's no longer necessary to install stuff like Chrome, yarn, etc. on every build.
- Consistency. Previously we needed to upgrade ChromeDriver periodically to catch up with the latest Chrome releases.
  Now we can control when we want a newer Chrome (by updating the Docker image).

Right now the benefits seem to justify the added burden of maintaining a Dockerfile. Let's try this out for a while and
see how things go.

### Environment Variables:
- `SKIP_COVERALLS`: set to `true` to skip sending coverage report to Coveralls. Only do this if Coveralls is down.

### Building & pushing the docker image for CI:

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

[1]: https://circleci.com/docs/2.0/custom-images/

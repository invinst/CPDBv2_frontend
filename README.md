==>

# CPDB v2 Frontend

## Getting Started

- `sudo ansible-galaxy install Heroqu.nodejs4x`
- `sudo ansible-galaxy install nicolai86.phantomjs`
- `sudo ansible-galaxy install jeqo.nginx`
- `vagrant up`
- `vagrant rsync-auto` (put this on another console this required for live reload)
- `vagrant ssh`
- `cd /code`

## Run Tests

- `npm test` to run tests.
- `npm run cover` will run tests and output coverage statistics to `./lcov.info`

## Development

- `npm start` to run development server (powered by [budo](https://github.com/mattdesl/budo))
- visit `localhost:9966` to see live changes.

## Deployment

We use 2 droplets from DigitalOceans for deployment. Ask Giang in case you need access to DigitalOcean control panel.

- Staging IP address: [23.96.180.229](http://23.96.180.229)
- `bin/deploy-staging`: deploy to staging. (password is the same as deploy user's on v1)

## Browser supports

Chrome 45+, Firefox 45+, IE 11, Safari 9+ and iOS 8+ Safari.

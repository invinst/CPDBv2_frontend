# CPDB v2 Frontend

## Getting Started

- `vagrant up`
- `vagrant rsync-auto` (put this on another console this required for live reload)
- `vagrant ssh`
- `cd /code`

## Run Tests

- `npm test` to run tests.
- `npm run cover` will run tests and output coverage statistics to `./lcov.info`

## Development

- `npm start` to run `webpack-dev-server` (with `react-hot-loader`)

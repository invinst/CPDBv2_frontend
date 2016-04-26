==>

# CPDB v2 Frontend

## Getting Started

- `sudo ansible-galaxy install Heroqu.nodejs4x`
- `sudo ansible-galaxy install nicolai86.phantomjs`
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

## Browser supports

Chrome 45+, Firefox 45+, IE 11, Safari 9+ and iOS 8+ Safari

## Responsive layout Strategy

We use [React-responsive](https://github.com/contra/react-responsive) and [PureCSS](http://purecss.io/) to facilitate a most simple and flexible layout strategy. In brief if a component display/layout differently on different screen sizes, you only need to extends from `ResponsiveComponent` and override 3 of it's method: `renderMobile`, `renderTablet`, `renderDesktop`. e.g.

```javascript
import ResponsiveComponent from 'components/responsive-component';

export class default Component extends ResponsiveComponent {
    renderMobile() {
        return (...);
    }
    renderTablet() {
        return (...);
    }
    renderDesktop() {
        return (...);
    }
}
```

The layout system use PureCSS. This is how we use it:
- a div with `pure-g` class wrap layout column elments.
- a div with `pure-u-{digit1}-{digit2}` class specify column width: digit1/digit2 of total width. [digit2 could be divisibles of 5 or 24.](http://purecss.io/grids/#grids-units-sizes)
- layout elements with PureCSS classes above must always be a div and must not contain any other class or style.

You can look at `components/stories` module or `components/story-medium` module for example.

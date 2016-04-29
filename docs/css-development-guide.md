# CSS Development Guide

## Basic Use Case

We use a variant of inline style called [Radium](https://github.com/FormidableLabs/radium). To use Radium, simply wrap it in `Radium()` before export it. A component module `{component-name}.js` will import it's style from a style module `{component-name}.style.js`.

```javascript
// components/component.js

import React from 'react';
import Radium from 'radium';
import { style } from 'components/component.style';


class Component extends React.Component {
  render() {
    return (
      <div style={ style }/>
    );
  }
}

export default Radium(Component);
```

```javascript
//componets/component.style.js

export const style = {
  background: 'red',
  height: '110px'
};
```

## Merge Styles

To merge styles, simply put them in array. Style will be merged from right to left.

```javascript
// components/component.js

import React, {PropTypes} from 'react';
import Radium from 'radium';
import { style, styleActive } from 'components/component.style';


class Component extends React.Component {
  render() {
    return (
      <div style={ [style, this.props.active ? styleActive : null] }/>
    );
  }
}

Component.propTypes = {
  active: PropTypes.bool
};

export default Radium(Component);
```

```javascript
//componets/component.style.js

export const style = {
  background: 'red',
  height: '110px'
};

export const styleActive = {
  background: 'yellow'
};
```

## Responsive

There are 3 patterns that you could use to make a component responsive. All of which are discussed below. Whatever pattern that you choose, make sure to use only 1 of them on a component.

### Extends From `ResponsiveComponent`

This pattern fit those components that change layout significantly between devices. Just extends from `ResponsiveComponent` and provide 3 methods: `renderMobile`, `renderTablet`, `renderDesktop`.

```javascript
import ResponsiveComponent from 'components/responsive-component';

class Component extends ResponsiveComponent {
  renderMobile() {...}
  renderTablet() {...}
  renderDesktop() {...}
}
```

### Extends from `ResponsiveStyleComponent`

This pattern fit those that have zero markup changes but has to change style on different screen sizes. Just extends from `ResponsiveStyleComponent` and provide 2 methods: `responsiveStyle` and `renderWithResponsiveStyle`. `responsiveStyle` should return a mapping of `style` object for each device type. The appropriate `style` object will be passed to `renderWithResponsiveStyle` depending on screen size.

```javascript
import ResponsiveStyleComponent, {MOBILE, TABLET, DESKTOP} from 'components/responsive-style-component';
import {wrapperStyle, mobileStyle, tabletStyle} from 'components/component.style.js';

class Component extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [MOBILE]: {
        wrapper: [wrapperStyle, mobileStyle, this.props.style]
      },
      [TABLET]: {
        wrapper: [wrapperStyle, tabletStyle, this.props.style]
      },
      [DESKTOP]: {
        wrapper: [wrapperStyle, this.props.style]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <div style={ style.wrapper }>
        ...
      </div>
    );
  }
}
```

### Use PureCSS Responsive Grids

When only layout change and you never have to touch media queries you can use this pattern. Just use class names such as `pure-u-mo-*`, `pure-u-ta-*`, `pure-u-de-*` (Note that it's different from PureCSS's default responsive grid classes) to specify device specific column width.

```javascript
import React from 'react';
import Radium from 'radium';
import { style } from 'components/component.style';


class Component extends React.Component {
  render() {
    return (
      <div className='pure-g'>
        <div style={ [style] } className='pure-u-mo-1-1 pure-u-ta-1-2 pure-u-de-1-3'/>
      </div>
    );
  }
}

export default Radium(Component);
```

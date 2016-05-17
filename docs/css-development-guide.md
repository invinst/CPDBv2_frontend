# CSS Development Guide

## Common guidelines

- As we use inline-style `className` prop will only serve 2 purposes: help with testing or if those classes come from 3rd party libraries such as PureCSS. Note that it's not encouraged to use another 3rd party library for CSS as we already have PureCSS.

- CSS class name must follow BEM convention and have this format: `{{block}}__{{element}}—{{modifier}}`. Block, element and modifier all must only contain lowercase alphanumeric characters and hyphen.

## Basic Use Case

We use a variant of inline style called [Radium](https://github.com/FormidableLabs/radium). To use Radium, simply wrap it in `Radium()` before export it. A component module `{component-name}.js` will import it's style from a style module `{component-name}.style.js` in the same folder. Also it will only use relative import to import style.

```javascript
// components/component.js

import React from 'react';
import Radium from 'radium';
import { style } from './component.style';


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
import { style, styleActive } from './component.style';


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

## Layout

we use PureCSS grid system for layout: [http://purecss.io/grids/](http://purecss.io/grids/). For most cases, stick with non-responsive grid classes (e.g. `pure-u-1-1`, `pure-u-2-3`). Read **Responsive** section to know how to use responsive grid classes.

## Responsive

**Important Note:** Mobile layout is disabled for now. That means mobile layout will copy tablet layout for most patterns below.

There are 3 patterns that you could use to make a component responsive. All of which are discussed below. Whatever pattern that you choose, make sure to use only 1 of them on a component. When your component does not need to be responsive, do not extend from any responsive component.

### Extends From `ResponsiveComponent`

This pattern fit those components that change layout significantly between devices. Just extends from `ResponsiveComponent` and provide 4 methods: `renderMobile`, `renderTablet`, `renderDesktop`, `renderExtraWide`. If `renderMobile` is missing, it defaults to `renderTablet`. If `renderExtraWide` is missing, it defaults to `renderDesktop`.

```javascript
import ResponsiveComponent from 'components/responsive/responsive-component';

class Component extends ResponsiveComponent {
  renderMobile() {...}
  renderTablet() {...}
  renderDesktop() {...}
  renderExtraWide() {...}
}
```

### Extends from `ResponsiveStyleComponent`

This pattern fit those that have zero markup changes but has to change style on different screen sizes. Just extends from `ResponsiveStyleComponent` and provide 2 methods: `responsiveStyle` and `renderWithResponsiveStyle`. `responsiveStyle` should return a mapping of `style` object for each device type. The appropriate `style` object will be passed to `renderWithResponsiveStyle` depending on screen size. You can also pass in key of other screen size (e.g. `[MOBILE]: TABLET`) if the 2 screen sizes display the same.

```javascript
import ResponsiveStyleComponent, {
  MOBILE, TABLET, DESKTOP, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import {wrapperStyle, mobileStyle, tabletStyle} from './component.style.js';

class Component extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [MOBILE]: {
        wrapper: [wrapperStyle, mobileStyle, this.props.style]
      },
      [TABLET]: MOBILE,
      [DESKTOP]: {
        wrapper: [wrapperStyle, this.props.style]
      },
      [EXTRA_WIDE]: DESKTOP
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

When only layout change and you never have to touch media queries you can use this pattern. Just use class names such as `pure-u-mo-*`, `pure-u-ta-*`, `pure-u-de-*` (custom created classes to support our own screen size break points) to specify device specific column width.

```javascript
import React from 'react';
import Radium from 'radium';
import { style } from './component.style';


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

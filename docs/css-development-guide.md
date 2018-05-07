# CSS Development Guide

## Common guidelines

- As we use inline-style `className` prop will only serve 2 purposes: help with testing or if those classes come from 3rd party libraries such as PureCSS. PureCSS usage is now deprecated though and should not be used for new features.

- CSS class name must follow [BEM convention](http://getbem.com/introduction/) and have this format: `{{block}}__{{element}}—{{modifier}}`. Block, element and modifier all must only contain lowercase alphanumeric characters and hyphen.

- CSS classes that are there for the sole purpose of testing must begin with `test--`.

- Sometime you will see something like: 
```css
height: `${height}px`,
lineHeight: `${height - 1}px`,
```
This is to fulfill optical center, for more information please take a look at: https://services.math.duke.edu/education/ccp/resources/write/design/graphic7.html

## Basic Use Case

We use vanilla inline styles and ES6 object rest/spread syntax to do style merging. A component module `{component-name}.js` will import it's style from a style module `{component-name}.style.js` in the same folder. Also it will import with relative import syntax.

```javascript
// components/component.js

import React from 'react';
import { style } from './component.style';


class Component extends React.Component {
  render() {
    return (
      <div style={ style }/>
    );
  }
}

export default Component;
```

```javascript
//componets/component.style.js

export const style = {
  background: 'red',
  height: '110px'
};
```

## Merge Styles

To merge styles, simply use spread syntax:

```javascript
<div style={ { ...inlineStyle, ...styleFromProps } }/>
```

## Layout

We only use vanilla inline style to layout components nowaday because most of our layouts do not easily fit into any grid system.

## Responsiveness

**Important Note:** Mobile layout is disabled for now and will most likely render the same as tablet layout. Mobile devices should be pointed to mobile site which live under `CPDBv2_mobile` repo.

There are 3 breakpoints:
- **Extra wide**: 1200px and up
- **Desktop**: 992px - 1200px
- **Tablet**: 768px - 992px
- Everything below tablet size render tablet layout.

Below are components that help with responsiveness:

### ResponsiveComponent

Very simple to use - simply provide a component for each screen size. Use this if layout change drastically from one screen size to another.

Props:

- **extraWideChildren**: the component to be rendered at extra wide size.
- **desktopChildren**: the component to be rendered at desktop size.
- **tabletChildren**: the component to be rendered at tablet size.

Examples:

```javascript
<ResponsiveComponent
  extraWideChildren={ this.renderTwoColumns({
    leftBar: leftBarStyle[EXTRA_WIDE](),
    rightBar: rightBarStyle[EXTRA_WIDE](),
    question: questionStyle[EXTRA_WIDE]
  }) }
  desktopChildren={ this.renderTwoColumns({
    leftBar: leftBarStyle[DESKTOP](),
    rightBar: rightBarStyle[DESKTOP](),
    question: questionStyle[DESKTOP]
  }) }
  tabletChildren={ this.renderOneColumn() }/>
```

### ResponsiveStyleComponent

A little more sophisticated but more code reuse. Use this if the markup stay the same and only thing change is style.

Props:

- **responsiveStyle**: accept an object that specify style objects to be used for each screen size.
- **children**: accept a single function that will be called with each style object defined in `responsiveStyle` to produce corresponding markup for each screen size.

Example:

```javascript
  renderWithResponsiveStyle(style) {
    return (
      <p style={ style.content }>
        { this.props.children }
      </p>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ {
          [TABLET]: {
            content: { ...contentStyle, ...contentTabletStyle, ...this.props.style }
          },
          [DESKTOP]: {
            content: { ...contentStyle, ...this.props.style }
          }
        } }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
```

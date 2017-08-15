# Animation Development Guide

We mainly use [React Motion](https://github.com/chenglou/react-motion) but it isn't strictly required. You can use css animation or css transition, as long as you write inline-style and document the new pattern here. Usage of `ReactCSSTransitionGroup` is strictly forbidden as it uses class name to drive animation. Below are some reuseable animation component we've built:

## ExpandMotion

It will expand it's `children` into existence or hide it away depending on `show`'s value. It will only show `children` as dropdown for now.

Example:

```javascript
  <ExpandMotion show={ displayCoaccusedDropdown }>
    <CoaccusedList currentOfficerId={ officerId } coaccused={ coaccused }
      openBottomSheetWithComplaint={ openBottomSheetWithComplaint } crid={ crid }/>
  </ExpandMotion>
```

## FadeMotion

It is the same as `ExpandMotion` only it will fade it's `children` into existence rather than expanding. Max opacity can also be controlled with `maxOpacity`

Example:

```javascript
<FadeMotion show={ displayCoaccusedDropdown } maxOpacity={ .5 }>
  { this.renderOverlay }
</FadeMotion>
```

## RouteTransition

Page transition with fade animation when app route change by changing `pathname` prop.

Example:

```javascript
<RouteTransition pathname={ pathname }>
  { this.children() }
</RouteTransition>
```

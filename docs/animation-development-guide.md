# Animation Development Guide

We mainly use [React Motion](https://github.com/chenglou/react-motion) but animation is tricky business. You can use css animation or css transition, as long as you write inline-style and document the new pattern here. Usage of `ReactCSSTransitionGroup` is strictly forbidden as it use class name to drive animation.

So far the most relevant component of React Motion to our project is `TransitionMotion` as our usecase is mainly about what animate when something render differently.

## ExpandTransition

This component will animate it's child expanding downward when it believes it just received a new child, and will similarly animate it's child contracting upward when it believes it's child is gone. Under the hood, it uses `TransitionMotion`.

Note that when `global.disableAnimation` is true, `ExpandTransition` will render it's child in full height immediately with no animation. You can use `withAnimationDisabled` from `utils/test` module to disable animation during test.

### Usage

```javascript
import ExpandTransition from 'components/animation/expand-transition';
...
<ExpandTransition
  childKey={ 'my-div' }
  onFullyClosed={ (leavingChildKey) => {...} }
  onExpandingBegin={ (enteringChildKey) => {...} }>
  <div>Static markup here!</div>
</ExpandTransition>
```

### Props

- **childKey: String or Number**

`ExpandTransition` relies on `childKey` to tell if it just received a new child or no child at all. So `childKey` should be unique to each child that you may pass to `ExpandTransition`. When `childKey` is null and there's no animation happening, `ExpandTransition` will render nothing.

- **children: React element - Required**

`children` must be one React element only. Further more it's inner height should be calculatable as `ExpandTransition` will calculate a child's full height when it just received a new child for height interpolation. So only static markup is recommended within `children`, nothing magical please. `children` should also merge `style` prop that is passed down to it. Specifically `height` style will be animated.

- **onExpandingBegin: (enteringChildKey) => {}**

`onExpandingBegin` will be called exactly at the moment when animation begin when `ExpandTransition` just received a child and it's height begin at 0. The `childKey` associated with this child will be passed to callback.

- **onFullyClosed: (leavingChildKey) => {}**

`onFullyClosed` will be called when a child has fully leaved and it's height is back to 0. The `childKey` associated with this child is passed to callback.

See an example of how to use it [here](../src/js/components/animation/expand-transition.js)

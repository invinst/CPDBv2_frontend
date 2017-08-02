# Miscellaneous Frontend Best Practices

## Import & Module

- JS file and folder name may only contain lowercase alphanumeric characters and hyphen.

- Separate your imports into 2 sections: 3rd party libraries and our own code.

- If a module contain many things, import exactly those things that you require, not the whole module. i.e. `import { findDOMNode, unmountComponentAtNode } from 'react-dom';` is good, `import ReactDOM from 'react-dom';` is less nice.

## Testing

- Test module will live at the exact same path as the module it wishes to test. For example, `test/components/common/article-footer.js` will contain test for `src/js/components/common/article-footer.js`.

- When you need factory, use one or create one using [rosie](https://github.com/rosiejs/rosie). See [here](../src/js/utils/test/factories/story.js) for example.

- Some components need required props in order to work. To test such component with `should.renderable()` (which doesn't pass down any prop), use `defaultProps`. See example in [here](../src/js/components/common/faq/faq-item.js).

- Sometime you need to update a component's prop during test. In such case, use `ReactDOM.render` to render the same component with different props. Don't use `ReactTestUtils.renderIntoDocument`, instead use `reRender` from `utils/test` module as the former will just render your component into another root element, while the latter will reRender with the same root element. See example [here](../test/components/animation/fade-transition.js).

## Style

- Wrap your markup in () before returning it and start markup on a separate line, make it easier to read. e.g.
```javascript
return (
  <p>some text</p>
);
```

## Miscellaneous

- Use arrow functions when the function still look good defined inline and/or it need to use `this` from outside scope. Callback prop to children is thus a very good usecase for arrow function.

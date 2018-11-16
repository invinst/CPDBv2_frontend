import React from 'react';


export default function contextWrapper(context, contextTypes, children) {
  const wrapperWithContext = React.createClass({
    childContextTypes: contextTypes,
    getChildContext() {
      return context;
    },
    render() {
      return children;
    },
  });
  return React.createElement(wrapperWithContext);
}

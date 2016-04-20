import React from 'react';
import ReactDOM from 'react-dom';

export default class HelloWorld extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, foo</h1>
      </div>
    );
  }
}

// // detect test runner, there's for sure a better way
// if (typeof window.it !== 'function')
//   ReactDOM.render(<HelloWorld name='World' />, document.getElementById('App'));

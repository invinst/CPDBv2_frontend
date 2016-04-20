import React from 'react';

export default class HelloWorld extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, { this.props.name }</h1>
      </div>
    );
  }
}

HelloWorld.propTypes = {
  name: React.PropTypes.string.isRequired
};

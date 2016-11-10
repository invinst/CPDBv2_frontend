import React, { Component, PropTypes } from 'react';


class ContextWrapper extends Component {
  getChildContext() {
    return this.props.context;
  }
  render() {
    const { children } = this.props;
    return children;
  }
}

ContextWrapper.propTypes = {
  context: PropTypes.object,
  children: PropTypes.node
};

export default ContextWrapper;

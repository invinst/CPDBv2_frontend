import React, { Component } from 'react';
import PropTypes from 'prop-types';

import browserHistory from 'utils/history';


export default class NavigationWrapper extends Component {
  handleClick = (event) => {
    event.stopPropagation();
    const { to } = this.props;
    if (to) {
      browserHistory.push(to);
    }
  };

  render() {
    const { children, className } = this.props;

    return (
      <div
        className={ className }
        onClick={ this.handleClick }
      >
        { children }
      </div>
    );
  }
}

NavigationWrapper.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

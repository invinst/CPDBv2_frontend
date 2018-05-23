import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Hoverable from 'components/common/higher-order/hoverable';
import { wrapperStyle, textStyle, arrowStyle } from './navigation-button.style';


class NavigationButton extends Component {
  render() {
    const { text, hovering, to } = this.props;

    return (
      <Link
        style={ wrapperStyle(hovering) }
        to={ to }
      >
        <span style={ textStyle }>{ text }</span>
        <div style={ arrowStyle(hovering) }/>
      </Link>
    );
  }
}

NavigationButton.propTypes = {
  hovering: PropTypes.bool,
  to: PropTypes.string,
  text: PropTypes.string
};

export default Hoverable(NavigationButton);

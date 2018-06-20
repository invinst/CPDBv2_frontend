import React, { Component, PropTypes } from 'react';

import { rightArrowStyle, rightNavigationStyle } from './right-navigation.style';
import Hoverable from 'components/common/higher-order/hoverable';


class RightNavigation extends Component {
  render() {
    const { text, onClickHandler, hovering } = this.props;

    return (
      <span
        className='test--radar-explainer-navigation-right'
        style={ rightNavigationStyle(hovering) }
        onClick={ onClickHandler }
      >
        { text }
        <div style={ rightArrowStyle(hovering) }/>
      </span>
    );
  }
}

RightNavigation.propTypes = {
  text: PropTypes.string,
  onClickHandler: PropTypes.func,
  hovering: PropTypes.bool,
};

export default Hoverable(RightNavigation);

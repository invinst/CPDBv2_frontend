import React, { Component, PropTypes } from 'react';

import { leftArrowStyle, leftNavigationStyle } from './left-navigation.style';
import Hoverable from 'components/common/higher-order/hoverable';


class LeftNavigation extends Component {
  render() {
    const { text, onClickHandler, hovering } = this.props;

    return (
      <span
        className='test--radar-explainer-navigation-left'
        style={ leftNavigationStyle(hovering) }
        onClick={ onClickHandler }
      >
        <div style={ leftArrowStyle(hovering) }/>
        { text }
      </span>
    );
  }
}

LeftNavigation.propTypes = {
  text: PropTypes.string,
  onClickHandler: PropTypes.func,
  hovering: PropTypes.bool,
};

export default Hoverable(LeftNavigation);

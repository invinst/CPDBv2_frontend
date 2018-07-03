import React, { Component, PropTypes } from 'react';

import { wrapperStyle, textStyle, arrowStyle } from './navigation-button.style';


export default class NavigationButton extends Component {
  render() {
    const { text, hovering } = this.props;

    return (
      <div
        className='test--navigation-button'
        style={ wrapperStyle(hovering) }
      >
        <span style={ textStyle }>{ text }</span>
        <div style={ arrowStyle(hovering) }/>
      </div>
    );
  }
}

NavigationButton.defaultProps = {
  hovering: false,
};

NavigationButton.propTypes = {
  hovering: PropTypes.bool,
  text: PropTypes.string
};

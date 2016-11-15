import React, { Component, PropTypes } from 'react';

import {
  baseStyle, underlineStyle, underlineWrapperStyle, underlineHoverStyle,
  baseHoverStyle
} from './underline-text.style';


export default class UnderlineText extends Component {
  render() {
    const { hovering, children, style, onClick } = this.props;
    const _baseStyle = style.base || {};
    const _underlineStyle = style.underline || {};

    return (
      <span onClick={ onClick }
        className='link--transition'
        style={ hovering ?
          { ...baseHoverStyle, ..._baseStyle.hover } :
          { ...baseStyle, ..._baseStyle.base }
        }>
        { children }
        <span style={ underlineWrapperStyle }>
          <span className='link--transition'
            style={ hovering ?
              { ...underlineHoverStyle, ..._underlineStyle.hover } :
              { ...underlineStyle, ..._underlineStyle.base }
            }/>
        </span>
      </span>
    );
  }
}

UnderlineText.propTypes = {
  hovering: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.shape({
    base: PropTypes.shape({
      base: PropTypes.object,
      hover: PropTypes.object
    }),
    underline: PropTypes.shape({
      base: PropTypes.object,
      hover: PropTypes.object
    })
  }),
  onClick: PropTypes.func
};

UnderlineText.defaultProps = {
  style: {}
};

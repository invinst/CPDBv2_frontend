import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { handleStyle, textStyle } from './handle.style';

export default class Handle extends React.Component {
  render() {
    const {
      className, vertical, offset, style, disabled, min, max, value, ...restProps,
    } = this.props;

    delete restProps.dragging;
    delete restProps.index;

    const postionStyle = vertical ?
      { bottom: `${offset}%` } :
      { left: `${offset}%` };
    const elStyle = {
      ...handleStyle,
      ...style,
      ...postionStyle
    };
    let ariaProps = {};
    if (value !== undefined) {
      ariaProps = {
        'aria-valuemin': min,
        'aria-valuemax': max,
        'aria-valuenow': value,
        'aria-disabled': !!disabled,
      };
    }

    const classNames = classnames(className, 'test--social-graph-slider-handle');
    return (
      <div
        role='slider'
        tabIndex='0'
        { ...ariaProps }
        { ...restProps }
        className={ classNames }
        style={ elStyle }
      >
        <div style={ textStyle }>{ value }</div>
      </div>
    );
  }
}

Handle.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  offset: PropTypes.number,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
};

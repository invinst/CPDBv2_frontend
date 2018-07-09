import React, { Component, PropTypes } from 'react';


import {
  rowStyle,
  rowTitleItemStyle,
  rowValueItemStyle,
} from './row.style';


export default class Row extends Component {
  render() {
    const { title, drawBorder, children, borderValue } = this.props;
    return (
      <div style={ rowStyle(drawBorder) }>
        <div style={ rowTitleItemStyle }>{ title }</div>
        <div style={ rowValueItemStyle(borderValue) }>
          { children }
        </div>
      </div>

    );
  }
}

Row.defaultProps = {
  drawBorder: false,
  borderValue: false,
};

Row.propTypes = {
  title: PropTypes.string,
  drawBorder: PropTypes.bool,
  borderValue: PropTypes.bool,
  children: PropTypes.node,
};

import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import {
  rowStyle,
  rowTitleItemStyle,
  rowValueItemStyle,
} from './row.style';
import Popup from 'components/common/popup';


export default class Row extends Component {
  render() {
    const { title, drawBorder, children, borderValue, popup, pathName } = this.props;
    return (
      <div style={ rowStyle(drawBorder) }>
        <div style={ rowTitleItemStyle }>
          { title }
          { !isEmpty(popup) ? <Popup { ...popup } position='relative' url={ pathName }/> : null }
        </div>
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
  popup: PropTypes.object,
  pathName: PropTypes.string,
};

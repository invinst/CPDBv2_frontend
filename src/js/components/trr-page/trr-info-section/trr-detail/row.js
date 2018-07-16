import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';


import {
  rowStyle,
  rowTitleItemStyle,
  rowValueItemStyle,
  popupStyle,
} from './row.style';
import Popup from 'components/common/popup';
import { POPUP_NAMES } from 'utils/constants';


export default class Row extends Component {
  constructor(props) {
    super(props);
    this.showPopup = this.showPopup.bind(this);
  }

  showPopup() {
    const { title, popup } = this.props;
    if (title === 'FORCE CATEGORY') {
      return (
        <Popup
          { ...get(popup, POPUP_NAMES.TRR.FORCE_CATEGORY) }
          style={ popupStyle }
        />
      );
    } else if (title === 'TYPES OF FORCE') {
      return (
        <Popup
          { ...get(popup, POPUP_NAMES.TRR.TYPES_OF_FORCE) }
          style={ popupStyle }
        />
      );
    }
  }

  render() {
    const { title, drawBorder, children, borderValue } = this.props;
    return (
      <div style={ rowStyle(drawBorder) }>
        <div style={ rowTitleItemStyle }>{ title }
          { this.showPopup() }
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
};

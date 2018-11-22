import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import cx from 'classnames';

import style from './row.sass';
import Popup from 'components/common/popup';


export default class Row extends Component {
  render() {
    const { title, children, borderValue, popup, pathName, twoRowsWhenPrint } = this.props;
    return (
      <div className={ style.trrDetailRow }>
        <div className={ cx('trr-detail-row-title', { 'inline-print': twoRowsWhenPrint }) }>
          { title }
          { !isEmpty(popup) ? <Popup { ...popup } url={ pathName }/> : null }
        </div>
        <div className={ cx('trr-detail-row-value', { box: borderValue, 'inline-print': twoRowsWhenPrint }) }>
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
  borderValue: PropTypes.bool,
  twoRowsWhenPrint: PropTypes.bool,
  children: PropTypes.node,
  popup: PropTypes.object,
  pathName: PropTypes.string,
};

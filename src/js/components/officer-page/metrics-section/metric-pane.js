import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import { wrapperStyle, valueStyle, nameStyle, descriptionStyle } from './metric-pane.style';
import Popup from 'components/common/popup';


export default class MetricPane extends Component {

  render() {
    const { value, name, description, borderTop, dashedBorder, highlightValue, popup, pathName } = this.props;
    const active = value !== 0;

    return (
      <div style={ wrapperStyle(borderTop, dashedBorder) }>
        <div className='test--metrics-pane-value' style={ valueStyle(active, highlightValue) }>
          { value }
        </div>
        <div className='test--metrics-pane-name' style={ nameStyle(active) }>
          { name }
        </div>
        <div className='test--metrics-pane-description' style={ descriptionStyle }>
          { description }
        </div>
        { !isEmpty(popup) ? <Popup { ...popup } url={ pathName } /> : null }
      </div>
    );
  }
}

MetricPane.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  description: PropTypes.string,
  borderTop: PropTypes.bool,
  dashedBorder: PropTypes.bool,
  highlightValue: PropTypes.bool,
  popup: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    style: PropTypes.object,
    position: PropTypes.string,
  }),
  pathName: PropTypes.string,
};

MetricPane.defaultProps = {
  borderTop: false,
  dashedBorder: false,
  highlightValue: false,
};

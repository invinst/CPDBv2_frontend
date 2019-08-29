import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import cx from 'classnames';

import Popup from 'components/common/popup';
import styles from './metric-pane.sass';


export default class MetricPane extends Component {

  render() {
    const { value, name, description, dashedBorder, highlightValue, popup, pathName } = this.props;
    const active = value !== 0;

    return (
      <div
        className={
          cx(
            styles.metricPane,
            {
              'active': active,
              'dashed-border': dashedBorder,
              'highlight-value': highlightValue,
            }
          )
        }
      >
        <div className='metrics-pane-value'>
          { value }
        </div>
        <div className='metrics-pane-name'>
          { name }
        </div>
        <div className='metrics-pane-description'>
          { description }
        </div>
        {
          !isEmpty(popup) ? (
            <Popup
              { ...popup }
              popupButtonClassName='metric-pane-popup-button'
              url={ pathName }
            />
          ) : null
        }
      </div>
    );
  }
}

MetricPane.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  description: PropTypes.string,
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
  dashedBorder: false,
  highlightValue: false,
};

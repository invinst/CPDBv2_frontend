import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import styles from './new-metric-widget-item.sass';


export default function MetricWidgetItem(props) {
  const { value, name, description, isHighlight, isFirstItem } = props;
  const active = value > 0;

  return (
    <div className={ cx(styles.wrapper, { 'is-first-item': isFirstItem }) }>
      <div className={ cx(
        'test--metric-widget-item-value',
        styles.value,
        { 'active': active },
        { 'highlight': isHighlight }) }
      >
        { value }
      </div>
      <div className={ cx('test--metric-widget-item-name', styles.name, { 'active': active }) }>
        { name }
      </div>
      <div className={ cx('test--metric-widget-item-description', styles.description) }>
        { description }
      </div>
    </div>
  );
}

MetricWidgetItem.defaultProps = {
  isHighlight: false,
  description: '',
};

MetricWidgetItem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.node,
  description: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isHighlight: PropTypes.bool,
  isFirstItem: PropTypes.bool,
};

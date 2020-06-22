import React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './widget.sass';


const Widget = ({ widgetTitle, children, isVisualization }) => {
  return (
    <div className={ styles.widget }>
      <div className={ cx('widget-title', { 'visualization-title': isVisualization }) }>{ widgetTitle }</div>
      { children }
    </div>
  );
};

Widget.propTypes = {
  widgetTitle: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  isVisualization: PropTypes.bool,
};

export default Widget;

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';

import { ANIMATION_DURATION } from 'utils/constants';
import styles from './radar-legend.sass';


const RADAR_LEGEND_TRANSITION_CLASS_NAMES = {
  exit: styles.radarLegendTransitionExit,
  exitActive: styles.radarLegendTransitionExitActive,
};

export default function RadarLegend(props) {
  const { fadeOut, content } = props;
  if (content) {
    return (
      <CSSTransition
        in={ !fadeOut }
        unmountOnExit={ true }
        timeout={ ANIMATION_DURATION }
        classNames={ RADAR_LEGEND_TRANSITION_CLASS_NAMES }>
        <text
          className={ cx('test--radar-legend-content no-print', styles.radarLegend) }
          textAnchor='middle'
          dy='0.35em'
          x={ 180 }
          y={ 180 }>
          { content }
        </text>
      </CSSTransition>
    );
  }
  return null;
}

RadarLegend.propTypes = {
  fadeOut: PropTypes.bool,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
};

RadarLegend.defaultProps = {
  fadeOut: false,
};

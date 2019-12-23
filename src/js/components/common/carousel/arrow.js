import React, { PropTypes } from 'react';
import cx from 'classnames';

import styles from './arrow.sass';

function Arrow(props) {
  const { direction, onClick, show, style, className } = props;
  if (!show) return null;
  return (
    <button
      className={ cx(styles.arrow, direction, className, `test--carousel-arrow-${direction}`) }
      style={ { ...style } }
      onClick={ () => onClick(direction) }/>
  );
}

Arrow.propTypes = {
  direction: PropTypes.string,
  show: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Arrow;
export const arrowWidth = 40;

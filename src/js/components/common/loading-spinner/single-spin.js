import PropTypes from 'prop-types';
import React from 'react';

import styles from './common.sass';


export default function SingleSpin(props) {
  const { transform, begin, fill } = props;
  return (
    <g className={ styles.animation } transform={ transform }>
      <rect
        className={ styles.animation }
        x='47' y='24' rx='9.4' ry='4.8' width='6' height='12' fill={ fill }
      >
        <animate
          className={ styles.animation }
          attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin={ begin } repeatCount='indefinite'
        />
      </rect>
    </g>
  );
}

SingleSpin.propTypes = {
  transform: PropTypes.string,
  begin: PropTypes.string,
  fill: PropTypes.string,
};

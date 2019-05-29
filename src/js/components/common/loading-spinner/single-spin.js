import React, { Component, PropTypes } from 'react';

import styles from './common.sass';


export default class SingleSpin extends Component {
  render() {
    const { transform, begin, fill } = this.props;
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
}

SingleSpin.propTypes = {
  transform: PropTypes.string,
  begin: PropTypes.string,
  fill: PropTypes.string,
};

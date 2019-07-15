import React, { PropTypes } from 'react';
import cx from 'classnames';

import styles from './magnifying-glass.sass';


export default class MagnifyingGlass extends React.Component {
  render() {
    const { className, color, size, ...rest } = this.props;
    return (
      <svg
        className={ cx(className, styles.magnifyingGlass) }
        xmlns='http://www.w3.org/2000/svg'
        width={ size }
        height={ size }
        viewBox='0 0 17 17'
        { ...rest }
      >
        <path
          fill={ color } fillRule='nonzero'
          d='M16.853 16.133l-4.132-4.131a7.218 7.218 0 0 0 1.78-4.753c0-4-3.254-7.249-7.25-7.249C3.25 0 0 3.253 0
          7.249c0 3.995 3.254 7.248 7.25 7.248 1.817 0 3.48-.67 4.754-1.779l4.133 4.131a.497.497 0 0 0 .716 0 .51.51 0
          0 00-.716zM1.014 7.249a6.238 6.238 0 0 1 6.232-6.231 6.238 6.238 0 0 1 6.233 6.23c0 3.434-2.794 6.235-6.233
          6.235A6.242 6.242 0 0 1 1.014 7.25z' />
      </svg>
    );
  }
}


MagnifyingGlass.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
};

MagnifyingGlass.defaultProps = {
  color: '#005EF4',
};

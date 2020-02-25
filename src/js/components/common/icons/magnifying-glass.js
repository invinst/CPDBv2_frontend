import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import styles from './magnifying-glass.sass';


export default function MagnifyingGlass(props) {
  const { className, color, size, ...rest } = props;
  return (
    <svg
      className={ cx(className, styles.magnifyingGlass) }
      xmlns='http://www.w3.org/2000/svg'
      width={ size }
      height={ size }
      viewBox='0 0 12 12'
      { ...rest }
    >
      <path
        fill={ color } fillRule='nonzero'
        d='M11.837 10.377L9.5 8.04a.562.562 0 0 0-.399-.164H8.72A4.875 4.875 0 0 0 4.875 0 4.875 4.875
        0 0 0 0 4.875 4.875 4.875 0 0 0 7.876 8.72v.382c0 .15.058.293.164.399l2.337
        2.337c.22.22.576.22.794 0l.663-.664c.22-.22.22-.576.003-.796zM4.875 7.876c-1.657 0-3-1.341-3-3 0-1.658
        1.34-3 3-3 1.658 0 3 1.34 3 3 0 1.657-1.34 3-3 3z'
      />
    </svg>
  );
}


MagnifyingGlass.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
};

MagnifyingGlass.defaultProps = {
  color: '#005EF4',
};

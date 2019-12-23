import PropTypes from 'prop-types';
import React from 'react';

import styles from './demographic.sass';

export default function Demographics(props) {
  const { persons, className } = props;

  return (
    <div className={ className }>
      {
        persons.map((person, ind) => (
          <div key={ ind } className={ styles.demographic }>
            { person }
          </div>
        ))
      }
    </div>
  );
}

Demographics.propTypes = {
  persons: PropTypes.array,
  className: PropTypes.string,
};

Demographics.defaultProps = {
  persons: [],
};

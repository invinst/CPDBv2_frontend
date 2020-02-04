import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import styles from './view-unit-profile-button.sass';


export default function ViewUnitProfileButton(props) {
  const { unitName } = props;

  return (
    <Link
      className={ cx(styles.viewUnitProfileButton, 'no-print') }
      to={ `/unit/${unitName}/` }
    >
      <span className='view-unit-profile-button-text'>View Unit Profile</span>
      <div className='view-unit-profile-button-arrow'/>
    </Link>
  );
}

ViewUnitProfileButton.propTypes = {
  unitName: PropTypes.string,
};

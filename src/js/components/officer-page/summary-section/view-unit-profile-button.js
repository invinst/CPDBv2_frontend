import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import styles from './view-unit-profile-button.sass';


export default class ViewUnitProfileButton extends Component {
  render() {
    const { unitName } = this.props;

    return (
      <Link
        className={ cx(styles.viewUnitProfileButton, 'no-print', 'test--view-profile-button') }
        to={ `/unit/${unitName}/` }
      >
        <span className='view-unit-profile-button-text'>View Unit Profile</span>
        <div className='view-unit-profile-button-arrow'/>
      </Link>
    );
  }
}

ViewUnitProfileButton.propTypes = {
  hovering: PropTypes.bool,
  unitName: PropTypes.string
};

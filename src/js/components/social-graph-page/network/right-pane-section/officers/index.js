import React, { PropTypes } from 'react';

import styles from './officers.sass';
import OfficerRow from './officer-row';
import withLoadingSpinner from 'components/common/with-loading-spinner';


export default function Officers(props) {
  const { officers, updateSelectedOfficerId } = props;

  return (
    <div className={ styles.officersSection }>
      {
        officers.map((officer) => (
          <OfficerRow
            key={ officer.id }
            officer={ officer }
            updateSelectedOfficerId={ updateSelectedOfficerId }
          />
        ))
      }
    </div>
  );
}

Officers.propTypes = {
  officers: PropTypes.array,
  officer: PropTypes.object,
  updateSelectedOfficerId: PropTypes.func,
};

Officers.defaultProps = {
  officers: [],
};

export const OfficersWithSpinner = withLoadingSpinner(Officers, styles.officersLoading);

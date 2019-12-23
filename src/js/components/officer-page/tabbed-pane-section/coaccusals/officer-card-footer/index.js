import React, { PropTypes } from 'react';
import pluralize from 'pluralize';

import styles from './officer-card-footer.sass';


export default function OfficerCardFooter(props) {
  const { coaccusalCount } = props;
  return (
    <div className={ styles.officerCardFooter }>
      Coaccused in { pluralize('case', coaccusalCount, true) }.
    </div>
  );
}

OfficerCardFooter.propTypes = {
  coaccusalCount: PropTypes.number,
};

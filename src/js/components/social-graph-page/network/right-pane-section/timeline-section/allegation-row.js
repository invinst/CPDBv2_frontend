import React, { Component, PropTypes } from 'react';

import styles from './allegation-row.sass';


export default class AllegationRow extends Component {
  render() {
    const { allegation } = this.props;

    return (
      <div className={ styles.allegationRow }>
        <div className='allegation-info'>
          <div className='allegation-crid'>{ allegation.crid }</div>
          <div className='allegation-incident-date'>{ allegation.incidentDate }</div>
          <div className='clearfix' />
          <div className='allegation-category'>{ allegation.category }</div>
          <div className='allegation-subcategory'>{ allegation.subcategory }</div>
        </div>
      </div>
    );
  }
}

AllegationRow.propTypes = {
  allegation: PropTypes.object,
};

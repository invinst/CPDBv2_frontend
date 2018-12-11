import React, { PropTypes, Component } from 'react';
import pluralize from 'pluralize';

import styles from './officer-card-footer.sass';


export default class OfficerCardFooter extends Component {
  render() {
    const { coaccusalCount } = this.props;
    return (
      <div className={ styles.officerCardFooter }>
        Coaccused in { pluralize('case', coaccusalCount, true) }.
      </div>
    );
  }
}

OfficerCardFooter.propTypes = {
  coaccusalCount: PropTypes.number,
};

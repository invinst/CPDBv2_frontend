import React, { PropTypes, Component } from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';

import styles from './officer-card-footer.sass';


export default class OfficerCardFooter extends Component {
  render() {
    const { coaccusalCount } = this.props;
    return (
      <div className={ cx(styles.officerCardFooter, 'test--officer-card-footer') }>
        Coaccused in { pluralize('case', coaccusalCount, true) }.
      </div>
    );
  }
}

OfficerCardFooter.propTypes = {
  coaccusalCount: PropTypes.number,
};

import React, { PropTypes } from 'react';
import pluralize from 'pluralize';

import { compact, isEmpty } from 'lodash';
import cx from 'classnames';

import SuggestionItemBase from './base';
import styles from './officer.sass';


class OfficerItem extends SuggestionItemBase {
  getExtraInnerWrapperClassName() {
    return styles.innerWrapper;
  }

  renderSecondRow() {
    const { isFocused } = this.props;
    const { age, race, gender, complaintCount, sustainedCount } = this.props.suggestion;
    const ageString = age ? `${age} year old` : null;
    const demographic = compact([ageString, race, gender]);

    return (
      <div className={ cx('test--second-row', styles.grayText) }>
        { !isEmpty(demographic) && <span>{ demographic.join(', ') }, </span> }
        <span
          className={ cx(
            'complaints-text',
            { active: isFocused, 'non-zero-count': complaintCount > 0 }
          ) }
        >
          { `${pluralize('Complaint', complaintCount, true)}, ` }
        </span>
        <span
          className={ cx(
            'sustained-text',
            { 'active': isFocused, 'non-zero-count': sustainedCount > 0 }
          ) }
        >
          { sustainedCount } Sustained
        </span>
      </div>
    );
  }
}

OfficerItem.propTypes = {
  suggestion: PropTypes.shape({
    sustainedCount: PropTypes.number,
    birthYear: PropTypes.number,
    race: PropTypes.string,
    gender: PropTypes.string,
    complaintCount: PropTypes.number,
  }),
  isFocused: PropTypes.bool
};

OfficerItem.defaultProps = {
  suggestion: {
    complaintCount: 0,
    sustainedCount: 0
  },
};

export default OfficerItem;

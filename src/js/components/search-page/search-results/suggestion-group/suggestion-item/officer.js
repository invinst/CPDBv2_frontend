import React, { PropTypes } from 'react';
import pluralize from 'pluralize';

import { compact, isEmpty } from 'lodash';

import SuggestionItemBase from './base';
import { grayTextStyle } from './base.style';
import { complaintsTextStyle, sustainedTextStyle } from './officer.style';


class OfficerItem extends SuggestionItemBase {
  renderSecondRow() {
    const { hovering, isFocused } = this.props;
    const { age, race, gender, complaintCount, sustainedCount } = this.props.suggestion;
    const ageString = age ? `${age} year old` : null;
    const demographic = compact([ageString, race, gender]);

    return (
      <div style={ grayTextStyle }>
        { !isEmpty(demographic) && <span>{ demographic.join(', ') }, </span> }
        <span
          style={ complaintsTextStyle((isFocused || hovering) && complaintCount > 0) }>
          { `${pluralize('Complaint', complaintCount, true)}, ` }
        </span>
        <span
          style={ sustainedTextStyle((isFocused || hovering) && sustainedCount > 0) }>
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
  isFocused: PropTypes.bool,
  hovering: PropTypes.bool
};

OfficerItem.defaultProps = {
  suggestion: {
    complaintCount: 0,
    sustainedCount: 0
  },
};

export default OfficerItem;

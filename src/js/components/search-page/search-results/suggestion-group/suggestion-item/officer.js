import React, { PropTypes } from 'react';
import pluralize from 'pluralize';

import { compact } from 'lodash';

import SuggestionItemBase from './base';
import { grayTextStyle } from './base.style';
import { complaintsTextStyle, sustainedTextStyle } from './officer.style';


class OfficerItem extends SuggestionItemBase {
  renderSecondRow() {
    const { hovering, isFocused } = this.props;
    const { age, race, gender, complaintCount, sustainedCount } = this.props.suggestion;
    const officerInfo = compact([`${age} year old`, race, gender]).join(', ');

    return (
      <div style={ grayTextStyle }>
        <span>{ officerInfo }, </span>
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

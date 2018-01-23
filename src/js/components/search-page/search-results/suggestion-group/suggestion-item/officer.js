import React, { PropTypes } from 'react';
import pluralize from 'pluralize';

import SuggestionItemBase from './base';
import { grayTextStyle } from './base.style';
import { complaintsTextStyle, sustainedTextStyle } from './officer.style';


class OfficerItem extends SuggestionItemBase {
  renderSecondRow() {
    const { hovering, isFocused } = this.props;
    const { demographicInfo, complaintCount, sustainedCount } = this.props.suggestion;

    return (
      <div style={ grayTextStyle }>
        <span>{ demographicInfo }, </span>
        <span
          style={ complaintsTextStyle((isFocused || hovering) && complaintCount > 0) }>
          { `${pluralize('Complaint', complaintCount, true)}, ` }
        </span>
        <span
          style={ sustainedTextStyle((isFocused ||hovering) && sustainedCount > 0) }>
          { sustainedCount } Sustained
        </span>
      </div>
    );
  }
}

OfficerItem.propTypes = {
  suggestion: PropTypes.object,
  isFocused: PropTypes.bool,
  hovering: PropTypes.bool
};

OfficerItem.defaultProps = {
  suggestion: {},
  complaintCount: 0,
  sustainedCount: 0
};

export default OfficerItem;

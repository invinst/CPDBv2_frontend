import React, { Component, PropTypes } from 'react';

import { aHrefStyle, noResultItemStyle, suggestionGroupStyle, groupHeaderStyle } from './search-no-result.style';
import { dataToolSearchUrl } from 'utils/v1-url';
import OutboundLink from 'components/common/outbound-link';


export default class SuggestionNoResult extends Component {
  render() {
    const { searchText } = this.props;
    const complaintsDataToolSearchUrl = dataToolSearchUrl(searchText);

    return (
      <div style={ suggestionGroupStyle }>
        <div style={ groupHeaderStyle }>DATA TOOL</div>
        <OutboundLink href={ complaintsDataToolSearchUrl } style={ aHrefStyle }>
          <div style={ noResultItemStyle }>
            <div>Search "{ searchText }" in the data tool</div>
          </div>
        </OutboundLink>
      </div>
    );
  }
}


SuggestionNoResult.propTypes = {
  searchText: PropTypes.string
};

import React, { Component, PropTypes } from 'react';

import { noResultItemStyle, suggestionGroupStyle, groupHeaderStyle } from './suggestion-no-result.style';


export default class SuggestionNoResult extends Component {
  render() {
    const { searchText } = this.props;

    return (
      <div style={ suggestionGroupStyle }>
        <div style={ groupHeaderStyle }>Data Tool</div>
        <div style={ noResultItemStyle }>
          <div>Search "{ searchText }" on the Complaints Data Tool</div>
        </div>
        <div style={ noResultItemStyle }>
          <div>Search "{ searchText }" on the TIRR (Use of force) Data Tool</div>
        </div>
      </div>
    );
  }
}


SuggestionNoResult.propTypes = {
  searchText: PropTypes.string
};

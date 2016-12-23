import React, { Component, PropTypes } from 'react';

import { noResultItemStyle, suggestionGroupStyle, groupHeaderStyle } from './search-no-result.style';


export default class SuggestionNoResult extends Component {
  render() {
    const { searchText } = this.props;

    return (
      <div style={ suggestionGroupStyle }>
        <div style={ groupHeaderStyle }>Data Tool</div>
        <div style={ noResultItemStyle }>
          <div>Search "{ searchText }" in the complaints data tool</div>
        </div>
        <div style={ noResultItemStyle }>
          <div>Search "{ searchText }" in the use of force data tool</div>
        </div>
      </div>
    );
  }
}


SuggestionNoResult.propTypes = {
  searchText: PropTypes.string
};

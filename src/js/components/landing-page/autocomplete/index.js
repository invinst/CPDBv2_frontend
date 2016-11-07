import React, { Component, PropTypes } from 'react';
import { debounce } from 'lodash';

import SuggestionResults from './suggestion-results';
import SearchBox from './search-box';


export default class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getSuggestion = debounce(props.getSuggestion, 100);
    this.state = {
      value: ''
    };
  }

  handleChange(value) {
    this.getSuggestion({
      text: value
    });
  }

  render() {
    const { suggestionGroups, isRequesting } = this.props;

    return (
      <div>
        <div>
          Search by officer Name, badge number or complaint CRID, OR <a href='#'>view the Data</a>
        </div>
        <SearchBox handleChange={ this.handleChange }/>
        <SuggestionResults suggestionGroups={ suggestionGroups } isRequesting={ isRequesting } />
      </div>
      );
  }
}

Autocomplete.propTypes = {
  suggestionGroups: PropTypes.object,
  isRequesting: PropTypes.bool,
  getSuggestion: PropTypes.func
};

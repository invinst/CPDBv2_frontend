import React, { Component, PropTypes } from 'react';
import { debounce } from 'lodash';

import SuggestionResults from './suggestion-results';
import SearchBox from './search-box';
import SuggestionTags from './suggestion-tags';
import { backButtonStyle, autocompleteWrapperStyle, searchBoxStyle, helperTextStyle,
  resultWrapperStyle } from './autocomplete.style.js';


const DEFAULT_SUGGESTION_LIMIT = 10;

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getSuggestion = debounce(props.getSuggestion, 100);
    this.state = {
      value: ''
    };
  }

  handleChange({ currentTarget: { value } }) {
    const { contentType } = this.props;
    const limit = contentType ? null : DEFAULT_SUGGESTION_LIMIT;

    this.setState({
      value
    });

    if (value) {
      this.getSuggestion(value, { contentType, limit });
    } else {
      this.props.selectTag(null);
    }
  }

  handleSelect(contentType) {
    if (contentType === this.props.contentType) {
      this.getSuggestion(this.state.value);
    } else {
      this.getSuggestion(this.state.value, { contentType });
    }
  }

  renderContent() {
    const { suggestionGroups, isRequesting, tags, contentType } = this.props;

    if (this.state.value === '') {
      return (
        <div style={ resultWrapperStyle }>
          <div style={ helperTextStyle }>
            Type the name of a police officer, badge number, or CRID number.
          </div>
        </div>
      );
    }

    return (
      <div style={ resultWrapperStyle }>
        <SuggestionTags tags={ tags } onSelect={ this.handleSelect } selected={ contentType }/>
        <SuggestionResults
          suggestionGroups={ suggestionGroups }
          isRequesting={ isRequesting } />
      </div>
    );
  }

  render() {
    return (
      <div style={ autocompleteWrapperStyle }>
        <div style={ searchBoxStyle }>
          <span style={ backButtonStyle }/>
          <SearchBox onChange={ this.handleChange } value={ this.state.value }/>
        </div>
        <div style={ resultWrapperStyle }>
          { this.renderContent() }
        </div>
      </div>
    );
  }
}

Autocomplete.propTypes = {
  suggestionGroups: PropTypes.object,
  tags: PropTypes.array,
  isRequesting: PropTypes.bool,
  getSuggestion: PropTypes.func,
  selectTag: PropTypes.func,
  contentType: PropTypes.string
};

Autocomplete.defaultProps = {
  suggestionGroups: {},
  isRequesting: false,
  getSuggestion: () => {}
};


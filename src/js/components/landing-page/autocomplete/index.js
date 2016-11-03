import React, { Component, PropTypes } from 'react';
import { debounce } from 'lodash';

import SuggestionResults from './suggestion-results';
import SearchBox from './search-box';
import SuggestionTags from './suggestion-tags';
import { backButtonStyle, searchBoxStyle, helperTextStyle, resultWrapperStyle } from './autocomplete.style.js';


export default class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getSuggestion = debounce(props.getSuggestion, 100);
    this.state = {
      value: ''
    };
  }

  handleChange({ currentTarget: { value } }) {

    this.setState({
      value
    });

    if (value) {
      this.getSuggestion({
        text: value
      });
    }
  }

  renderContent() {
    const { suggestionGroups, isRequesting } = this.props;

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
        <SuggestionTags/>
        <SuggestionResults
          suggestionGroups={ suggestionGroups }
          isRequesting={ isRequesting } />
      </div>
    );
  }

  render() {
    return (
      <div>
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
  isRequesting: PropTypes.bool,
  getSuggestion: PropTypes.func
};

Autocomplete.defaultProps = {
  suggestionGroups: {},
  isRequesting: false,
  getSuggestion: () => {}
};


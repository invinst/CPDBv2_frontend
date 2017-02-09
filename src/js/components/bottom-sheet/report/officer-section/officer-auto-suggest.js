import React, { Component, PropTypes } from 'react';
import AutoSuggest from 'react-autosuggest';

import Input from 'components/common/input';
import {
  officerInputWrapperStyle, officerInputStyle, messageStyle, autoSuggestionTheme
} from './officer-auto-suggest.style';


export default class OfficerInput extends Component {
  constructor() {
    super();

    this.state = {
      officers: [],
      value: '',
      inputHasFocus: true
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderOfficerInput = this.renderOfficerInput.bind(this);
    this.handleSuggestionSelected = this.handleSuggestionSelected.bind(this);
    this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      officers: nextProps.officers
    });
  }

  renderOfficerInput(inputProps) {
    return (
      <div style={ officerInputWrapperStyle }>
        <Input
          { ...inputProps }
          style={ officerInputStyle }
          paddingVertical={ 10 }
          paddingHorizontal={ 10 }/>
      </div>
    );
  }

  handleBlur(event, { focusedSuggestion }) {
    this.setState({
      inputHasFocus: false
    });
  }

  handleChange(event) {
    this.props.onChange(null);
    this.setState({
      value: event.target.value,
      inputHasFocus: true
    });
  }

  handleSuggestionsFetchRequested({ value }) {
    const { searchOfficers } = this.props;
    const oldValue = this.state.value;

    if (value && value !== oldValue) {
      searchOfficers(value);
    }
  }

  handleSuggestionsClearRequested() {
    this.setState({
      officers: []
    });
  }

  handleSuggestionSelected(event, { suggestion }) {
    this.props.onChange(suggestion);
    this.setState({
      value: this.getSuggestionValue(suggestion)
    });
  }

  getSuggestionValue(suggestion) {
    return suggestion.fullName;
  }

  renderSuggestion(suggestion) {
    return <div>{ suggestion.fullName }</div>;
  }

  renderSuggestionsContainer({ children, ...rest }) {
    const { value, officers, inputHasFocus } = this.state;
    let content;

    if (children) {
      content = children;
    } else {
      content = value && !officers.length && inputHasFocus ? <div style={ messageStyle }>No match found</div> : null;
    }

    return (
      <div { ...rest }>{ content }</div>
    );
  }

  render() {
    const { officers, value } = this.state;
    const inputProps = {
      onChange: this.handleChange,
      placeholder: 'Name',
      onBlur: this.handleBlur,
      value
    };

    return (
      <AutoSuggest
        suggestions={ officers }
        onSuggestionsFetchRequested={ this.handleSuggestionsFetchRequested }
        onSuggestionsClearRequested={ this.handleSuggestionsClearRequested }
        getSuggestionValue={ this.getSuggestionValue }
        renderSuggestion={ this.renderSuggestion }
        renderInputComponent={ this.renderOfficerInput }
        renderSuggestionsContainer={ this.renderSuggestionsContainer }
        onSuggestionSelected={ this.handleSuggestionSelected }
        theme={ autoSuggestionTheme }
        inputProps={ inputProps }
      />
    );
  }
}

OfficerInput.propTypes = {
  searchOfficers: PropTypes.func,
  onChange: PropTypes.func,
  officers: PropTypes.array
};

OfficerInput.defaultProps = {
  officers: []
};

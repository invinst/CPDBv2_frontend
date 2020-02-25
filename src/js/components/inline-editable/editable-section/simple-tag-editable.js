import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { get, noop, difference } from 'lodash';
import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';

import Editable from 'components/inline-editable/editable';
import styles from './simple-tag-editable.sass';
import { EditWrapperStateContext } from 'contexts';


export default class SimpleTagEditable extends Component {
  autosuggestRenderInput = ({ addTag, ...inputProps }) => {
    const { fieldName, suggestionTags } = this.props;
    const { value, onChange, ref } = inputProps;
    const { value: tags } = get(this.context.fieldContexts, fieldName, {});
    const handleOnChange = (e, { _, method }) => {
      if (method === 'enter') {
        e.preventDefault();
      } else {
        onChange(e);
      }
    };

    const inputValue = (value && value.trim().toLowerCase()) || '';
    const inputLength = inputValue.length;

    let suggestions = difference(suggestionTags, tags).filter((tagName) => {
      return tagName.toLowerCase().slice(0, inputLength) === inputValue;
    });

    return (
      <Autosuggest
        ref={ ref }
        className='react-tagsinput-input'
        suggestions={ suggestions }
        shouldRenderSuggestions={ value => value && value.trim().length > 0 }
        getSuggestionValue={ suggestion => suggestion }
        renderSuggestion={ suggestion => <span>{suggestion}</span> }
        inputProps={ { ...inputProps, onChange: handleOnChange } }
        onSuggestionSelected={ (e, { suggestion }) => addTag(suggestion) }
        onSuggestionsClearRequested={ noop }
        onSuggestionsFetchRequested={ noop }
      />
    );
  };

  render() {
    const { fieldName } = this.props;
    const { editModeOn, value, onChange } = get(this.context.fieldContexts, fieldName, {});

    return (
      <Editable
        editModeOn={ editModeOn }
        editorElement={
          <TagsInput
            value={ value }
            className={ styles.editableTagsinputInput }
            onChange={ onChange }
            inputProps={ { className: 'react-tagsinput-input', placeholder: 'Enter tags' } }
            onlyUnique={ true }
            addKeys={ [13, 188] } // Enter & Comma
            addOnBlur={ true }
            renderInput={ this.autosuggestRenderInput }
          />
        }
        presenterElement={
          <TagsInput
            value={ value }
            className={ styles.editableTagsinputInput }
            inputProps={ { className: 'react-tagsinput-input', placeholder: '' } }
            disabled={ true }
          />
        }
      />
    );
  }
}

SimpleTagEditable.propTypes = {
  fieldName: PropTypes.string,
  suggestionTags: PropTypes.array,
};

SimpleTagEditable.defaultProps = {
  suggestionTags: [],
};

SimpleTagEditable.contextType = EditWrapperStateContext;

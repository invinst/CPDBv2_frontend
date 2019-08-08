import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import TagsInput from 'react-tagsinput';

import Editable from 'components/inline-editable/editable';
import styles from './simple-tag-editable.sass';


export default class SimpleTagEditable extends Component {
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
};

SimpleTagEditable.contextTypes = {
  fieldContexts: PropTypes.object
};

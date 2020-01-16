import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { get } from 'lodash';
import TagsInput from 'react-tagsinput';

import Editable from 'components/inline-editable/editable';
import styles from './simple-tag-editable.sass';
import { EditWrapperStateContext } from 'contexts';


export default function SimpleTagEditable(props) {
  const { fieldName } = props;
  const context = useContext(EditWrapperStateContext);
  const { editModeOn, value, onChange } = get(context.fieldContexts, fieldName, {});

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

SimpleTagEditable.propTypes = {
  fieldName: PropTypes.string,
};

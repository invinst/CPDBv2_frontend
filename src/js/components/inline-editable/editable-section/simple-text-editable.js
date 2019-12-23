import PropTypes from 'prop-types';
import React from 'react';
import { get } from 'lodash';
import cx from 'classnames';

import Editable from 'components/inline-editable/editable';
import styles from './simple-text-editable.sass';


export default function SimpleTextEditable(props, context) {
  const { placeholder, className, fieldName } = props;
  const { editModeOn, value, onChange } = get(context.fieldContexts, fieldName, {});
  return (
    <Editable
      editModeOn={ editModeOn }
      editorElement={
        <textarea
          className={ cx(styles.simpleTextEditableEditor, className) }
          onChange={ e => onChange(e.target.value) }
          placeholder={ placeholder }
        >
          { value }
        </textarea>
      }
      presenterElement={
        <div
          className={ className }
          placeholder={ placeholder }
        >
          { value }
        </div>
      }
    />
  );
}

SimpleTextEditable.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  fieldName: PropTypes.string,
};

SimpleTextEditable.contextTypes = {
  fieldContexts: PropTypes.object,
};

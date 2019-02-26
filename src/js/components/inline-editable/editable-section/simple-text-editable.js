import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import cx from 'classnames';

import Editable from 'components/inline-editable/editable';
import styles from './simple-text-editable.sass';


export default class SimpleTextEditable extends Component {
  render() {
    const { placeholder, className, fieldName } = this.props;
    const { editModeOn, value, onChange } = get(this.context.fieldContexts, fieldName, {});
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
        }/>
    );
  }
}

SimpleTextEditable.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  fieldName: PropTypes.string,
  lastBlockChild: PropTypes.node
};

SimpleTextEditable.contextTypes = {
  fieldContexts: PropTypes.object
};

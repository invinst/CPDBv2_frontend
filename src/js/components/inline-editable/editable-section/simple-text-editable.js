import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import Editable from 'components/inline-editable/editable';


export default class SimpleTextEditable extends Component {

  getEditorProps() {
    const { editModeOn, value, onChange, fieldname } = this.props;
    const { fieldContexts } = this.context;
    // const fieldContext = get(this.context.fieldContexts, fieldname, '');
    console.warn('fieldContexts', fieldContexts)
    return {
      editModeOn: fieldContexts.editModeOn,
      value: get(fieldContexts.value, fieldname, ''),
      onChange: fieldContexts.onChange,
    };
  }

  render() {
    const {
      style, placeholder, className, lastBlockChild, fieldname
    } = this.props;

    const { editModeOn, value, onChange } = this.getEditorProps();
    console.log('onChange', onChange)

    return (
      <Editable
        editModeOn={ editModeOn }
        editorElement={
          <textarea rows='1'
            className={ className }
            style={ style }
            onChange={ e => onChange(fieldname, e.target.value) }
            placeholder={ placeholder }
          >
            { value }
          </textarea>
        }
        presenterElement={
          <div
            className={ className }
            style={ style }
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
  value: PropTypes.object,
  style: PropTypes.object,
  onChange: PropTypes.func,
  editModeOn: PropTypes.bool,
  placeholder: PropTypes.string,
  fieldname: PropTypes.string,
  lastBlockChild: PropTypes.node
};

SimpleTextEditable.contextTypes = {
  fieldContexts: PropTypes.object
};

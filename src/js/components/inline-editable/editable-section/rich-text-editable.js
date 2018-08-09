import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import Editable from 'components/inline-editable/editable';
import RichTextEditor from 'components/inline-editable/rich-text-editor';


class RichTextEditable extends Component {

  getEditorProps() {
    const { editModeOn, value, onChange, fieldname } = this.props;
    const fieldContext = get(this.context.fieldContexts, fieldname, {});
    return {
      editModeOn: editModeOn || fieldContext.editModeOn,
      value: value || fieldContext.value,
      onChange: onChange || fieldContext.onChange
    };
  }

  render() {
    const {
      style, placeholder, className, lastBlockChild
    } = this.props;

    const { editModeOn, value, onChange } = this.getEditorProps();

    return (
      <Editable
        editModeOn={ editModeOn }
        editorElement={
          <RichTextEditor
            className={ className }
            style={ style }
            onChange={ onChange }
            editorState={ value }
            placeholder={ placeholder }
          />
        }
        presenterElement={
          <RichTextEditor
            className={ className }
            style={ style }
            editorState={ value }
            readOnly={ true }
            lastBlockChild={ lastBlockChild }
          />
        }/>
    );
  }
}

RichTextEditable.propTypes = {
  className: PropTypes.string,
  value: PropTypes.object,
  style: PropTypes.object,
  onChange: PropTypes.func,
  editModeOn: PropTypes.bool,
  placeholder: PropTypes.string,
  fieldname: PropTypes.string,
  lastBlockChild: PropTypes.node
};

RichTextEditable.contextTypes = {
  fieldContexts: PropTypes.object
};

export default RichTextEditable;

import React, { Component, PropTypes } from 'react';

import Editable from 'components/inline-editable/editable';
import RichTextEditor from 'components/inline-editable/rich-text-editor';


class RichTextEditable extends Component {
  render() {
    const {
      style, editModeOn, value, onChange, placeholder, className
    } = this.props;

    return (
      <Editable
        editModeOn={ editModeOn }
        editorElement={
          <RichTextEditor
            className={ className }
            style={ style }
            onChange={ onChange }
            editorState={ value }
            placeholder={ placeholder }/>
        }
        presenterElement={
          <RichTextEditor
            className={ className }
            style={ style }
            editorState={ value }
            readOnly={ true }/>
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
  placeholder: PropTypes.string
};

export default RichTextEditable;

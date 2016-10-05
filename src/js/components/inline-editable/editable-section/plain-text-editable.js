import React, { Component, PropTypes } from 'react';

import Editable from 'components/inline-editable/editable';
import PlainTextEditor from 'components/inline-editable/plain-text-editor';


class PlainTextEditable extends Component {
  render() {
    const { editModeOn, editorState, onChange } = this.props;

    return (
      <Editable
        editModeOn={ editModeOn }
        editorElement={
          <PlainTextEditor
            onChange={ onChange }
            editorState={ editorState }/>
        }
        presenterElement={
          <span>{ editorState && editorState.getCurrentContent().getFirstBlock().getText() }</span>
        }/>
    );
  }
}

PlainTextEditable.propTypes = {
  onChange: PropTypes.func,
  editorState: PropTypes.object,
  editModeOn: PropTypes.bool
};

export default PlainTextEditable;

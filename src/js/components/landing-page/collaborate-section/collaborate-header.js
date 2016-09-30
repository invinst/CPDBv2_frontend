import React, { Component, PropTypes } from 'react';

import Editable from 'components/inline-editable/editable';
import PlainTextEditor from 'components/inline-editable/plain-text-editor';
import { editBoxStyle } from './collaborate-header.style';


class CollaborateHeader extends Component {
  render() {
    const { editModeOn, headerText, onChange, editorState } = this.props;

    const editorProps = {
      onChange,
      editorState
    };

    return (
      <div style={ editBoxStyle }>
        <Editable
          editModeOn={ editModeOn }
          editorElement={
            <PlainTextEditor { ...editorProps }/>
          }
          presenterElement={
            <span>{ headerText }</span>
          }/>
      </div>
    );
  }
}

CollaborateHeader.propTypes = {
  editModeOn: PropTypes.bool,
  headerText: PropTypes.string,
  editorState: PropTypes.object,
  onChange: PropTypes.func
};

export default CollaborateHeader;

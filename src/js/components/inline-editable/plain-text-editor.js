import 'babel-polyfill';

import React, { Component, PropTypes } from 'react';
import { Editor } from 'draft-js';

import { textEditorStyle } from './editor.style';


export default class PlainTextEditor extends Component {
  constructor(props) {
    super(props);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command) {
    if (command === 'split-block') {
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    const { editorState, onChange } = this.props;
    return (
      <div style={ textEditorStyle }>
        <Editor editorState={ editorState } onChange={ onChange }
          handleKeyCommand={ this.handleKeyCommand }/>
      </div>
    );
  }
}

PlainTextEditor.propTypes = {
  children: PropTypes.string,
  editorState: PropTypes.object,
  onChange: PropTypes.func
};

PlainTextEditor.defaultProps = {
  children: ''
};

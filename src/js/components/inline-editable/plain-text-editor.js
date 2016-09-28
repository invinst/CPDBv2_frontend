import 'babel-polyfill';

import React, { Component, PropTypes } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';


export default class PlainTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromText(props.children))
    };
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command) {
    if (command === 'split-block') {
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    const { editorState } = this.state;
    return (
      <Editor editorState={ editorState } onChange={ this.onChange }
        handleKeyCommand={ this.handleKeyCommand }/>
    );
  }
}

PlainTextEditor.propTypes = {
  children: PropTypes.string
};

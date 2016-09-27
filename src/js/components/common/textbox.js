import React, { Component, PropTypes } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';


export default class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromText(props.text))
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

TextBox.propTypes = {
  text: PropTypes.string
};

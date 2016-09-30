import 'babel-polyfill';

import React, { Component, PropTypes } from 'react';
import { Editor } from 'draft-js';

import { textEditorStyle } from './editor.style';


export default class MultilineTextEditor extends Component {
  render() {
    const { editorState, onChange, blockRenderMap, blockRendererFn } = this.props;
    return (
      <div style={ textEditorStyle }>
        <Editor
          editorState={ editorState }
          onChange={ onChange }
          blockRenderMap={ blockRenderMap }
          blockRendererFn={ blockRendererFn }/>
      </div>
    );
  }
}

MultilineTextEditor.propTypes = {
  onChange: PropTypes.func,
  blockRenderMap: PropTypes.object,
  editorState: PropTypes.object,
  blockRendererFn: PropTypes.func
};

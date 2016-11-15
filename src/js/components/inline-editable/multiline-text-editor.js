import 'babel-polyfill';

import React, { Component, PropTypes } from 'react';
import { Editor, DefaultDraftBlockRenderMap } from 'draft-js';

import { textEditorStyle } from './editor.style';
import EditorBlockWithStyle from 'components/inline-editable/custom-block/editor-block-with-style';


export default class MultilineTextEditor extends Component {
  render() {
    const { editorState, onChange, style, placeholder } = this.props;
    const { wrapper, paragraph } = style;

    const paragraphBlockRender = {
      element: 'div',
      wrapper: <div style={ wrapper }/>
    };

    const blockRenderMap = DefaultDraftBlockRenderMap
      .set('unstyled', paragraphBlockRender);

    function blockRendererFn(contentBlock) {
      if (contentBlock.getType() === 'unstyled') {
        return {
          component: EditorBlockWithStyle,
          editable: true,
          props: {
            style: { ...paragraph, ...textEditorStyle },
            element: 'div'
          }
        };
      }
    }

    return (
      <Editor
        editorState={ editorState }
        onChange={ onChange }
        blockRenderMap={ blockRenderMap }
        blockRendererFn={ blockRendererFn }
        placeholder={ placeholder }/>
    );
  }
}

MultilineTextEditor.propTypes = {
  onChange: PropTypes.func,
  style: PropTypes.shape({
    wrapper: PropTypes.object,
    paragraph: PropTypes.object
  }),
  editorState: PropTypes.object,
  placeholder: PropTypes.string
};

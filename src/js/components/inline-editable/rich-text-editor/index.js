import React, { Component, PropTypes } from 'react';

import { Editor, DefaultDraftBlockRenderMap } from 'draft-js';

import EditorBlockWithStyle from 'components/inline-editable/custom-block/editor-block-with-style';
import WrapperBlockWithStyle from 'components/inline-editable/custom-block/wrapper-block-with-style';
import { textEditorStyle } from 'components/inline-editable/editor.style';


export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(editorState) {
    const { onChange, contentStateKey, openRichTextToolbar, closeRichTextToolbar } = this.props;
    const selectionState = editorState.getSelection();
    if (selectionState.getStartOffset() != selectionState.getEndOffset()) {
      openRichTextToolbar({
        contentStateKey,
        editorState
      });
    } else {
      closeRichTextToolbar({ contentStateKey });
    }
    onChange(editorState);
  }

  render() {
    const { placeholder, style, editorState } = this.props;
    const { wrapper, paragraph } = style;

    const paragraphBlockRender = {
      element: 'div',
      wrapper: <WrapperBlockWithStyle style={ wrapper } element='div'/>
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
        onChange={ this.handleChange }
        blockRenderMap={ blockRenderMap }
        blockRendererFn={ blockRendererFn }
        editorState={ editorState }
        placeholder={ placeholder }/>
    );
  }
}

RichTextEditor.propTypes = {
  placeholder: PropTypes.string,
  style: PropTypes.object,
  openRichTextToolbar: PropTypes.func,
  closeRichTextToolbar: PropTypes.func,
  onChange: PropTypes.func,
  contentStateKey: PropTypes.string,
  editorState: PropTypes.object
};

RichTextEditor.defaultProps = {
  style: {}
};

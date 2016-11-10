import React, { Component, PropTypes } from 'react';
import { Editor, DefaultDraftBlockRenderMap } from 'draft-js';

import EditorBlockWithStyle from 'components/inline-editable/custom-block/editor-block-with-style';
import { removeSelection, hasSelection } from 'utils/draft';
import Toolbar from './toolbar';
import { textEditorStyle } from 'components/inline-editable/editor.style';
import { wrapperStyle } from './rich-text-editor.style';


export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleToolbarMouseOver = () => this.setState({ toolbarHovered: true });
    this.handleToolbarMouseOut = () => this.setState({ toolbarHovered: false });
    this.state = {
      showToolbar: false,
      editorTop: null,
      editorLeft: null
    };
  }

  handleChange(editorState) {
    const { onChange } = this.props;
    let selectionState = editorState.getSelection();
    if (!selectionState.getHasFocus() && !this.state.toolbarHovered) {
      editorState = removeSelection(editorState);
    }
    if (hasSelection(editorState)) {
      const rect = this.rootEl.getBoundingClientRect();
      this.setState({
        showToolbar: true,
        editorLeft: rect.left,
        editorTop: rect.top
      });
    } else {
      this.setState({
        showToolbar: false
      });
    }
    onChange(editorState);
  }

  render() {
    const { placeholder, style, readOnly, editorState } = this.props;
    const { showToolbar, editorLeft, editorTop } = this.state;
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
          editable: !readOnly,
          props: {
            style: { ...paragraph, ...(readOnly ? {} : textEditorStyle) },
            element: 'div'
          }
        };
      }
    }

    return (
      <div style={ wrapperStyle } ref={ el => {
        if (el) {
          this.rootEl = el;
        }
      } }>
        <Editor
          onChange={ this.handleChange }
          blockRenderMap={ blockRenderMap }
          blockRendererFn={ blockRendererFn }
          readOnly={ readOnly }
          editorState={ editorState }
          placeholder={ placeholder }/>
        <Toolbar
          show={ showToolbar }
          parentLeft={ editorLeft }
          parentTop={ editorTop }
          onMouseOver={ this.handleToolbarMouseOver }
          onMouseOut={ this.handleToolbarMouseOut }
          editorState={ editorState }
          onChange={ this.handleChange }/>
      </div>
    );
  }
}

RichTextEditor.propTypes = {
  placeholder: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  editorState: PropTypes.object
};

RichTextEditor.defaultProps = {
  style: {}
};

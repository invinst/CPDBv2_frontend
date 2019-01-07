import 'babel-polyfill';

import React, { Component, PropTypes } from 'react';
import { Editor, DefaultDraftBlockRenderMap, EditorState } from 'draft-js';

import EditorBlockWithStyle from 'components/inline-editable/custom-block/editor-block-with-style';
import { removeSelection, hasSelection } from 'utils/draft';
import Toolbar from './toolbar';
import { textEditorStyle } from 'components/inline-editable/editor.style';
import baseStyle from './rich-text-editor.sass';


export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleToolbarFocus = this.handleToolbarFocus.bind(this);
    this.handleToolbarBlur = this.handleToolbarBlur.bind(this);
    this.toolbarFocused = false;
    this.state = {
      showToolbar: false,
      editorTop: null,
      editorLeft: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.readOnly) {
      this.toolbarFocused = false;
      this.setState({
        showToolbar: false
      });
    }
  }

  handleToolbarBlur() {
    this.toolbarFocused = false;
    this.handleChange(this.props.editorState);
  }

  handleToolbarFocus() {
    this.toolbarFocused = true;
    this.handleChange(this.props.editorState);
  }

  hasFocus(editorState) {
    const selectionState = editorState.getSelection();
    return (selectionState.getHasFocus() || this.toolbarFocused);
  }

  handleChange(editorState) {
    const { onChange } = this.props;
    if (!this.hasFocus(editorState)) {
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
      this.toolbarFocused = false;
      this.setState({
        showToolbar: false
      });
    }
    if (onChange) {
      onChange(editorState);
    }
  }

  render() {
    const { placeholder, style, readOnly, editorState, className, disableToolbar, lastBlockChild } = this.props;
    const { showToolbar, editorLeft, editorTop } = this.state;
    const { wrapper, paragraph } = style;

    const paragraphBlockRender = {
      element: 'div',
      wrapper: <div style={ wrapper }/>
    };

    const blockRenderMap = DefaultDraftBlockRenderMap
      .set('unstyled', paragraphBlockRender);

    const lastContentBlockKey = editorState.getCurrentContent().getLastBlock().getKey();
    function blockRendererFn(contentBlock) {
      if (contentBlock.getType() === 'unstyled') {
        return {
          component: EditorBlockWithStyle,
          editable: !readOnly,
          props: {
            style: { ...paragraph, ...(readOnly ? {} : textEditorStyle) },
            element: 'div',
            child: contentBlock.getKey() === lastContentBlockKey ? lastBlockChild : null
          }
        };
      }
    }

    return (
      <div
        className={ `${baseStyle.richTextEditor} ${className}` }
        ref={ el => {
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
        {
          !disableToolbar && (
            <Toolbar
              show={ showToolbar }
              parentLeft={ editorLeft }
              parentTop={ editorTop }
              onFocus={ this.handleToolbarFocus }
              onBlur={ this.handleToolbarBlur }
              editorState={ editorState }
              onChange={ this.handleChange }/>
          )
        }
      </div>
    );
  }
}

RichTextEditor.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  disableToolbar: PropTypes.bool,
  editorState: PropTypes.object,
  lastBlockChild: PropTypes.node
};

RichTextEditor.defaultProps = {
  style: {},
  editorState: EditorState.createEmpty()
};

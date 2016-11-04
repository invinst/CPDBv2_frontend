import React, { Component, PropTypes } from 'react';

import { EditorState, Editor, Entity, RichUtils, CompositeDecorator } from 'draft-js';

import Toolbar from './toolbar';
import { linkEntitySelected } from 'utils/draft';
import Link, { findLinkEntities } from './entities/link';
import { wrapperStyle, toolbarStyle } from './rich-text-editor.style';
import { textEditorStyle } from 'components/inline-editable/editor.style';


// TODO use editorState on props rather than state
class RichTextEditor extends Component {
  constructor(props) {
    super(props);

    this.onLinkToggle = this.onLinkToggle.bind(this);

    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      }
    ]);

    this.state = {
      editorState: EditorState.createEmpty(decorator)
    };
  }

  onLinkToggle(url) {
    let newEditorState = null;
    // editorState = this.props.editorState;
    const editorState = this.state.editorState;
    const linkActive = linkEntitySelected(editorState);

    // set url to editor state if current active status is false; otherwise, remove link
    if (!linkActive) {
      const entityKey = Entity.create('LINK', 'MUTABLE', { url: url });
      newEditorState = RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
    } else {
      // use entity key null to remove link from editor state
      newEditorState = RichUtils.toggleLink(editorState, editorState.getSelection(), null);
    }

    // this.props.onChange(newEditorState);
    this.setState({ editorState: newEditorState });
  }

  getToolbarPositionStyle() {
    const editorState = this.state.editorState;

    const selectionState = editorState.getSelection();
    const isToolbarVisible = selectionState.getHasFocus() && (
      selectionState.getStartOffset() != selectionState.getEndOffset());

    if (isToolbarVisible) {
      const { uniqueClassName } = this.props;

      const selectionElement = window.getSelection();
      const richTextEditorElements = document.getElementsByClassName(uniqueClassName);
      if (selectionElement.rangeCount && richTextEditorElements.length) {
        const elementRange = selectionElement.getRangeAt(0); //get the text range
        const selectionRect = elementRange.getBoundingClientRect();
        const richTextEditorRect = richTextEditorElements[0].getBoundingClientRect();

        return {
          top: `${selectionRect.top - richTextEditorRect.top - 20}px`,
          left: `${selectionRect.left - richTextEditorRect.left}px`
        };
      }
    }

    return {};
  }

  render() {
    // const { onChange, editorState } = this.props;
    const { placeholder, style, uniqueClassName } = this.props;
    const editorState = this.state.editorState;

    const toolbarPositionStyle = this.getToolbarPositionStyle();
    const linkActive = linkEntitySelected(editorState);

    const selectionState = editorState.getSelection();
    const isToolbarVisible = selectionState.getHasFocus() && (
      selectionState.getStartOffset() != selectionState.getEndOffset());

    return (
      <div
        className={ uniqueClassName }
        style={ { ...textEditorStyle, ...wrapperStyle, ...style } }
        >
        { isToolbarVisible ?
          <Toolbar
            style={ { ...toolbarStyle, ...toolbarPositionStyle } }
            linkActive={ linkActive }
            onLinkToggle={ this.onLinkToggle }
            />
            : null
        }
        <Editor
          onChange={ editorState => this.setState({ editorState }) }
          editorState={ editorState }
          placeholder={ placeholder }/>
      </div>
    );
  }
}

RichTextEditor.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  editorState: PropTypes.object,
  uniqueClassName: PropTypes.string
};

RichTextEditor.defaultProps = {
  onChange: function (editorState) {
    // this.setState({ editorState });
  },
  editorState: EditorState.createEmpty()
};

export default RichTextEditor;

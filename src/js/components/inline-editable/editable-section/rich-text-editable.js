import React, { Component, PropTypes } from 'react';

import Editable from 'components/inline-editable/editable';
import RichTextEditor from 'components/inline-editable/rich-text-editor';
import Paragraphs from 'components/common/paragraphs';
import { contentStateToTextArray } from 'utils/draft';


class RichTextEditable extends Component {
  render() {
    const {
      style, editModeOn, value, onChange, placeholder, contentStateKey,
      openRichTextToolbar, closeRichTextToolbar
    } = this.props;

    return (
      <Editable
        editModeOn={ editModeOn }
        editorElement={
          <RichTextEditor
            contentStateKey={ contentStateKey }
            openRichTextToolbar={ openRichTextToolbar }
            closeRichTextToolbar={ closeRichTextToolbar }
            style={ style }
            onChange={ onChange }
            editorState={ value }
            placeholder={ placeholder }/>
        }
        presenterElement={
          <Paragraphs style={ style }>
            { contentStateToTextArray(value && value.getCurrentContent()) }
          </Paragraphs>
        }/>
    );
  }
}

RichTextEditable.propTypes = {
  value: PropTypes.object,
  style: PropTypes.object,
  onChange: PropTypes.func,
  openRichTextToolbar: PropTypes.func,
  closeRichTextToolbar: PropTypes.func,
  editModeOn: PropTypes.bool,
  contentStateKey: PropTypes.string,
  placeholder: PropTypes.string
};

export default RichTextEditable;

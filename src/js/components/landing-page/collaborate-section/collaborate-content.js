import React, { Component, PropTypes } from 'react';

import Editable from 'components/inline-editable/editable';
import MultilineTextEditor from 'components/inline-editable/multiline-text-editor';
import Paragraphs from 'components/common/paragraphs';


class CollaborateContent extends Component {
  render() {
    const { editorState, editModeOn, onChange, style, presenterContent } = this.props;

    return (
      <Editable
        editModeOn={ editModeOn }
        editorElement={
          <MultilineTextEditor style={ style } onChange={ onChange } editorState={ editorState }/>
        }
        presenterElement={
          <Paragraphs style={ style }>
            { presenterContent }
          </Paragraphs>
        }/>
    );
  }
}

CollaborateContent.propTypes = {
  editorState: PropTypes.object,
  editModeOn: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.object,
  presenterContent: PropTypes.array
};

export default CollaborateContent;

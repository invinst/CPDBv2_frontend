import React, { Component, PropTypes } from 'react';

import Editable from 'components/inline-editable/editable';
import MultilineTextEditor from 'components/inline-editable/multiline-text-editor';
import Paragraphs from 'components/common/paragraphs';
import { contentStateToTextArray } from 'utils/draft';


class MultilineTextEditable extends Component {
  render() {
    const { style, editModeOn, value, onChange } = this.props;

    return (
      <Editable
        editModeOn={ editModeOn }
        editorElement={
          <MultilineTextEditor
            style={ style }
            onChange={ onChange }
            editorState={ value }/>
        }
        presenterElement={
          <Paragraphs style={ style }>
            { contentStateToTextArray(value && value.getCurrentContent()) }
          </Paragraphs>
        }/>
    );
  }
}

MultilineTextEditable.propTypes = {
  value: PropTypes.object,
  style: PropTypes.object,
  onChange: PropTypes.func,
  editModeOn: PropTypes.bool
};

export default MultilineTextEditable;

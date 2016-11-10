import React, { Component, PropTypes } from 'react';

import Editable from 'components/inline-editable/editable';
import PlainTextEditor from 'components/inline-editable/plain-text-editor';


class PlainTextEditable extends Component {
  render() {
    const { editModeOn, value, onChange, presenterElement, placeholder } = this.props;

    return (
      <Editable
        editModeOn={ editModeOn }
        editorElement={
          <PlainTextEditor
            onChange={ onChange }
            editorState={ value }
            placeholder={ placeholder }/>
        }
        presenterElement={
          React.cloneElement(
            presenterElement,
            null,
            value && value.getCurrentContent().getFirstBlock().getText())
        }/>
    );
  }
}

PlainTextEditable.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  editModeOn: PropTypes.bool,
  presenterElement: PropTypes.node,
  placeholder: PropTypes.string
};

PlainTextEditable.defaultProps = {
  presenterElement: <span/>
};

export default PlainTextEditable;

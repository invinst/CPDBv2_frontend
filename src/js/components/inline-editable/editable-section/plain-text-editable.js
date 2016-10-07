import React, { Component, PropTypes } from 'react';

import Editable from 'components/inline-editable/editable';
import PlainTextEditor from 'components/inline-editable/plain-text-editor';


class PlainTextEditable extends Component {
  render() {
    const { editModeOn, value, onChange, presenterElement } = this.props;

    return (
      <Editable
        editModeOn={ editModeOn }
        editorElement={
          <PlainTextEditor
            onChange={ onChange }
            editorState={ value }/>
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
  presenterElement: PropTypes.element
};

PlainTextEditable.defaultProps = {
  presenterElement: <span/>
};

export default PlainTextEditable;

import React, { Component, PropTypes } from 'react';


export default class Editable extends Component {
  render() {
    const { editModeOn, presenterElement, editorElement } = this.props;

    if (editModeOn) {
      return editorElement;
    }

    return presenterElement;
  }
}

Editable.propTypes = {
  editModeOn: PropTypes.bool,
  presenterElement: PropTypes.element,
  editorElement: PropTypes.element
};

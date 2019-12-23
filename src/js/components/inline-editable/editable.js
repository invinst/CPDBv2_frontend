import PropTypes from 'prop-types';
import React from 'react';


export default function Editable(props) {
  const { editModeOn, presenterElement, editorElement } = props;

  if (editModeOn) {
    return editorElement;
  }

  return presenterElement;
}

Editable.propTypes = {
  editModeOn: PropTypes.bool,
  presenterElement: PropTypes.element,
  editorElement: PropTypes.element,
};

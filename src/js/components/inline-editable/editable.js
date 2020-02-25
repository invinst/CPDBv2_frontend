import PropTypes from 'prop-types';


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

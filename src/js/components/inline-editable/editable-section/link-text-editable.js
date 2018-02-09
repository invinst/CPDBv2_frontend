import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import Editable from 'components/inline-editable/editable';
import RichTextEditor from 'components/inline-editable/rich-text-editor';
import { editorStateToText } from 'utils/draft';


export default class LinkTextEditable extends Component {
  render() {
    const { style, className, to, editModeOn, onChange, value, placeholder } = this.props;
    return (
      <Editable
        editModeOn={ editModeOn }
        editorElement={
          <RichTextEditor
            disableToolbar={ true }
            className={ className }
            style={ style.editor }
            onChange={ onChange }
            editorState={ value }
            placeholder={ placeholder }/>
        }
        presenterElement={
          <Link
            style={ style.link }
            to={ to }
            className={ className }>
            { value ? editorStateToText(value) : null }
          </Link>
        }
      />
    );
  }
}

LinkTextEditable.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  editModeOn: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.object,
  placeholder: PropTypes.string,
  to: PropTypes.string
};

LinkTextEditable.defaultProps = {
  style: {}
};

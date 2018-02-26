import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { get } from 'lodash';

import Editable from 'components/inline-editable/editable';
import RichTextEditor from 'components/inline-editable/rich-text-editor';
import { editorStateToText } from 'utils/draft';


export default class LinkTextEditable extends Component {

  getEditorProps() {
    const { editModeOn, value, onChange, fieldname } = this.props;
    const fieldContext = get(this.context.fieldContexts, fieldname, {});
    return {
      editModeOn: editModeOn || fieldContext.editModeOn,
      value: value || fieldContext.value,
      onChange: onChange || fieldContext.onChange
    };
  }

  render() {
    const { style, className, to, placeholder } = this.props;
    const { editModeOn, onChange, value } = this.getEditorProps();

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
  to: PropTypes.string,
  fieldname: PropTypes.string
};

LinkTextEditable.defaultProps = {
  style: {}
};

LinkTextEditable.contextTypes = {
  fieldContexts: PropTypes.object
};

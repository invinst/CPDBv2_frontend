import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { get } from 'lodash';

import Editable from 'components/inline-editable/editable';
import { LinkWrapper } from 'utils/link-wrapper';
import RichTextEditor from 'components/inline-editable/rich-text-editor';
import { editorStateToText } from 'utils/draft';
import { EditWrapperStateContext } from 'contexts';


export default class LinkTextEditable extends Component {

  getEditorProps() {
    const { editModeOn, value, onChange, fieldname } = this.props;
    const fieldContext = get(this.context.fieldContexts, fieldname, {});
    return {
      editModeOn: editModeOn || fieldContext.editModeOn,
      value: value || fieldContext.value,
      onChange: onChange || fieldContext.onChange,
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
          <LinkWrapper
            style={ style.link }
            to={ to }
            className={ className }>
            { value ? editorStateToText(value) : null }
          </LinkWrapper>
        }
      />
    );
  }
}

LinkTextEditable.contextType = EditWrapperStateContext;

LinkTextEditable.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  editModeOn: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.object,
  placeholder: PropTypes.string,
  to: PropTypes.string,
  fieldname: PropTypes.string,
};

LinkTextEditable.defaultProps = {
  style: {},
};

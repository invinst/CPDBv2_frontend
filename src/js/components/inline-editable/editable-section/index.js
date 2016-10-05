import React, { Component, PropTypes } from 'react';
import { mapValues } from 'lodash';
import { convertToRaw } from 'draft-js';

import { editModeWrapperStyle } from './editable-section.style';
import { convertContentStateToEditorState } from 'utils/draft';


export default function (SubComponent) {
  class EditableSection extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fields: this.convertFields(props.fields)
      };
      this.handleUpdateFieldValue = this.handleUpdateFieldValue.bind(this);
      this.handleSaveForm = this.handleSaveForm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        fields: this.convertFields(nextProps.fields)
      });
    }

    convertFields(fields) {
      return mapValues(fields, (field) => (convertContentStateToEditorState(field)));
    }

    handleSaveForm() {
      const data = mapValues(this.state.fields, (field) => (
        convertToRaw(field.getCurrentContent())
        ));
      this.props.onSaveForm(data)
      .then(() => this.props.turnOffSectionEditMode());
    }

    handleUpdateFieldValue(fieldName, fieldValue) {
      this.setState({
        fields: {
          ...this.state.fields,
          [fieldName]: fieldValue
        }
      });
    }

    render() {
      const { sectionEditModeOn, turnOnSectionEditMode, turnOffSectionEditMode } = this.props;
      const { fields } = this.state;

      return (
        <div style={ sectionEditModeOn ? editModeWrapperStyle : null }>
          <SubComponent
            editToggleProps={ {
              sectionEditModeOn,
              turnOnSectionEditMode,
              turnOffSectionEditMode,
              onSaveForm: this.handleSaveForm
            } }
            fieldProps={
              mapValues(fields, (editorState, fieldName) => ({
                editorState: editorState,
                editModeOn: sectionEditModeOn,
                onChange: val => this.handleUpdateFieldValue(fieldName, val)
              }))
            }/>
        </div>
      );
    }
  }

  EditableSection.propTypes = {
    fields: PropTypes.object,
    onSaveForm: PropTypes.func,
    sectionEditModeOn: PropTypes.bool,
    turnOnSectionEditMode: PropTypes.func,
    turnOffSectionEditMode: PropTypes.func
  };

  return EditableSection;
}

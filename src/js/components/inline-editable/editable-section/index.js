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
        fields: mapValues(props.fields, this.deserializeField)
      };
      this.handleUpdateFieldValue = this.handleUpdateFieldValue.bind(this);
      this.handleSaveForm = this.handleSaveForm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        fields: mapValues(nextProps.fields, this.deserializeField)
      });
    }

    deserializeField(field) {
      if (!field.value) {
        return field;
      }

      switch (field.type) {
        case 'plain_text':
        case 'multiline_text':
          return {
            ...field,
            value: convertContentStateToEditorState(field.value)
          };
      }
      return field;
    }

    serializeField(field) {
      switch (field.type) {
        case 'plain_text':
        case 'multiline_text':
          return {
            ...field,
            value: convertToRaw(field.value.getCurrentContent())
          };
      }
      return field;
    }

    handleSaveForm() {
      const data = mapValues(this.state.fields, this.serializeField);
      this.props.onSaveForm(data)
      .then(() => this.props.turnOffSectionEditMode());
    }

    handleUpdateFieldValue(fieldName, fieldValue) {
      const { fields } = this.state;
      const field = fields[fieldName];

      this.setState({
        fields: {
          ...fields,
          [fieldName]: {
            ...field,
            value: fieldValue
          }
        }
      });
    }

    render() {
      const { sectionEditModeOn, turnOnSectionEditMode, turnOffSectionEditMode } = this.props;
      const { fields } = this.state;

      return (
        <div style={ sectionEditModeOn ? editModeWrapperStyle : null }>
          <SubComponent
            sectionEditModeOn={ sectionEditModeOn }
            editToggleProps={ {
              sectionEditModeOn,
              turnOnSectionEditMode,
              turnOffSectionEditMode,
              onSaveForm: this.handleSaveForm
            } }
            fieldProps={
              mapValues(fields, (field, fieldName) => ({
                value: field.value,
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

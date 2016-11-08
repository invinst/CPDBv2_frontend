import React, { Component, PropTypes } from 'react';
import { map, values, mapValues } from 'lodash';
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
      this.fieldProps = this.fieldProps.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        fields: mapValues(nextProps.fields, this.deserializeField)
      });
    }

    deserializeField(field) {
      if (!field) {
        return field;
      }

      switch (field.type) {
        case 'plain_text':
        case 'multiline_text':
        case 'rich_text':
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
        case 'rich_text':
          return {
            ...field,
            value: convertToRaw(field.value.getCurrentContent())
          };
      }
      return field;
    }

    handleSaveForm() {
      const data = map(values(this.state.fields), this.serializeField);
      this.props.onSaveForm({ fields: data })
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

    fieldProps(field, fieldName) {
      const { sectionEditModeOn } = this.props;
      return {
        value: field && field.value,
        editModeOn: sectionEditModeOn,
        onChange: val => this.handleUpdateFieldValue(fieldName, val)
      };
    }

    render() {
      const {
        sectionEditModeOn, turnOnSectionEditMode, turnOffSectionEditMode,
        ...restProps
      } = this.props;
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
              mapValues(fields, this.fieldProps)
            }
            { ...restProps }/>
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

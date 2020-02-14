import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mapValues, map, values, isEqual } from 'lodash';

import { convertContentStateToEditorState, convertEditorStateToRaw } from 'utils/draft';
import { EditModeContext, EditWrapperStateContext } from 'contexts';


export default class EditWrapperStateProvider extends Component {
  static deserializeField(field) {
    if (!field) {
      return field;
    }

    switch (field.type) {
      case 'rich_text':
        return {
          ...field,
          value: convertContentStateToEditorState(field.value),
        };
    }
    return field;
  }

  constructor(props) {
    super(props);
    this.state = {
      fields: mapValues(props.fields, EditWrapperStateProvider.deserializeField),
      prevFields: props.fields,
      prevSectionEditModeOn: props.sectionEditModeOn,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.fields, state.prevFields) || props.sectionEditModeOn !== state.prevSectionEditModeOn)
      return {
        fields: mapValues(props.fields, EditWrapperStateProvider.deserializeField),
        prevFields: props.fields,
        prevSectionEditModeOn: props.sectionEditModeOn,
      };
    return null;
  }

  serializeField(field) {
    switch (field.type) {
      case 'rich_text':
        return {
          ...field,
          value: convertEditorStateToRaw(field.value),
        };
    }
    return field;
  }

  handleUpdateFieldValue(fieldName, fieldValue) {
    const { autoSave } = this.props;
    const { fields } = this.state;
    const field = fields[fieldName];

    this.setState({
      fields: {
        ...fields,
        [fieldName]: {
          ...field,
          value: fieldValue,
        },
      },
    }, () => {
      if (autoSave) {
        this.handleSaveForm();
      }
    });
  }

  getSectionEditModeOn() {
    const { sectionEditModeOn, autoSave } = this.props;
    const { editModeOn } = this.context;

    return autoSave ? editModeOn : sectionEditModeOn;
  }

  getFieldContexts() {
    const { fields } = this.state;
    return mapValues(fields, (field, fieldName) => ({
      value: field && field.value,
      editModeOn: this.getSectionEditModeOn(),
      onChange: val => this.handleUpdateFieldValue(fieldName, val),
    }));
  }

  handleSaveForm = () => {
    const data = map(values(this.state.fields), this.serializeField);
    return this.props.onSaveForm({ fields: data })
      .then(() => this.props.turnOffSectionEditMode());
  };

  render() {
    const { children, turnOnSectionEditMode, turnOffSectionEditMode, autoSave } = this.props;
    const context = {
      autoSave,
      fieldContexts: this.getFieldContexts(),
      onSaveForm: this.handleSaveForm,
      sectionEditModeOn: this.getSectionEditModeOn(),
      turnOnSectionEditMode,
      turnOffSectionEditMode,
    };
    return (
      <EditWrapperStateContext.Provider value={ context }>
        { children }
      </EditWrapperStateContext.Provider>
    );
  }
}

EditWrapperStateProvider.propTypes = {
  children: PropTypes.node,
  fields: PropTypes.object,
  onSaveForm: PropTypes.func,
  autoSave: PropTypes.bool,
  sectionEditModeOn: PropTypes.bool,
  turnOnSectionEditMode: PropTypes.func,
  turnOffSectionEditMode: PropTypes.func,
};

EditWrapperStateProvider.contextType = EditModeContext;

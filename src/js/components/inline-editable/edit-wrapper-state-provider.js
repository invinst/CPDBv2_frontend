import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mapValues, map, values, isEqual } from 'lodash';

import { convertContentStateToEditorState, convertEditorStateToRaw } from 'utils/draft';
import { EditWrapperStateContext } from 'contexts';


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
    });
  }

  getFieldContexts() {
    const { sectionEditModeOn } = this.props;
    const { fields } = this.state;
    return mapValues(fields, (field, fieldName) => ({
      value: field && field.value,
      editModeOn: sectionEditModeOn,
      onChange: val => this.handleUpdateFieldValue(fieldName, val),
    }));
  }

  handleSaveForm = () => {
    const data = map(values(this.state.fields), this.serializeField);
    return this.props.onSaveForm({ fields: data })
      .then(() => this.props.turnOffSectionEditMode());
  };

  render() {
    const { children, sectionEditModeOn, turnOnSectionEditMode, turnOffSectionEditMode } = this.props;
    const context = {
      fieldContexts: this.getFieldContexts(),
      onSaveForm: this.handleSaveForm,
      sectionEditModeOn,
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
  sectionEditModeOn: PropTypes.bool,
  turnOnSectionEditMode: PropTypes.func,
  turnOffSectionEditMode: PropTypes.func,
};

import React, { PropTypes, Component } from 'react';
import { mapValues, map, values } from 'lodash';

import { convertContentStateToEditorState, convertEditorStateToRaw } from 'utils/draft';


export default class EditWrapperStateProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: mapValues(props.fields, this.deserializeField),
    };
  }

  getChildContext() {
    const { autoSave, turnOnSectionEditMode, turnOffSectionEditMode } = this.props;
    return {
      autoSave,
      fieldContexts: this.getFieldContexts(),
      onSaveForm: this.handleSaveForm.bind(this),
      sectionEditModeOn: this.getSectionEditModeOn(),
      turnOnSectionEditMode,
      turnOffSectionEditMode,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fields: mapValues(nextProps.fields, this.deserializeField),
    });
  }

  deserializeField(field) {
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

  handleSaveForm() {
    const data = map(values(this.state.fields), this.serializeField);
    return this.props.onSaveForm({ fields: data })
      .then(() => this.props.turnOffSectionEditMode());
  }

  render() {
    const { children } = this.props;
    return children;
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

EditWrapperStateProvider.contextTypes = {
  editModeOn: PropTypes.bool,
};

EditWrapperStateProvider.childContextTypes = {
  fieldContexts: PropTypes.object,
  onSaveForm: PropTypes.func,
  autoSave: PropTypes.bool,
  sectionEditModeOn: PropTypes.bool,
  turnOnSectionEditMode: PropTypes.func,
  turnOffSectionEditMode: PropTypes.func,
};

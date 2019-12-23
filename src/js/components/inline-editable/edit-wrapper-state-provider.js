import PropTypes from 'prop-types';
import { Component } from 'react';
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
    const { sectionEditModeOn, turnOnSectionEditMode, turnOffSectionEditMode } = this.props;
    return {
      fieldContexts: this.getFieldContexts(),
      onSaveForm: this.handleSaveForm.bind(this),
      sectionEditModeOn,
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
  sectionEditModeOn: PropTypes.bool,
  turnOnSectionEditMode: PropTypes.func,
  turnOffSectionEditMode: PropTypes.func,
};

EditWrapperStateProvider.childContextTypes = {
  fieldContexts: PropTypes.object,
  onSaveForm: PropTypes.func,
  sectionEditModeOn: PropTypes.bool,
  turnOnSectionEditMode: PropTypes.func,
  turnOffSectionEditMode: PropTypes.func,
};

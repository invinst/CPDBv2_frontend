import React, { PropTypes, Component } from 'react';
import { mapValues } from 'lodash';


export default class SimpleEditWrapperStateProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: props.fields
    };
  }

  getChildContext() {
    const { sectionEditModeOn, turnOnSectionEditMode, turnOffSectionEditMode } = this.props;
    return {
      fieldContexts: this.getFieldContexts(),
      onSaveForm: this.handleSaveForm.bind(this),
      sectionEditModeOn,
      turnOnSectionEditMode,
      turnOffSectionEditMode
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fields: nextProps.fields
    });
  }

  handleUpdateFieldValue(fieldName, fieldValue) {
    const { fields } = this.state;

    this.setState({
      fields: {
        ...fields,
        [fieldName]: fieldValue
      }
    });
  }

  getFieldContexts() {
    const { sectionEditModeOn } = this.props;
    const { fields } = this.state;
    return mapValues(fields, (field, fieldName) => ({
      value: field,
      editModeOn: sectionEditModeOn,
      onChange: val => this.handleUpdateFieldValue(fieldName, val)
    }));
  }

  handleSaveForm() {
    const { fields } = this.state;

    return this.props.onSaveForm(fields).then(() => this.props.turnOffSectionEditMode());
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

SimpleEditWrapperStateProvider.propTypes = {
  children: PropTypes.node,
  fields: PropTypes.object,
  onSaveForm: PropTypes.func,
  sectionEditModeOn: PropTypes.bool,
  turnOnSectionEditMode: PropTypes.func,
  turnOffSectionEditMode: PropTypes.func,
};

SimpleEditWrapperStateProvider.childContextTypes = {
  fieldContexts: PropTypes.object,
  onSaveForm: PropTypes.func,
  sectionEditModeOn: PropTypes.bool,
  turnOnSectionEditMode: PropTypes.func,
  turnOffSectionEditMode: PropTypes.func
};

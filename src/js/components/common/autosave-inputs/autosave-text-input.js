import React, { Component, PropTypes } from 'react';


export default class AutosaveTextInput extends Component {
  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      currentValue: props.value
    };
  }

  handleBlur() {
    const { save, fieldType, value } = this.props;

    const { currentValue } = this.state;
    if (save && currentValue !== value) {
      save({ attr: fieldType, value: currentValue });
    }
  }

  handleChange(event) {
    this.setState({ currentValue: event.target.value });
  }

  render() {
    const { currentValue } = this.state;
    const { className, placeholder } = this.props;

    return (
      <input
        value={ currentValue }
        onBlur={ this.handleBlur }
        onChange={ this.handleChange }
        className={ className }
        placeholder={ placeholder }
      />
    );
  }
}

AutosaveTextInput.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  save: PropTypes.func,
  fieldType: PropTypes.string
};

AutosaveTextInput.defaultProps = {
  value: ''
};

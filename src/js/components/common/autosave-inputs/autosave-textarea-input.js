import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'lodash';


export default class AutosaveTextareaInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: props.value,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.adjustTextareaHeight(this.textarea);
    const { currentValue } = this.state;
    if (this.props.autoFocus) {
      this.textarea.focus();
      this.textarea.selectionEnd = this.textarea.selectionStart = currentValue.length;
    }
  }

  adjustTextareaHeight(textarea) {
    const { textareaLineHeight } = this.props;
    textarea.rows = 1;
    textarea.rows = Math.floor(textarea.scrollHeight / textareaLineHeight);
  }

  handleBlur = () => {
    const { save, fieldType, value, onBlur } = this.props;
    const { currentValue } = this.state;

    if (save && currentValue !== value) {
      save({ attr: fieldType, value: currentValue });
    }

    onBlur && onBlur();
  };

  handleChange = event => {
    const { value } = event.target;
    const { onChange } = this.props;
    this.adjustTextareaHeight(event.target);
    this.setState({ currentValue: value });
    onChange(value);
  };

  handleResize = () => {
    this.textarea && this.adjustTextareaHeight(this.textarea);
  };

  render() {
    const { currentValue } = this.state;
    const { className, placeholder } = this.props;

    return (
      <textarea
        ref={ el => this.textarea = el }
        value={ currentValue }
        onBlur={ this.handleBlur }
        onChange={ this.handleChange }
        className={ className }
        placeholder={ placeholder }
      />
    );
  }
}

AutosaveTextareaInput.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  save: PropTypes.func,
  fieldType: PropTypes.string.isRequired,
  textareaLineHeight: PropTypes.number.isRequired,
  autoFocus: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

AutosaveTextareaInput.defaultProps = {
  autoFocus: false,
  onChange: noop,
};

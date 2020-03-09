import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import AutosaveTextareaInput from './autosave-textarea-input';

export default class AutosaveMarkdownTextareaInput extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditable: false };
  }

  handleMarkdownClick = () => {
    this.setState({ isEditable: true });
  };

  onTextAreaBlur = () => {
    this.setState({ isEditable: false });
  };

  render() {
    const { isEditable } = this.state;
    const { className, placeholder, save, fieldType, textareaLineHeight, value } = this.props;

    if (isEditable || !value.length) {
      return (
        <AutosaveTextareaInput
          onBlur={ this.onTextAreaBlur }
          className={ className }
          value={ value }
          placeholder={ placeholder }
          fieldType={ fieldType }
          save={ save }
          autoFocus={ true }
          textareaLineHeight={ textareaLineHeight }
        />
      );
    }

    return (
      <div onClick={ this.handleMarkdownClick } className={ className } >
        <ReactMarkdown
          source={ value }
        />
      </div>
    );
  }
}

AutosaveMarkdownTextareaInput.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  save: PropTypes.func,
  fieldType: PropTypes.string.isRequired,
  textareaLineHeight: PropTypes.number.isRequired,
};

AutosaveMarkdownTextareaInput.defaultProps = {
  value: '',
};

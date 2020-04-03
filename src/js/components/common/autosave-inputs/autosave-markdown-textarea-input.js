import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import cx from 'classnames';

import AutosaveTextareaInput from './autosave-textarea-input';
import styles from './autosave-markdown-textarea-input.sass';


export default class AutosaveMarkdownTextareaInput extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditable: false, emptyValue: props.value.length === 0 };
  }

  handleMarkdownClick = () => {
    this.setState({ isEditable: true });
  };

  onTextAreaBlur = () => {
    this.setState({ isEditable: false });
  };

  onTextAreaChange = (value) => {
    if (value.length === 0) {
      this.setState({ emptyValue: true });
    } else if (this.state.emptyValue) {
      this.setState({ emptyValue: false });
    }
  };

  render() {
    const { isEditable, emptyValue } = this.state;
    const { className, placeholder, save, fieldType, textareaLineHeight, value, placeholderClassName } = this.props;

    return (
      <div
        className={ cx(styles.autosaveMarkdownTextareaInputWrapper, { [placeholderClassName]: emptyValue }) }
        data-placeholder={ placeholder }
      >
        {
          isEditable ?
            <AutosaveTextareaInput
              onBlur={ this.onTextAreaBlur }
              className={ cx(className, 'autosave-markdown-textarea-input') }
              value={ value }
              fieldType={ fieldType }
              save={ save }
              autoFocus={ true }
              onChange={ this.onTextAreaChange }
              textareaLineHeight={ textareaLineHeight }
            />
            :
            <div onClick={ this.handleMarkdownClick } className={ cx(className, 'autosave-markdown-textarea-input') }>
              <ReactMarkdown
                source={ value }
              />
            </div>
        }
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
  placeholderClassName: PropTypes.string,
};

AutosaveMarkdownTextareaInput.defaultProps = {
  value: '',
};

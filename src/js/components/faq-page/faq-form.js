import Radium from 'radium';
import React, { Component, PropTypes } from 'react';

import { faqFormFontStyle, faqFormStyle, inputGroupStyle } from './faq-form.style';


class FAQForm extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    let nextDisabled = this.props.isSubmitting || !event.target.value;

    if (nextDisabled !== this.state.disabled) {
      this.setState({
        disabled: nextDisabled
      });
    }
  }

  handleReset(event) {
    this.setState({
      disabled: true
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { disabled } = this.state;

    return (
      <div style={ faqFormStyle.outerWrapper }>
        <div style={ faqFormStyle.innerWrapper }>
          <form onSubmit={ handleSubmit } onReset={ this.handleReset }>
            <span style={ [faqFormFontStyle, faqFormStyle.label] }>Have a question?</span>
            <div style={ inputGroupStyle.wrapper }>
              <input type='text' required='true' name='title' style={ [faqFormFontStyle, inputGroupStyle.titleInput] }
                onChange={ this.handleChange } placeholder='What is your question?'/>
              <input
                style={
                  [faqFormFontStyle, inputGroupStyle.button.base, !disabled && inputGroupStyle.button.enabled]
                }
                type='submit' disabled={ disabled } value='Ask'/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

FAQForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};

export default Radium(FAQForm);

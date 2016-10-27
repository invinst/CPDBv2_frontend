import React, { Component, PropTypes } from 'react';
import { buildPlainTextField } from 'utils/draft';

import ConfiguredRadium from 'utils/configured-radium';
import { faqFormFontStyle, faqFormStyle, inputGroupStyle, responsiveTitleInput } from './faq-form.style';
import ResponsiveStyleComponent, {
  TABLET, DESKTOP, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';


class FAQForm extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        titleInput: responsiveTitleInput.extraWide
      },
      [DESKTOP]: {
        titleInput: responsiveTitleInput.desktop
      },
      [TABLET]: {
        titleInput: responsiveTitleInput.tablet
      }
    };
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

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      fields: [buildPlainTextField('question', event.target.title.value)]
    };

    const { target } = event;

    this.props.askQuestion(data).then(function () {
      target.reset();
    });
  }

  renderWithResponsiveStyle(styles) {
    const { disabled } = this.state;

    return (
      <div style={ faqFormStyle.outerWrapper }>
        <div style={ faqFormStyle.innerWrapper }>
          <form onSubmit={ this.handleSubmit } onReset={ this.handleReset }>
            <span style={ [faqFormFontStyle, faqFormStyle.label] }>Have a question?</span>
            <div style={ inputGroupStyle.wrapper }>
              <input type='text' required='true' name='title'
                style={ [faqFormFontStyle, inputGroupStyle.titleInput, styles.titleInput] }
                onChange={ this.handleChange }/>
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

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ this.responsiveStyle() }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

FAQForm.propTypes = {
  askQuestion: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};

export default ConfiguredRadium(FAQForm);

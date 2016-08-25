import React, { Component, PropTypes } from 'react';

import {
  textInputStyle, formActionBlockStyle, errorTextWrapperStyle, subscribeButtonStyle
} from './subscribe-form.style';
import CheckmarkSpinnerButton from './checkmark-spinner-button';
import ErrorText from './error-text';
import FadeTransition from 'components/animation/fade-transition';
import { FORM_INITIAL, FORM_LOADING, FORM_SUCCESS, FORM_FAILURE } from 'utils/constants';


export default class SubscribeForm extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      state: FORM_INITIAL
    };
  }

  handleClick(event) {
    this.setState({
      state: FORM_LOADING
    });
    this.props.subscribeEmail(this.emailInput.value).then((action) => {
      if (!action.error) {
        this.setState({
          state: FORM_SUCCESS
        });
      } else {
        this.setState({
          state: FORM_FAILURE
        });
      }
    }).catch((err) => {
      this.setState({
        state: FORM_FAILURE
      });
    }).then(() => {
      setTimeout(() => this.setState({ state: FORM_INITIAL }), 1000);
    });
  }

  renderError() {
    if (this.state.state === FORM_FAILURE) {
      return <ErrorText key='errorText'>Invalid Email!</ErrorText>;
    }
    return null;
  }

  render() {
    const { state } = this.state;

    return (
      <div id='mc_embed_signup_scroll'>
        <div className='mc-field-group'>
          <input ref={ el => { this.emailInput = el; } }
            placeholder='email@example.com' type='email' style={ textInputStyle }/>
        </div>
        <div style={ formActionBlockStyle }>
          <div style={ errorTextWrapperStyle }>
            <FadeTransition>
              { this.renderError() }
            </FadeTransition>
          </div>
          <CheckmarkSpinnerButton onClick={ this.handleClick } state={ state } style={ subscribeButtonStyle }/>
        </div>
      </div>
    );
  }
}

SubscribeForm.propTypes = {
  subscribeEmail: PropTypes.func
};

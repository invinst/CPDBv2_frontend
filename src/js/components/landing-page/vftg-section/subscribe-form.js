import React, { Component, PropTypes } from 'react';

import {
  textInputStyle, formActionBlockStyle
} from './subscribe-form.style';
import CheckmarkSpinnerButton from './checkmark-spinner-button';
import { FORM_INITIAL, FORM_LOADING, FORM_SUCCESS, FORM_FAILURE } from 'utils/constants';


export default class SubscribeForm extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      state: FORM_INITIAL
    };
  }

  handleClick(event) {
    this.setState({
      state: FORM_LOADING
    });
    return this.props.subscribeEmail(this.emailInput.value).then((action) => {
      this.setState({
        state: FORM_SUCCESS
      });
    }).catch((err) => {
      this.setState({
        state: FORM_FAILURE
      });
    });
  }

  handleInputChange() {
    if ([FORM_SUCCESS, FORM_FAILURE].indexOf(this.state.state) !== -1) {
      this.setState({ state: FORM_INITIAL });
    }
  }

  render() {
    const { state } = this.state;

    return (
      <div id='mc_embed_signup_scroll'>
        <div className='mc-field-group'>
          <input ref={ el => { this.emailInput = el; } }
            placeholder='email@example.com' type='email' style={ textInputStyle } onChange={ this.handleInputChange }/>
        </div>
        <div style={ formActionBlockStyle }>
          <CheckmarkSpinnerButton onClick={ this.handleClick } state={ state }>
            Subscribe
          </CheckmarkSpinnerButton>
        </div>
      </div>
    );
  }
}

SubscribeForm.propTypes = {
  subscribeEmail: PropTypes.func
};

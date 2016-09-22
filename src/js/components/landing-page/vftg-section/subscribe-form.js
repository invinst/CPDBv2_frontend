import React, { Component, PropTypes } from 'react';

import { textInputStyle, subscribeBtnStyle } from './subscribe-form.style';
import CheckmarkSpinnerButton from './checkmark-spinner-button';
import { FORM_INITIAL, FORM_LOADING, FORM_SUCCESS, FORM_FAILURE } from 'utils/constants';
import ConfiguredRadium from 'utils/configured-radium';


class SubscribeForm extends Component {
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
      <div>
        <input ref={ el => { this.emailInput = el; } } className='subscribe-form__input'
          placeholder='email@example.com' type='email' style={ textInputStyle } onChange={ this.handleInputChange }/>
        <CheckmarkSpinnerButton onClick={ this.handleClick } state={ state } style={ subscribeBtnStyle }>
          Subscribe
        </CheckmarkSpinnerButton>
      </div>
    );
  }
}

SubscribeForm.propTypes = {
  subscribeEmail: PropTypes.func
};

export default ConfiguredRadium(SubscribeForm);

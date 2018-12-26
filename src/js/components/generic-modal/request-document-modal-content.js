import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { updateIntercomEmail } from 'utils/intercom';
import {
  paddingWrapperStyle,
  inputStyle,
  instructionStyle,
  linkButtonStyle,
  submitButtonStyle,
  messageBoxStyle,
  emphasisTextboxStyle
} from './generic-modal.style';


class RequestDocumentModalContent extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { warning: false };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { onRequestDocument, id, closeModal } = this.props;
    const email = this.refs.email.value;

    return onRequestDocument({ id, email }).then((action) => {
      updateIntercomEmail(email);
      this.setState({ warning: false });
      setTimeout(closeModal, 1500);  // auto close modal if success
    }).catch(e => {
      this.setState({ warning: true });
    });
  }

  render() {
    const { closeModal, message, isRequested } = this.props;
    const showMessage = message && (isRequested || this.state.warning);

    return (
      <form onSubmit={ this.handleSubmit }>
        <div style={ paddingWrapperStyle }>
          <p style={ instructionStyle }>We’ll notify you when the document is made available.</p>
          { this.state.warning ? (
            <input ref='email' style={ { ...inputStyle, ...emphasisTextboxStyle } } placeholder='Your email'/>
          ) : (
            <input ref='email' style={ inputStyle } placeholder='Your email'/>
          ) }
        </div>
        <input type='submit' style={ submitButtonStyle } value='Request'/>
        <a style={ linkButtonStyle } onClick={ closeModal }>Cancel</a>
        { showMessage && (
          <div className='test--request-document-modal--message' style={ messageBoxStyle }>
            { message }
          </div>
        ) }
      </form>
    );
  }
}

export default ConfiguredRadium(RequestDocumentModalContent);

RequestDocumentModalContent.propTypes = {
  onRequestDocument: PropTypes.func,
  message: PropTypes.string,
  closeModal: PropTypes.func,
  id: PropTypes.number,
  isRequested: PropTypes.bool
};

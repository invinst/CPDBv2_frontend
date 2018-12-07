import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import ConfiguredRadium from 'utils/configured-radium';
import style from './request-document-modal-content.sass';


class RequestDocumentModalContent extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { warning: false };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { onRequestDocument, id, closeModal } = this.props;

    return onRequestDocument({ id, email: this.refs.email.value }).then((action) => {
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
        <div className={ style.requestDocumentModalContent }>
          <p className='request-document-instruction'>We’ll notify you when the document is made available.</p>
          <input
            ref='email'
            className={ cx('request-document-input', { emphasis: this.state.warning }) }
            placeholder='Your email'
          />
        </div>
        <input type='submit' className='request-document-submit-button' value='Request'/>
        <a className='request-document-link-button' onClick={ closeModal }>Cancel</a>
        { showMessage && <div className='request-document-message-box'>{ message }</div> }
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

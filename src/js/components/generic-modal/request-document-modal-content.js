import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import ConfiguredRadium from 'utils/configured-radium';
import { updateIntercomEmail } from 'utils/intercom';
import style from './request-document-modal-content.sass';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';


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
      setTimeout(closeModal, 1500); // auto close modal if success
    }).catch(e => {
      this.setState({ warning: true });
    });
  }

  render() {
    const { closeModal, message, isRequested, instructionEditWrapperStateProps, hasData } = this.props;
    const showMessage = message && (isRequested || this.state.warning);
    const placeholderMessage = hasData ? 'We’ll notify you when we have new documents.' :
      'We’ll notify you when the document is made available.';
    const fieldName = hasData ? 'new_document_notification' : 'document_request_instruction';

    return (
      <form onSubmit={ this.handleSubmit } className={ style.requestDocumentModalContent }>
        <div className='request-document-content'>
          <EditWrapperStateProvider { ...instructionEditWrapperStateProps }>
            <HoverableEditWrapper className='request-document-instruction'>
              <RichTextEditable
                placeholder={ placeholderMessage }
                fieldname={ fieldName }
              />
            </HoverableEditWrapper>
          </EditWrapperStateProvider>
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
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isRequested: PropTypes.bool,
  instructionEditWrapperStateProps: PropTypes.object,
  hasData: PropTypes.bool,
};

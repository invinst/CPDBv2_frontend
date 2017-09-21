import React, { PropTypes } from 'react';

import { overlayStyle, contentStyle } from './generic-modal.style';
import RequestDocumentModalContent from './request-document-modal-content';
import LegalDisclaimerModalContent from './legal-disclaimer-modal-content';

const contentMappings = {
  REQUEST_DOCUMENT: RequestDocumentModalContent,
  LEGAL_DISCLAIMER: LegalDisclaimerModalContent
};

class GenericModal extends React.Component {
  preventCloseModal(e) {
    // Stop onClick event to bubble up to the overlay, whose onClick handler
    // will close the modal.
    e.stopPropagation();
  }

  render() {
    const { activeModal, closeModal } = this.props;

    if (!activeModal) {
      return null;
    }

    const ContentClass = contentMappings[activeModal];

    return (
      <div className='test--generic-modal-overlay' style={ overlayStyle } onClick={ closeModal }>
        <div className='test--generic-modal-content' style={ contentStyle } onClick={ this.preventCloseModal }>
          <ContentClass closeModal={ closeModal }/>
        </div>
      </div>
    );
  }
}

GenericModal.propTypes = {
  activeModal: PropTypes.string,
  closeModal: PropTypes.func,
};

export default GenericModal;

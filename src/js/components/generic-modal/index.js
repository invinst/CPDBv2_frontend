import React, { PropTypes } from 'react';
import { Style } from 'radium';

import { overlayStyle, contentStyle } from './generic-modal.style';
import RequestDocumentModalContent from './request-document-modal-content';
import LegalDisclaimerModalContent from './legal-disclaimer-modal-content';
import scrollbarWidth from 'utils/scrollbar-width';

const contentMappings = {
  REQUEST_DOCUMENT: RequestDocumentModalContent,
  LEGAL_DISCLAIMER: LegalDisclaimerModalContent
};

class GenericModal extends React.Component {
  preventCloseModal(e) {
    // Stop onClick event from bubbling up to the overlay, whose onClick handler
    // will close the modal.
    e.stopPropagation();
  }

  render() {
    const { activeModal, closeModal } = this.props;

    if (!activeModal) {
      return <Style scopeSelector='body' rules={ { overflowY: 'scroll' } } />;
    }

    // Disable vertical scrolling and add padding in place of the vertical scrollbar to
    // prevent the page's content from shifting horizontally:
    const bodyStyleRules = { overflowY: 'hidden', paddingRight: `${scrollbarWidth}px` };
    const ContentClass = contentMappings[activeModal];

    return (
      <div className='test--generic-modal-overlay' style={ overlayStyle } onClick={ closeModal }>
        <div className='test--generic-modal-content' style={ contentStyle } onClick={ this.preventCloseModal }>
          <ContentClass closeModal={ closeModal }/>
        </div>
        <Style scopeSelector='body' rules={ bodyStyleRules } />
      </div>
    );
  }
}

GenericModal.propTypes = {
  activeModal: PropTypes.string,
  closeModal: PropTypes.func,
};

export default GenericModal;

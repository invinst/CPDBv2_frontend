import React, { PropTypes, Component } from 'react';

import RequestDocumentButton from 'components/common/request-document-button';
import styles from './attachment-header.sass';


export default class AttachmentHeader extends Component {
  render() {
    const { openRequestDocumentModal, alreadyRequested } = this.props;

    return (
      <div className={ styles.attachmentHeader }>
        <div className='attachment-message'>
          <span className='attachment-title'>DOCUMENTS</span>
          <span className='attachment-subtitle no-print'>MAY CONTAIN GRAPHIC CONTENT</span>
        </div>
        <div className='attachment-request-button no-print'>
          <RequestDocumentButton
            alreadyRequested={ alreadyRequested }
            openRequestDocumentModal={ openRequestDocumentModal }
            hasData={ true }
          />
        </div>
      </div>
    );
  }
}

AttachmentHeader.propTypes = {
  openRequestDocumentModal: PropTypes.func,
  alreadyRequested: PropTypes.bool,
};

import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import RequestDocumentButton from 'components/common/request-document-button';
import styles from './attachment-header.sass';
import printStyles from 'components/common/print.sass';


export default class AttachmentHeader extends Component {
  render() {
    const { openRequestDocumentModal, alreadyRequested } = this.props;

    return (
      <div className={ styles.attachmentHeader }>
        <div className='attachment-message'>
          <span className='attachment-title'>ATTACHMENTS</span>
          <span className={ cx(printStyles.hideForPrint, 'attachment-subtitle') }>MAY CONTAIN GRAPHIC CONTENT</span>
        </div>
        <div className={ cx(printStyles.hideForPrint, 'attachment-request-button') }>
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

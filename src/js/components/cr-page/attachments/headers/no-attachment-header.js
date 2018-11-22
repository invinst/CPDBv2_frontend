import React, { PropTypes, Component } from 'react';

import RequestDocumentButton from 'components/common/request-document-button';
import styles from './no-attachment-header.sass';


export default class NoAttachmentHeader extends Component {
  render() {
    const { openRequestDocumentModal, alreadyRequested } = this.props;

    return (
      <div className={ styles.noHeaderMessage }>
        <div className='message'>
          There are no documents that have been made public yet.
        </div>
        <div className='request-button'>
          <RequestDocumentButton
            alreadyRequested={ alreadyRequested }
            openRequestDocumentModal={ openRequestDocumentModal }
            hasData={ false }
          />
        </div>
      </div>
    );
  }
}

NoAttachmentHeader.propTypes = {
  openRequestDocumentModal: PropTypes.func,
  alreadyRequested: PropTypes.bool,
};

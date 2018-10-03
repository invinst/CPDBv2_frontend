import React, { PropTypes, Component } from 'react';

import RequestDocumentButton from 'components/common/request-document-button';
import { requestButtonStyle, messageStyle } from './no-attachment-header.style';


export default class NoAttachmentHeader extends Component {
  render() {
    const { openRequestDocumentModal, alreadyRequested } = this.props;

    return (
      <div>
        <div style={ messageStyle }>
          There are no documents that have been made public yet.
        </div>
        <div style={ requestButtonStyle }>
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

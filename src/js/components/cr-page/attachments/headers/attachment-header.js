import React, { PropTypes, Component } from 'react';

import RequestDocumentButton from 'components/common/request-document-button';
import { wrapperStyle, titleStyle, subTitleStyle, requestButtonStyle, messageStyle } from './attachment-header.style';


export default class AttachmentHeader extends Component {
  render() {
    const { openRequestDocumentModal, alreadyRequested } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div style={ messageStyle }>
          <span style={ titleStyle }>ATTACHMENTS</span>
          <span style={ subTitleStyle }>MAY CONTAIN GRAPHIC CONTENT</span>
        </div>
        <div style={ requestButtonStyle }>
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

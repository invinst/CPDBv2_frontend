import React, { PropTypes, Component } from 'react';

import AttachmentItem from './attachment-item';
import RequestDocumentButton from 'components/common/request-document-button';
import {
  wrapperStyle, headerStyle, titleStyle, subTitleStyle, emptyMessageStyle,
  requestButtonStyle, headerLeftColumnStyle
} from './attachments.style';


export default class Attachments extends Component {
  render() {
    const {
      items,
      openRequestDocumentModal,
      alreadyRequested
    } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div style={ headerStyle }>
          <div style={ headerLeftColumnStyle }>
            <span style={ titleStyle }>ATTACHMENTS</span>
            <span style={ subTitleStyle }>MAY CONTAIN GRAPHIC CONTENT</span>
          </div>
          <div style={ requestButtonStyle }>
            <RequestDocumentButton
              alreadyRequested={ alreadyRequested }
              openRequestDocumentModal={ openRequestDocumentModal } />
          </div>
        </div>
        <div>
          {
            items
              ? items.map((item, ind) => (
                <AttachmentItem key={ ind } { ...item } />
                ))
              : <p style={ emptyMessageStyle }>
                There are no attachments publicly available for this incident at this time.
                </p>
          }
        </div>
      </div>
    );
  }
}

Attachments.propTypes = {
  items: PropTypes.array,
  openRequestDocumentModal: PropTypes.func,
  alreadyRequested: PropTypes.bool
};

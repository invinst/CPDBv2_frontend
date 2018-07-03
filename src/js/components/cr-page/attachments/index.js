import React, { PropTypes, Component } from 'react';

import AttachmentItem from './attachment-item';
import RequestDocumentButton from 'components/common/request-document-button';
import {
  wrapperStyle, headerStyle, titleStyle, subTitleStyle, emptyMessageStyle,
  requestButtonStyle, headerLeftColumnStyle, innerWrapperStyle, attachmentsStyle
} from './attachments.style';


export default class Attachments extends Component {
  render() {
    const {
      items,
      openRequestDocumentModal,
      alreadyRequested
    } = this.props;

    const hasData = items.length > 0;

    return (
      <div style={ wrapperStyle(hasData) }>
        <div style={ innerWrapperStyle(hasData) }>
          <div style={ headerStyle }>
            {
              hasData
              ? (
                <div style={ headerLeftColumnStyle }>
                  <span style={ titleStyle }>ATTACHMENTS</span>
                  <span style={ subTitleStyle }>MAY CONTAIN GRAPHIC CONTENT</span>
                </div>
              ) : (
                <div style={ { ...headerLeftColumnStyle, ...emptyMessageStyle } }>
                  There are no documents that have been made public yet.
                </div>
              )
            }

            <div style={ requestButtonStyle }>
              <RequestDocumentButton
                alreadyRequested={ alreadyRequested }
                openRequestDocumentModal={ openRequestDocumentModal } />
            </div>
          </div>
          <div style={ attachmentsStyle }>
            {
              items.map((item, ind) => (
                <AttachmentItem key={ ind } { ...item } />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

Attachments.defaultProps = {
  items: []
};

Attachments.propTypes = {
  items: PropTypes.array,
  openRequestDocumentModal: PropTypes.func,
  alreadyRequested: PropTypes.bool
};

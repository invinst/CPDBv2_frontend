import React, { PropTypes, Component } from 'react';

import AttachmentHeader from './headers/attachment-header';
import NoAttachmentHeader from './headers/no-attachment-header';
import AttachmentItem from './attachment-item';
import { wrapperStyle, innerWrapperStyle, attachmentsStyle } from './attachments.style';


export default class Attachments extends Component {
  render() {
    const {
      items,
      openRequestDocumentModal,
      alreadyRequested,
      pathname,
    } = this.props;

    const hasData = items.length > 0;

    return (
      <div style={ wrapperStyle(hasData) }>
        <div style={ innerWrapperStyle(hasData) }>
          {
            hasData
            ? (
              <AttachmentHeader
                openRequestDocumentModal={ openRequestDocumentModal }
                alreadyRequested={ alreadyRequested }
              />
            ) : (
              <NoAttachmentHeader
                openRequestDocumentModal={ openRequestDocumentModal }
                alreadyRequested={ alreadyRequested }
              />
            )
          }
          <div style={ attachmentsStyle(hasData) }>
            {
              items.map((item, ind) => (
                <AttachmentItem key={ ind } { ...item } pathname={ pathname } />
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
  alreadyRequested: PropTypes.bool,
  pathname: PropTypes.string,
};

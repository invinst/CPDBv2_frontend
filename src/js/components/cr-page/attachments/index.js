import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import AttachmentHeader from './headers/attachment-header';
import PrintAttachments from './print-attachments';
import NoAttachmentHeader from './headers/no-attachment-header';
import AttachmentItem from './attachment-item';
import styles from './attachments.sass';


export default class Attachments extends Component {
  render() {
    const {
      items,
      openRequestDocumentModal,
      alreadyRequested,
      pathname,
    } = this.props;

    const { isPrinting } = this.context;

    const hasData = items.length > 0;

    return (
      isPrinting
      ? (
        <PrintAttachments items={ items }/>
      ) : (
        <div className={ cx(styles.attachmentsContainer, { 'has-data': hasData }) }>
          <div className='attachments-content'>
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
            <div className='attachments'>
              {
                items.map((item, ind) => (
                  <AttachmentItem key={ ind } { ...item } pathname={ pathname } />
                ))
              }
            </div>
          </div>
        </div>
      )
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

Attachments.contextTypes = {
  isPrinting: PropTypes.bool,
};

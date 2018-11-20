import React, { Component, PropTypes } from 'react';

import style from './trr-document.sass';
import RequestDocumentButton from 'components/common/request-document-button';


export default class TRRDocument extends Component {
  render() {
    const { alreadyRequested, openRequestTRRDocumentModal } = this.props;
    return (
      <div className={ style.trrDocument }>
        <div className='trr-document-text'>
          There are no documents that have been made public yet.
        </div>

        <div className='trr-request-document-button'>
          <RequestDocumentButton
            alreadyRequested={ alreadyRequested }
            openRequestDocumentModal={ openRequestTRRDocumentModal }
            hasData={ false }
          />
        </div>
      </div>
    );
  }
}


TRRDocument.propTypes = {
  alreadyRequested: PropTypes.bool,
  openRequestTRRDocumentModal: PropTypes.func,
};

TRRDocument.defaultProps = {
  alreadyRequested: false,
  openRequestTRRDocumentModal: () => {}
};

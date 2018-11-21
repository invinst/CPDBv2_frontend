import React, { Component, PropTypes } from 'react';

import style from './trr-document.sass';
import RequestDocumentButton from 'components/common/request-document-button';
import printStyles from 'components/common/print.sass';


export default class TRRDocument extends Component {
  render() {
    const { alreadyRequested, openRequestTRRDocumentModal } = this.props;
    return (
      <div className={ `${style.trrDocument} ${printStyles.hideForPrint}` }>
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

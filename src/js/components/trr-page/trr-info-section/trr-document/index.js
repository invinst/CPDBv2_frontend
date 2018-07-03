import React, { Component, PropTypes } from 'react';

import {
  wrapperStyle,
  textStyle,
  requestDocumentButtonStyle,
} from './trr-document.style';
import RequestDocumentButton from 'components/common/request-document-button';


export default class TRRDocument extends Component {
  render() {
    const { alreadyRequested, openRequestTRRDocumentModal } = this.props;
    return (
      <div style={ wrapperStyle }>
        <span style={ textStyle } className='test--no-document'>
          There are no documents that have been made public yet.
        </span>

        <div style={ requestDocumentButtonStyle }>
          <RequestDocumentButton
            alreadyRequested={ alreadyRequested }
            openRequestDocumentModal={ openRequestTRRDocumentModal }/>
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
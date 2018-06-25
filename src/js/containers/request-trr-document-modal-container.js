import React from 'react';
import { connect } from 'react-redux';

import { requestDocument } from 'actions/trr-page';
import { getTRRId } from 'utils/location';
import RequestDocumentModalContent from 'components/generic-modal/request-document-modal-content';


const mapDispatchToProps = {
  onRequestDocument: requestDocument
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: getTRRId(ownProps.location.pathname),
    message: state.trrPage.attachmentRequest.request.message,
    isRequested: state.trrPage.attachmentRequest.request.isRequested
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestDocumentModalContent);

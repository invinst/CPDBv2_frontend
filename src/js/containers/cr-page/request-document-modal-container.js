import React from 'react';
import { connect } from 'react-redux';

import { requestDocument } from 'actions/cr-page/index';
import { getCRID } from 'utils/location';
import RequestDocumentModalContent from 'components/generic-modal/request-document-modal-content';


const mapDispatchToProps = {
  onRequestDocument: requestDocument
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: getCRID(ownProps.location.pathname),
    message: state.crPage.attachmentRequest.request.message,
    isRequested: state.crPage.attachmentRequest.request.isRequested
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestDocumentModalContent);

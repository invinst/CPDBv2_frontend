import { connect } from 'react-redux';
import React from 'react';

import { contentSelector, getCRID, getOfficerId, getDocumentAlreadyRequested } from 'selectors/cr-page';
import CRPage from 'components/cr-page';
import { openRequestDocumentModal } from 'actions/generic-modal';


function mapStateToProps(state) {
  return {
    crid: getCRID(state),
    officerId: getOfficerId(state),
    ...contentSelector(state),
    alreadyRequested: getDocumentAlreadyRequested(state),
  };
}

const mapDispatchToProps = {
  openRequestDocumentModal
};

export default connect(mapStateToProps, mapDispatchToProps)(CRPage);

import { connect } from 'react-redux';
import React from 'react';

import { fetchCR } from 'actions/cr-page';
import { contentSelector, getCRID, getOfficerId, getDocumentAlreadyRequested } from 'selectors/cr-page';
import { openOfficerPage } from 'actions/bottom-sheet';
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
  fetchCR,
  openOfficerPage,
  openRequestDocumentModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(CRPage);

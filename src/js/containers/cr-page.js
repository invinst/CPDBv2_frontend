import { connect } from 'react-redux';
import React from 'react';

import { fetchCR } from 'actions/cr-page';
import { contentSelector, getCRID, getOfficerId } from 'selectors/cr-page';
import { openOfficerPage, openComplaintPage } from 'actions/bottom-sheet';
import CRPage from 'components/cr-page';
import { openRequestDocumentModal } from 'actions/generic-modal';


function mapStateToProps(state, ownProps) {
  return {
    crid: getCRID(state),
    officerId: getOfficerId(state),
    ...contentSelector(state)
  };
}

const mapDispatchToProps = {
  fetchCR,
  openOfficerPage,
  openComplaintPage,
  openRequestDocumentModal
};

export default connect(mapStateToProps, mapDispatchToProps)(CRPage);

import { connect } from 'react-redux';
import React from 'react';

import { fetchCR } from 'actions/cr-page';
import { contentSelector } from 'selectors/cr-page';
import { openBottomSheetWithOfficer, openBottomSheetWithComplaint } from 'actions/bottom-sheet';
import CRPage from 'components/cr-page';
import { openRequestDocumentModal } from 'actions/generic-modal';


function mapStateToProps(state, ownProps) {
  return {
    crid: ownProps.crid,
    officerId: parseInt(ownProps.officerId),
    ...contentSelector(state, ownProps)
  };
}

const mapDispatchToProps = {
  fetchCR,
  openBottomSheetWithOfficer,
  openBottomSheetWithComplaint,
  openRequestDocumentModal
};

export default connect(mapStateToProps, mapDispatchToProps)(CRPage);

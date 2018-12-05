import { connect } from 'react-redux';
import React from 'react';

import {
  getTRRId,
  officerSelector,
  trrLocationSelector,
  trrDetailSelector,
  trrDocumentSelector,
} from 'selectors/trr-page';
import { popupSelector } from 'selectors/popup';
import TRRPage from 'components/trr-page';
import { openRequestTRRDocumentModal } from 'actions/generic-modal';
import { getPathname } from 'selectors/common/pathname';


function mapStateToProps(state) {
  return {
    trrId: getTRRId(state),
    officer: officerSelector(state),
    trrDetail: trrDetailSelector(state),
    trrLocation: trrLocationSelector(state),
    trrDocument: trrDocumentSelector(state),
    popup: popupSelector(state),
    pathName: getPathname(state),
    notes: state.popups,
  };
}

const mapDispatchToProps = {
  openRequestTRRDocumentModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(TRRPage);

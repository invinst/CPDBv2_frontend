import { connect } from 'react-redux';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';
import { omit } from 'lodash';

import OfficerPage from 'components/officer-page';
import {
  getOfficerId,
  getOfficerName,
  metricsSelector,
  officerYearlyThreePercentile,
  summarySelector,
  getCurrentTab,
  getEditModeOn,
  getOfficerSlug,
} from 'selectors/officer-page';
import {
  changeOfficerTab,
  turnOnTriangleExplainEditMode,
  turnOffTriangleExplainEditMode,
  turnOnScaleExplainEditMode,
  turnOffScaleExplainEditMode,
  turnOnNoDataRadarChartExplainEditMode,
  turnOffNoDataRadarChartExplainEditMode
} from 'actions/officer-page';
import { hasComplaintSelector, numAttachmentsSelector } from 'selectors/officer-page/attachments';
import { hasMapMarkersSelector } from 'selectors/officer-page/map';
import { hasCoaccusalSelector } from 'selectors/officer-page/coaccusals';
import { popupSelector } from 'selectors/popup';
import { getCMSFields } from 'selectors/cms';
import { OFFICER_PAGE_ID, OFFICER_EDIT_TYPES } from 'utils/constants';
import { updatePage } from 'actions/cms';
import { getPathname } from 'selectors/common/pathname';
import { getInfoNotes, getTimelineNotes } from 'selectors/officer-page/print-notes';


function mapStateToProps(state, ownProps) {
  return {
    officerName: getOfficerName(state),
    officerId: getOfficerId(state),
    officerSummary: summarySelector(state),
    officerMetrics: metricsSelector(state),
    numAttachments: numAttachmentsSelector(state),
    threeCornerPercentile: officerYearlyThreePercentile(state),
    currentTab: getCurrentTab(state),
    hasComplaint: hasComplaintSelector(state),
    hasMapMarker: hasMapMarkersSelector(state),
    hasCoaccusal: hasCoaccusalSelector(state),
    popup: popupSelector(state),
    isRequesting: state.officerPage.isRequesting,
    editableFields: getCMSFields(OFFICER_PAGE_ID)(state),
    editModeOn: getEditModeOn(state),
    pathName: getPathname(state),
    officerSlug: getOfficerSlug(state),
    breadcrumbs: state.breadscrumbs,
    infoNotes: getInfoNotes(state),
    timelineNotes: getTimelineNotes(state),
  };
}


const editWrapperStateProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...omit(stateProps, ['editableFields', 'editModeOn']),
    ...omit(dispatchProps, [
      'onSaveForm',
      'turnOnTriangleExplainEditMode',
      'turnOffTriangleExplainEditMode',
      'turnOnScaleExplainEditMode',
      'turnOffScaleExplainEditMode',
      'turnOnNoDataRadarChartExplainEditMode',
      'turnOffNoDataRadarChartExplainEditMode'
    ]),
    triangleEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.editModeOn[OFFICER_EDIT_TYPES.TRIANGLE],
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnTriangleExplainEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffTriangleExplainEditMode
    },
    scaleEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.editModeOn[OFFICER_EDIT_TYPES.SCALE],
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnScaleExplainEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffScaleExplainEditMode
    },
    noDataRadarChartEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.editModeOn[OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART],
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnNoDataRadarChartExplainEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffNoDataRadarChartExplainEditMode
    },
  };
};

const mapDispatchToProps = {
  changeOfficerTab,
  onSaveForm: updatePage(OFFICER_PAGE_ID),
  turnOnTriangleExplainEditMode,
  turnOffTriangleExplainEditMode,
  turnOnScaleExplainEditMode,
  turnOffScaleExplainEditMode,
  turnOnNoDataRadarChartExplainEditMode,
  turnOffNoDataRadarChartExplainEditMode,
  pushBreadcrumbs
};

export default connect(mapStateToProps, mapDispatchToProps, editWrapperStateProps)(OfficerPage);

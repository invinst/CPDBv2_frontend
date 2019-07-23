import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';
import { omit } from 'lodash';

import { getPinboard, isEmptyPinboardSelector, examplePinboardsSelector } from 'selectors/pinboard-page/pinboard';
import PinboardPage from 'components/pinboard-page';
import { hasMapMarkersSelector } from 'selectors/pinboard-page/geographic-data';
import { getCurrentTab, pinboardPaneSectionRequestingSelector } from 'selectors/pinboard-page/pinboard-pane-section';
import { shouldRedirect } from 'selectors/pinboard-page/redirect';
import { getInitialRequested } from 'selectors/pinboard-page/pinboard';
import { focusedItemSelector } from 'selectors/pinboard-page/focused-item';
import { changePinboardTab } from 'actions/pinboard';
import {
  focusItem,
  addOrRemoveItemInPinboardFromPreviewPane,
  turnOnEmptyPinboardTitleEditMode,
  turnOffEmptyPinboardTitleEditMode,
  turnOnEmptyPinboardDescriptionEditMode,
  turnOffEmptyPinboardDescriptionEditMode,
} from 'actions/pinboard-page';
import { updatePathName } from 'actions/path-name';
import { updatePage } from 'actions/cms';
import { getCMSFields } from 'selectors/cms';
import { PINBOARD_EDIT_TYPES, PINBOARD_PAGE_ID } from 'utils/constants';
import { getEditModeOn } from 'selectors/pinboard-page/edit-mode';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  pinboard: getPinboard(state),
  currentTab: getCurrentTab(state),
  hasMapMarker: hasMapMarkersSelector(state),
  initialRequested: getInitialRequested(state),
  shouldRedirect: shouldRedirect(state),
  isEmptyPinboard: isEmptyPinboardSelector(state),
  focusedItem: focusedItemSelector(state),
  examplePinboards: examplePinboardsSelector(state),
  requesting: pinboardPaneSectionRequestingSelector(state),
  editModeOn: getEditModeOn(state),
  editableFields: getCMSFields(PINBOARD_PAGE_ID)(state),
});

const mapDispatchToProps = {
  changePinboardTab,
  focusItem,
  pushBreadcrumbs,
  updatePathName,
  addOrRemoveItemInPinboardFromPreviewPane,
  onSaveForm: updatePage(PINBOARD_PAGE_ID),
  turnOnEmptyPinboardTitleEditMode,
  turnOffEmptyPinboardTitleEditMode,
  turnOnEmptyPinboardDescriptionEditMode,
  turnOffEmptyPinboardDescriptionEditMode,
};

const editWrapperStateProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...omit(stateProps, ['editableFields', 'editModeOn']),
    ...omit(dispatchProps, [
      'onSaveForm',
      'turnOnEmptyPinboardTitleEditMode',
      'turnOffEmptyPinboardTitleEditMode',
      'turnOnEmptyPinboardDescriptionEditMode',
      'turnOffEmptyPinboardDescriptionEditMode',
    ]),
    emptyPinboardTitleEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.editModeOn[PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_TITLE],
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnEmptyPinboardTitleEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffEmptyPinboardTitleEditMode
    },
    emptyPinboardDescriptionEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.editModeOn[PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_DESCRIPTION],
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnEmptyPinboardDescriptionEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffEmptyPinboardDescriptionEditMode
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, editWrapperStateProps)(PinboardPage));

import { connect } from 'react-redux';

import RecentActivity from 'components/landing-page/recent-activity';
import { cardsSelector, getCarouselActivityHeaderEditModeOn } from 'selectors/landing-page/activity-grid';
import * as constants from 'utils/constants';
import { getCMSFields } from 'selectors/cms';
import { updatePage } from 'actions/cms';
import { mergeEditWrapperStateProps } from 'utils/container';
import {
  turnOffCarouselActivityHeaderEditMode,
  turnOnCarouselActivityHeaderEditMode,
} from 'actions/landing-page/activity-grid';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';


function mapStateToProps(state, ownProps) {
  return {
    cards: cardsSelector(state, ownProps),
    fields: getCMSFields(constants.LANDING_PAGE_ID)(state),
    pathname: ownProps.pathname,
    sectionEditModeOn: getCarouselActivityHeaderEditModeOn(state),
  };
}

const mapDispatchToProps = {
  onSaveForm: updatePage(constants.LANDING_PAGE_ID),
  turnOnSectionEditMode: turnOnCarouselActivityHeaderEditMode,
  turnOffSectionEditMode: turnOffCarouselActivityHeaderEditMode,
  addOrRemoveItemInPinboard: addOrRemoveItemInPinboard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeEditWrapperStateProps
)(RecentActivity);

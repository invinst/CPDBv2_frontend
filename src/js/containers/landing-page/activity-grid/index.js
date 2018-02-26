import { connect } from 'react-redux';

import * as constants from 'utils/constants';
import ActivityGrid from 'components/landing-page/activity-grid';
import { cardsSelector, getCarouselActivityHeaderEditModeOn } from 'selectors/landing-page/activity-grid';
import { getCMSFields } from 'selectors/cms';
import { requestActivityGrid } from 'actions/landing-page/activity-grid';
import { updatePage } from 'actions/cms';
import {
  turnOffCarouselActivityHeaderEditMode,
  turnOnCarouselActivityHeaderEditMode
} from 'actions/landing-page/activity-grid';
import { mergeEditWrapperStateProps } from 'utils/container';


function mapStateToProps(state, ownProps) {
  return {
    cards: cardsSelector(state, ownProps),
    fields: getCMSFields(constants.LANDING_PAGE_ID)(state),
    sectionEditModeOn: getCarouselActivityHeaderEditModeOn(state)
  };
}

const mapDispatchToProps = {
  requestActivityGrid,

  onSaveForm: updatePage(constants.LANDING_PAGE_ID),
  turnOnSectionEditMode: turnOnCarouselActivityHeaderEditMode,
  turnOffSectionEditMode: turnOffCarouselActivityHeaderEditMode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeEditWrapperStateProps
)(ActivityGrid);

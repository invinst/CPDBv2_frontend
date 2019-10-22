import { connect } from 'react-redux';

import * as constants from 'utils/constants';
import {
  turnOnCarouselComplaintHeaderEditMode,
  turnOffCarouselComplaintHeaderEditMode,
} from 'actions/landing-page/complaint-summaries';
import {
  cardsSelector,
  getCarouselComplaintHeaderEditModeOn,
} from 'selectors/landing-page/complaint-summaries';
import ComplaintSummaries from 'components/landing-page/complaint-summaries';
import { getCMSFields } from 'selectors/cms';
import { updatePage } from 'actions/cms';
import { mergeEditWrapperStateProps } from 'utils/container';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';


function mapStateToProps(state, ownProps) {
  return {
    cards: cardsSelector(state),
    fields: getCMSFields(constants.LANDING_PAGE_ID)(state),
    sectionEditModeOn: getCarouselComplaintHeaderEditModeOn(state),
    pathname: ownProps.pathname,
  };
}

const mapDispatchToProps = {
  onSaveForm: updatePage(constants.LANDING_PAGE_ID),
  turnOnSectionEditMode: turnOnCarouselComplaintHeaderEditMode,
  turnOffSectionEditMode: turnOffCarouselComplaintHeaderEditMode,
  addOrRemoveItemInPinboard: addOrRemoveItemInPinboard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeEditWrapperStateProps
)(ComplaintSummaries);

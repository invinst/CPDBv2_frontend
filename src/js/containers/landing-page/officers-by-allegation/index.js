import { connect } from 'react-redux';

import OfficersByAllegation from 'components/landing-page/officers-by-allegation';
import { cardsSelector, getCarouselAllegationHeaderEditModeOn } from 'selectors/landing-page/officers-by-allegation';
import * as constants from 'utils/constants';
import { getCMSFields } from 'selectors/cms';
import { updatePage } from 'actions/cms';
import { mergeEditWrapperStateProps } from 'utils/container';
import {
  turnOffCarouselAllegationHeaderEditMode,
  turnOnCarouselAllegationHeaderEditMode,
} from 'actions/landing-page/officers-by-allegation';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';


function mapStateToProps(state, ownProps) {
  return {
    cards: cardsSelector(state, ownProps),
    pathname: ownProps.pathname,
    openCardInNewPage: ownProps.openCardInNewPage,
    fields: getCMSFields(constants.LANDING_PAGE_ID)(state),
    sectionEditModeOn: getCarouselAllegationHeaderEditModeOn(state),
  };
}

const mapDispatchToProps = {
  onSaveForm: updatePage(constants.LANDING_PAGE_ID),
  turnOnSectionEditMode: turnOnCarouselAllegationHeaderEditMode,
  turnOffSectionEditMode: turnOffCarouselAllegationHeaderEditMode,
  addOrRemoveItemInPinboard: addOrRemoveItemInPinboard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeEditWrapperStateProps
)(OfficersByAllegation);

import { connect } from 'react-redux';

import TopLawsuits from 'components/landing-page/top-lawsuits';
import { cardsSelector } from 'selectors/landing-page/top-lawsuits';
import { getCMSFields } from 'selectors/cms';
import * as constants from 'utils/constants';
import { mergeEditWrapperStateProps } from 'utils/container';
import { getCarouselLawsuitHeaderEditModeOn } from 'selectors/landing-page/top-lawsuits';
import {
  turnOffCarouselLawsuitHeaderEditMode,
  turnOnCarouselLawsuitHeaderEditMode,
} from 'actions/landing-page/top-lawsuits';
import { updatePage } from 'actions/cms';


const mapStateToProps = (state, ownProps) => ({
  cards: cardsSelector(state),
  fields: getCMSFields(constants.LANDING_PAGE_ID)(state),
  sectionEditModeOn: getCarouselLawsuitHeaderEditModeOn(state),
  pathname: ownProps.pathname,
});

const mapDispatchToProps = {
  onSaveForm: updatePage(constants.LANDING_PAGE_ID),
  turnOnSectionEditMode: turnOnCarouselLawsuitHeaderEditMode,
  turnOffSectionEditMode: turnOffCarouselLawsuitHeaderEditMode,
};

export default connect(mapStateToProps, mapDispatchToProps, mergeEditWrapperStateProps)(TopLawsuits);

import { connect } from 'react-redux';

import { cardsSelector, getCarouselDocumentHeaderEditModeOn } from 'selectors/landing-page/recent-document';
import RecentDocument from 'components/landing-page/recent-document';
import * as constants from 'utils/constants';
import { getCMSFields } from 'selectors/cms';
import { updatePage } from 'actions/cms';
import { trackingClickAttachment } from 'actions/common/analytic';
import { mergeEditWrapperStateProps } from 'utils/container';
import {
  turnOnCarouselDocumentHeaderEditMode,
  turnOffCarouselDocumentHeaderEditMode,
} from 'actions/landing-page/recent-document';


function mapStateToProps(state, ownProps) {
  return {
    cards: cardsSelector(state),
    pathname: ownProps.pathname,
    fields: getCMSFields(constants.LANDING_PAGE_ID)(state),
    sectionEditModeOn: getCarouselDocumentHeaderEditModeOn(state),
  };
}

const mapDispatchToProps = {
  onSaveForm: updatePage(constants.LANDING_PAGE_ID),
  turnOnSectionEditMode: turnOnCarouselDocumentHeaderEditMode,
  turnOffSectionEditMode: turnOffCarouselDocumentHeaderEditMode,
  onTrackingAttachment: trackingClickAttachment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeEditWrapperStateProps
)(RecentDocument);

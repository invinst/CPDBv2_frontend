import { connect } from 'react-redux';

import { dataAvailableSelector, faqsSelector } from 'selectors/landing-page/faqs-selector';
import { openBottomSheetWithFAQ } from 'actions/bottom-sheet';
import FAQSection from 'components/landing-page/faq-section';
import { updateLandingPage, turnOnSectionEditMode, turnOffSectionEditMode, FAQ } from 'actions/landing-page';


function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    faqs: faqsSelector(state),
    fields: state.landingPage.faqSection.fields,
    sectionEditModeOn: state.landingPage.faqSection.editModeOn
  };
}

const mapDispatchToProps = {
  openBottomSheetWithFAQ,
  onSaveForm: updateLandingPage,
  turnOnSectionEditMode: turnOnSectionEditMode.bind(null, FAQ),
  turnOffSectionEditMode: turnOffSectionEditMode.bind(null, FAQ)
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQSection);


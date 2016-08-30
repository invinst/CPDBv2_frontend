import { connect } from 'react-redux';
import React from 'react';

import { dataAvailableSelector, faqsSelector } from 'selectors/landing-page/faqs-selector';
import { openBottomSheetWithFAQ } from 'actions/landing-page/bottom-sheet';
import FAQSection from 'components/landing-page/faq-section';

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    faqs: faqsSelector(state)
  };
}

const mapDispatchToProps = {
  openBottomSheetWithFAQ
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQSection);


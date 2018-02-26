import { connect } from 'react-redux';
import React from 'react';

import { requestFAQs, updateOrder, updateFAQ, expandFAQ } from 'actions/faq-page';
import { openBottomSheetWithFAQ, openBottomSheetToCreateFAQ } from 'actions/bottom-sheet';
import { faqsSelector, faqsRequested } from 'selectors/faq-page/faqs-selector';
import FAQListWrapper from 'components/faq-page/faq-list-wrapper';

function mapStateToProps(state, ownProps) {
  return {
    faqs: faqsSelector(state),
    requested: faqsRequested(state),
    editModeOn: ownProps.editModeOn
  };
}

const mapDispatchToProps = {
  requestFAQs,
  openBottomSheetWithFAQ,
  updateOrder,
  openBottomSheetToCreateFAQ,
  expandFAQ,
  updateFAQ
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQListWrapper);

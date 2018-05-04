import { connect } from 'react-redux';
import React from 'react';

import { updateOrder, updateFAQ, expandFAQ } from 'actions/faq-page';
import { openBottomSheetWithFAQ, openBottomSheetToCreateFAQ } from 'actions/bottom-sheet';
import { faqsSelector } from 'selectors/faq-page/faqs-selector';
import FAQListWrapper from 'components/faq-page/faq-list-wrapper';

function mapStateToProps(state, ownProps) {
  return {
    faqs: faqsSelector(state),
    editModeOn: ownProps.editModeOn
  };
}

const mapDispatchToProps = {
  openBottomSheetWithFAQ,
  updateOrder,
  openBottomSheetToCreateFAQ,
  expandFAQ,
  updateFAQ
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQListWrapper);

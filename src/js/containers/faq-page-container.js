import { connect } from 'react-redux';
import React from 'react';

import { requestFAQs, updateOrder, updateFAQ } from 'actions/faq-page';
import { openBottomSheetWithFAQ, openBottomSheetToCreateFAQ } from 'actions/bottom-sheet';
import { expandFAQ } from 'actions/faq-page/index';
import { faqsSelector } from 'selectors/faq-page/faqs-selector';
import DroppableFAQListSection from 'components/faq-page/droppable-faq-list-section';

function mapStateToProps(state, ownProps) {
  return {
    faqs: faqsSelector(state)
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

export default connect(mapStateToProps, mapDispatchToProps)(DroppableFAQListSection);

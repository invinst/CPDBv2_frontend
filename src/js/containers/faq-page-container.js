import { connect } from 'react-redux';
import React from 'react';

import { requestFAQs, updateOrder } from 'actions/faq-page';
import { openBottomSheetWithFAQ, openBottomSheetToCreateFAQ } from 'actions/bottom-sheet';
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
  openBottomSheetToCreateFAQ
};

export default connect(mapStateToProps, mapDispatchToProps)(DroppableFAQListSection);

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { requestFAQs, askQuestion } from 'actions/faq-page';
import { openBottomSheetWithFAQ, openBottomSheetToCreateFAQ } from 'actions/bottom-sheet';
import { dataAvailableSelector, faqsSelector } from 'selectors/faq-page/faqs-selector';
import { getIsSubmitting } from 'selectors/faq-page/faq-form-selector';
import FAQListSection from 'components/faq-page/faq-list-section';
import FAQListSectionPlaceHolder from 'components/faq-page/faq-list-section-placeholder';


export class UnconnectedFAQPageContainer extends Component {
  componentDidMount() {
    this.props.requestFAQs();
  }

  render() {
    const {
      dataAvailable, faqs,
      openBottomSheetWithFAQ, openBottomSheetToCreateFAQ
    } = this.props;

    if (dataAvailable) {
      return (
        <div>
          <FAQListSection
            faqs={ faqs }
            openBottomSheetToCreateFAQ={ openBottomSheetToCreateFAQ }
            openBottomSheetWithFAQ={ openBottomSheetWithFAQ }/>
        </div>
      );
    } else {
      return (
        <FAQListSectionPlaceHolder/>
      );
    }
  }
}

UnconnectedFAQPageContainer.propTypes = {
  requestFAQs: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  faqs: PropTypes.array,
  store: PropTypes.object,
  openBottomSheetWithFAQ: PropTypes.func,
  openBottomSheetToCreateFAQ: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    faqs: faqsSelector(state),
    isSubmitting: getIsSubmitting(state)
  };
}

const mapDispatchToProps = {
  requestFAQs,
  openBottomSheetWithFAQ,
  askQuestion,
  openBottomSheetToCreateFAQ
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedFAQPageContainer);

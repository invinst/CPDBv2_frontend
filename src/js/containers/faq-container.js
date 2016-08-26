import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { dataAvailableSelector, faqsSelector } from 'selectors/landing-page/faqs-selector';
import { requestFAQs } from 'actions/landing-page/faq-app';
import { openBottomSheetWithFAQ } from 'actions/landing-page/bottom-sheet';
import FAQSectionContent from 'components/landing-page/faq-section/faq-section-content';
import FAQSectionPlaceHolder from 'components/landing-page/faq/faq-section-place-holder';


export class UnconnectedFAQContainer extends Component {
  componentDidMount() {
    this.props.requestFAQs({ limit: 3 });
  }

  render() {
    const { dataAvailable, faqs } = this.props;

    if (dataAvailable) {
      return (
        <FAQSectionContent faqs={ faqs } onFAQClick={ this.props.openBottomSheetWithFAQ }/>
      );
    } else {
      return (
        <FAQSectionPlaceHolder/>
      );
    }
  }
}

UnconnectedFAQContainer.propTypes = {
  requestFAQs: PropTypes.func.isRequired,
  openBottomSheetWithFAQ: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  faqs: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    faqs: faqsSelector(state)
  };
}

const mapDispatchToProps = {
  requestFAQs,
  openBottomSheetWithFAQ
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedFAQContainer);


import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { dataAvailableSelector, faqsSelector } from 'selectors/faqs-selector';
import { requestFAQs } from 'actions/faq-app';
import FAQSection from 'components/faq/faq-section';
import FAQSectionPlaceHolder from 'components/faq/faq-section-place-holder';


export class UnconnectedFAQContainer extends Component {
  componentDidMount() {
    this.props.requestFAQs({ limit: 3 });
  }

  render() {
    const { dataAvailable, faqs } = this.props;

    if (dataAvailable) {
      return (
        <FAQSection faqs={ faqs }/>
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
  requestFAQs
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedFAQContainer);


import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { requestFAQs, askQuestion } from 'actions/faq-page';
import { dataAvailableSelector, faqsSelector } from 'selectors/faq-page/faqs-selector';
import FAQListSection from 'components/faq-page/faq-list-section';
import FAQListSectionPlaceHolder from 'components/faq-page/faq-list-section-placeholder';


export class UnconnectedFAQPageContainer extends Component {
  componentDidMount() {
    this.props.requestFAQs();
  }

  render() {
    const { dataAvailable, faqs } = this.props;

    if (dataAvailable) {
      return (
        <div>
          <FAQListSection faqs={ faqs }/>
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
  store: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    faqs: faqsSelector(state)
  };
}

const mapDispatchToProps = {
  requestFAQs,
  askQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedFAQPageContainer);

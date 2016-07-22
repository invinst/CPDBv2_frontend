import React, { Component, PropTypes } from 'react';

import FAQItem from 'components/common/faq/faq-item';


export default class FAQSectionContent extends Component {
  render() {
    const { faqs, onFAQClick } = this.props;

    return (
      <div>
        {
          faqs.map((faq, ind) => {
            return (
              <FAQItem key={ ind } faq={ faq } onClick={ onFAQClick } underlineTitle={ ind != faqs.length - 1 }/>
            );
          })
        }
      </div>
    );
  }
}

FAQSectionContent.propTypes = {
  faqs: PropTypes.array,
  onFAQClick: PropTypes.func
};

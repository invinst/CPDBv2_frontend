import React, { Component, PropTypes } from 'react';

import FAQItem from 'components/common/faq/faq-item';
import { underlineFAQStyle } from './faq-section-content.style';


export default class FAQSectionContent extends Component {
  render() {
    const { faqs, onFAQClick } = this.props;

    return (
      <div>
        {
          faqs.map((faq, ind) => {
            return (
              <FAQItem
                key={ ind }
                faq={ faq }
                onClick={ onFAQClick }
                wrapperStyle={ [ind < faqs.length - 1 && underlineFAQStyle] }/>
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

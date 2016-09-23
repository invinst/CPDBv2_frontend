import React, { PropTypes, Component } from 'react';
import { isEqual } from 'lodash';

import ConfiguredRadium from 'utils/configured-radium';
import { FAQ_PATH } from 'utils/constants';
import FAQItem from 'components/common/faq/faq-item';
import MoreLink from 'components/common/more-link';
import FAQSectionPlaceHolder from 'components/landing-page/faq-section/faq-section-place-holder';
import {
  alignLeftStyle, alignRightStyle, headerStyle, contentStyle, underlineFAQStyle, wrapperStyle
} from './faq-section.style';


class FAQSection extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  renderContent() {
    const { dataAvailable, faqs, openBottomSheetWithFAQ } = this.props;

    if (dataAvailable) {
      return (
        <div>
        { faqs.map((faq, ind) => {
          return (
            <FAQItem
              key={ ind }
              faq={ faq }
              onClick={ openBottomSheetWithFAQ }
              wrapperStyle={ [ind < faqs.length - 1 && underlineFAQStyle] }/>
          );
        }) }
        </div>
      );
    } else {
      return (
        <FAQSectionPlaceHolder/>
      );
    }
  }

  render() {
    return (
      <div style={ wrapperStyle }>
        <div style={ headerStyle }>
          <span style={ alignLeftStyle }>FAQ</span>
          <span style={ alignRightStyle }>
            <MoreLink to={ FAQ_PATH }>See more FAQ</MoreLink>
          </span>
        </div>
        <div style={ contentStyle }>
            { this.renderContent() }
        </div>
      </div>
    );
  }
}

FAQSection.propTypes = {
  openBottomSheetWithFAQ: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  faqs: PropTypes.array
};

export default ConfiguredRadium(FAQSection);

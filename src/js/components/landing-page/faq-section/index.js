import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { FAQ_PATH } from 'utils/constants';
import FAQItem from 'components/common/faq/faq-item';
import MoreLink from 'components/common/more-link';
import FAQSectionPlaceHolder from 'components/landing-page/faq-section/faq-section-place-holder';
import {
  alignLeftStyle, alignRightStyle, headerStyle, contentStyle, underlineFAQStyle, wrapperStyle
} from './faq-section.style';
import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import PropsRerender from 'components/common/higher-order/props-rerender';


class FAQSection extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        header: [headerStyle.base, headerStyle.extraWide]
      },
      [DESKTOP]: {
        header: [headerStyle.base, headerStyle.desktop]
      },
      [TABLET]: {
        header: [headerStyle.base, headerStyle.tablet]
      }
    };
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

  renderWithResponsiveStyle(style) {
    return (
      <div style={ wrapperStyle }>
        <div style={ style.header }>
          <span style={ alignLeftStyle }>FAQ</span>
          <span style={ alignRightStyle }>
            <MoreLink style={ style.moreLink } to={ FAQ_PATH }>See more FAQ</MoreLink>
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

export default PropsRerender(ConfiguredRadium(FAQSection));

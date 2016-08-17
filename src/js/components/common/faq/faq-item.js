import React, { PropTypes } from 'react';

import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';
import { faqItemStyle, faqItemTitleStyle } from './faq-item.style';


class FAQItem extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        faqItemTitle: [faqItemTitleStyle.base, faqItemTitleStyle.extraWide]
      },
      [DESKTOP]: {
        faqItemTitle: faqItemTitleStyle.base
      },
      [TABLET]: {
        faqItemTitle: [faqItemTitleStyle.base, faqItemTitleStyle.tablet]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    const { faq, onClick, wrapperStyle } = this.props;

    return (
      <div key={ style.screen } style={ [faqItemStyle, wrapperStyle] }>
        <div
          className='faq-title link--transition'
          style={ style.faqItemTitle }
          onClick={ () => { onClick(faq); } }>
          { faq.title }
        </div>
      </div>
    );
  }
}

FAQItem.propTypes = {
  faq: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.array
  }),
  onClick: PropTypes.func,
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

FAQItem.defaultProps = {
  wrapperStyle: {}
};

export default ConfiguredRadium(FAQItem);

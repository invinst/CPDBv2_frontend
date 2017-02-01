import React, { Component, PropTypes } from 'react';

import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import Hoverable from 'components/common/higher-order/hoverable';
import { faqItemStyle } from './faq-item.style';


class FAQItem extends Component {

  renderWithResponsiveStyle(style) {
    const { faqId, onClick, wrapperStyle, fieldProps, hovering } = this.props;

    return (
      <div
        key={ style.screen }
        className='faq-title link--transition test--faq-item'
        style={ { ...style.faqItem, ...wrapperStyle.base, ...(hovering ? wrapperStyle.hover : {}) } }
        onClick={ () => { onClick(faqId); } }>
        <RichTextEditable
          placeholder='Question'
          { ...fieldProps['question'] }/>
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ {
          [EXTRA_WIDE]: {
            faqItem: { ...faqItemStyle.base, ...faqItemStyle.extraWide }
          },
          [DESKTOP]: {
            faqItem: faqItemStyle.base
          },
          [TABLET]: {
            faqItem: { ...faqItemStyle.base, ...faqItemStyle.tablet }
          }
        } }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

FAQItem.propTypes = {
  faqId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fieldProps: PropTypes.object,
  onClick: PropTypes.func,
  hovering: PropTypes.bool,
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

FAQItem.defaultProps = {
  wrapperStyle: {}
};

export default Hoverable(FAQItem);

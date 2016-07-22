import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { faqItemStyle, faqItemTitleStyle } from './faq-item.style';


class FAQItem extends Component {
  render() {
    const { faq, onClick, underlineTitle } = this.props;

    return (
      <div style={ [underlineTitle && faqItemStyle] }>
        <div
          className='faq-title link--transition'
          style={ faqItemTitleStyle }
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
  underlineTitle: PropTypes.bool
};

FAQItem.defaultProps = {
  underlineTitle: true
};

export default ConfiguredRadium(FAQItem);

import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { contentStyle, paragraphStyle, faqContentStyle } from './faq-item-content.style';


class FAQItemContent extends Component {
  render() {
    return (
      <div style={ [contentStyle, this.props.style] }>
        <div style={ faqContentStyle }>
        { this.props.faq.body.map((paragraph, key) => {
          return <p style={ paragraphStyle } key={ key } >{ paragraph.value }</p>;
        }) }
        </div>
      </div>
    );
  }
}

FAQItemContent.propTypes = {
  faq: PropTypes.object,
  style: PropTypes.object
};

export default ConfiguredRadium(FAQItemContent);

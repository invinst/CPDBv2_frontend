import React, { Component, PropTypes } from 'react';

import { faqPageStyle } from './faq-page.style';
import FAQPageContainer from 'containers/faq-page-container';


export default class FAQPage extends Component {
  render() {
    return (
      <div style={ faqPageStyle }>
        <FAQPageContainer store={ this.props.store }/>
      </div>
    );
  }
}

FAQPage.propTypes = {
  store: PropTypes.object
};


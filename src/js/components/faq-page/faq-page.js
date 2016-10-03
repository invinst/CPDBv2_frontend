import React, { Component, PropTypes } from 'react';

import { faqPageStyle } from './faq-page.style';
import FAQPageContainer from 'containers/faq-page-container';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import Footer from 'components/footer';


export default class FAQPage extends Component {
  render() {
    return (
      <div style={ faqPageStyle }>
        <ResponsiveFixedWidthComponent>
          <FAQPageContainer store={ this.props.store }/>
        </ResponsiveFixedWidthComponent>
        <Footer/>
      </div>
    );
  }
}

FAQPage.propTypes = {
  store: PropTypes.object
};

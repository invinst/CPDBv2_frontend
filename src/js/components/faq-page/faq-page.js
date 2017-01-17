import React, { Component, PropTypes } from 'react';

import { faqPageStyle } from './faq-page.style';
import FAQPageContainer from 'containers/faq-page-container';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';


class FAQPage extends Component {
  shouldComponentUpdate() {
    /* istanbul ignore next */
    return false;
  }

  render() {
    return (
      <div style={ faqPageStyle }>
        <ResponsiveFixedWidthComponent>
          <FAQPageContainer store={ this.props.store }/>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}

FAQPage.propTypes = {
  store: PropTypes.object
};

export default FAQPage;

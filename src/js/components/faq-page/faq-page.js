import React, { Component, PropTypes } from 'react';

import { faqPageStyle } from './faq-page.style';
import FAQPageContainer from 'containers/faq-page-container';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';


class FAQPage extends Component {
  render() {
    const { editModeOn } = this.context;
    return (
      <div style={ faqPageStyle }>
        <ResponsiveFixedWidthComponent>
          <FAQPageContainer editModeOn={ editModeOn } store={ this.props.store }/>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}

FAQPage.propTypes = {
  store: PropTypes.object
};

FAQPage.contextTypes = {
  editModeOn: PropTypes.bool
};

export default FAQPage;

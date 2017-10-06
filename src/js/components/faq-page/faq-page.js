import React, { Component, PropTypes } from 'react';

import { faqPageStyle } from './faq-page.style';
import FAQPageContainer from 'containers/faq-page-container';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';


class FAQPage extends Component {
  render() {
    const { editModeOn } = this.context;
    return (
      <div style={ faqPageStyle }>
        <ResponsiveFluidWidthComponent>
          <FAQPageContainer editModeOn={ editModeOn } store={ this.props.store }/>
        </ResponsiveFluidWidthComponent>
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

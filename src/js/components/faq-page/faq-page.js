import React, { Component, PropTypes } from 'react';

import { faqPageStyle } from './faq-page.style';
import FAQPageContainer from 'containers/faq-page-container';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';


export default class FAQPage extends Component {
  render() {
    return (
      <div style={ faqPageStyle }>
        <ResponsiveFixedWidthComponent>
          <div className='pure-g'>
            <div className='pure-u-1-2'>
              <FAQPageContainer store={ this.props.store }/>
            </div>
          </div>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}

FAQPage.propTypes = {
  store: PropTypes.object
};

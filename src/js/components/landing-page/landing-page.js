import React, { Component, PropTypes } from 'react';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import ConfiguredRadium from 'utils/configured-radium';
import HeroSection from 'components/landing-page/hero-section';
import CoverageSection from './coverage-section/coverage-section';
import FAQSection from './faq-section/faq-section';
import VFTGSection from './vftg-section';
import AboutSection from './about-section/about-section';
import TwitterSection from './twitter-section/twitter-section';
import CollaborateSection from './collaborate-section/collaborate-section';
import {
  bottomSectionsWrapperStyle, sectionStyle, lastSectionStyle,
  twitterSectionHeightStyle, vftgSectionHeightStyle
} from './landing-page.style';
import { SOLID_TEMPLATE } from 'utils/constants';


class LandingPage extends Component {
  render() {
    const { store } = this.props;

    return (
      <div>
        <HeroSection />
        <div style={ bottomSectionsWrapperStyle }>
          <ResponsiveFixedWidthComponent>
            <div className='pure-g'>
              <div className='pure-u-1-1'>
                <CoverageSection wrapperStyle={ sectionStyle } store={ store }/>
              </div>
              <div className='pure-u-3-5'>
                <FAQSection wrapperStyle={ [sectionStyle, vftgSectionHeightStyle] } store={ store }/>
              </div>
              <div className='pure-u-2-5'>
                <VFTGSection wrapperStyle={ [sectionStyle, vftgSectionHeightStyle] } template={ SOLID_TEMPLATE }/>
              </div>
              <div className='pure-u-3-5'>
                <AboutSection wrapperStyle={ [sectionStyle, twitterSectionHeightStyle] }/>
              </div>
              <div className='pure-u-2-5'>
                <TwitterSection wrapperStyle={ [sectionStyle, twitterSectionHeightStyle] }/>
              </div>
              <div className='pure-u-1-1'>
                <CollaborateSection wrapperStyle={ [sectionStyle, lastSectionStyle] }/>
              </div>
            </div>
          </ResponsiveFixedWidthComponent>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  store: PropTypes.object
};

export default ConfiguredRadium(LandingPage);

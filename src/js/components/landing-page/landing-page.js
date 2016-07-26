import React, { PropTypes } from 'react';

import ResponsiveStyleComponent, { DESKTOP, TABLET } from 'components/responsive/responsive-style-component';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import ConfiguredRadium from 'utils/configured-radium';
import HeroSection from 'components/landing-page/hero-section';
import CoverageSection from './coverage-section/coverage-section';
import FAQSection from './faq-section/faq-section';
import VFTGSection from './vftg-section';
import AboutSection from './about-section';
import TwitterSection from './twitter-section/twitter-section';
import CollaborateSection from './collaborate-section';
import {
  bottomSectionsWrapperStyle, sectionStyle, lastSectionStyle, vftgSectionHeightStyle, divideLineStyle
} from './landing-page.style';


class LandingPage extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [DESKTOP]: {
        leftColumnClassName: 'pure-u-3-5',
        rightColumnClassName: 'pure-u-2-5'
      },
      [TABLET]: {
        leftColumnClassName: 'pure-u-1-2',
        rightColumnClassName: 'pure-u-1-2'
      }
    };
  }

  renderWithResponsiveStyle(style) {
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
              <div className={ style.leftColumnClassName }>
                <div className='pure-u-1-1'>
                  <FAQSection wrapperStyle={ sectionStyle } store={ store }/>
                </div>
                <div className='pure-u-1-1'>
                  <AboutSection wrapperStyle={ [sectionStyle, lastSectionStyle] }/>
                </div>
              </div>
              <div className={ style.rightColumnClassName }>
                <div className='pure-u-1-1'>
                  <VFTGSection wrapperStyle={ [sectionStyle, vftgSectionHeightStyle] }/>
                </div>
                <div className='pure-u-1-1'>
                  <TwitterSection wrapperStyle={ sectionStyle }/>
                </div>
              </div>
              <div style={ divideLineStyle }/>
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

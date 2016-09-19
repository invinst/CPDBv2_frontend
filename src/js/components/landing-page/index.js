import React, { PropTypes } from 'react';

import ResponsiveStyleComponent, { DESKTOP, TABLET } from 'components/responsive/responsive-style-component';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import ConfiguredRadium from 'utils/configured-radium';
import HeroSection from 'components/landing-page/hero-section';
import FAQSectionContainer from 'containers/landing-page/faq-section-container';
import ReportingSectionContainer from 'containers/landing-page/reporting-section-container';
import VFTGSection from './vftg-section';
import AboutSection from './about-section';
import TwitterSection from './twitter-section/twitter-section';
import CollaborateSection from './collaborate-section';
import { bottomSectionsWrapperStyle, divideLineStyle } from './landing-page.style';


class LandingPage extends ResponsiveStyleComponent {
  componentDidMount() {
    this.props.requestLandingPage(null, this.context.adapter);
  }

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
    const { store, vftgSection, heroSection, collaborateSection, aboutSection } = this.props;

    return (
      <div>
        <HeroSection { ...heroSection } />
        <div style={ bottomSectionsWrapperStyle }>
          <ResponsiveFixedWidthComponent>
            <div className='pure-g'>
              <div className='pure-u-1-1'>
                <ReportingSectionContainer store={ store }/>
              </div>
              <div className={ style.leftColumnClassName }>
                <div className='pure-u-1-1'>
                  <FAQSectionContainer store={ store }/>
                </div>
                <div className='pure-u-1-1'>
                  <AboutSection { ...aboutSection }/>
                </div>
              </div>
              <div className={ style.rightColumnClassName }>
                <div className='pure-u-1-1'>
                  <VFTGSection { ...vftgSection }/>
                </div>
                <div className='pure-u-1-1'>
                  <TwitterSection/>
                </div>
              </div>
              <div style={ divideLineStyle }/>
              <div className='pure-u-1-1'>
                <CollaborateSection { ...collaborateSection }/>
              </div>
            </div>
          </ResponsiveFixedWidthComponent>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  store: PropTypes.object,
  heroSection: PropTypes.object,
  vftgSection: PropTypes.object,
  requestLandingPage: PropTypes.func
};

LandingPage.contextTypes = {
  adapter: PropTypes.func
};

export default ConfiguredRadium(LandingPage);

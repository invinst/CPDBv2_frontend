import React, { Component, PropTypes } from 'react';

import ResponsiveStyleComponent, { DESKTOP, TABLET } from 'components/responsive/responsive-style-component';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import ConfiguredRadium from 'utils/configured-radium';
import HeroSectionContainer from 'containers/landing-page/hero-section-container';
import FAQSectionContainer from 'containers/landing-page/faq-section-container';
import ReportingSectionContainer from 'containers/landing-page/reporting-section-container';
import VFTGSectionContainer from 'containers/landing-page/vftg-section';
import TwitterSection from './twitter-section/twitter-section';
import AboutSectionContainer from 'containers/landing-page/about-section-container';
import CollaborateSectionContainer from 'containers/landing-page/collaborate-section-container';
import { bottomSectionsWrapperStyle, divideLineStyle } from './landing-page.style';
import PropsRerender from 'components/common/higher-order/props-rerender';


class LandingPage extends Component {
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
    const { store } = this.props;

    return (
      <div>
        <HeroSectionContainer/>
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
                  <AboutSectionContainer />
                </div>
              </div>
              <div className={ style.rightColumnClassName }>
                <div className='pure-u-1-1'>
                  <VFTGSectionContainer/>
                </div>
                <div className='pure-u-1-1'>
                  <TwitterSection/>
                </div>
              </div>
              <div style={ divideLineStyle }/>
              <div className='pure-u-1-1'>
                <CollaborateSectionContainer/>
              </div>
            </div>
          </ResponsiveFixedWidthComponent>
        </div>
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ this.responsiveStyle() }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

LandingPage.propTypes = {
  store: PropTypes.object,
  vftgSection: PropTypes.object,
  requestLandingPage: PropTypes.func
};

LandingPage.contextTypes = {
  adapter: PropTypes.func
};

export default PropsRerender(ConfiguredRadium(LandingPage));

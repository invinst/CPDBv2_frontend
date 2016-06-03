import React, { Component, PropTypes } from 'react';

import StoriesContainer from 'containers/stories-container';
import FAQContainer from 'containers/faq-container';
import TwitterEmbeddedTimeline from 'components/landing-page/twitter-embedded-timeline';
import AboutSection from 'components/landing-page/about-section';
import HeroSection from 'components/landing-page/hero-section';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import NewsHound from 'components/landing-page/news-hound';
import CollaborateSection from 'components/landing-page/collaborate-section';
import { borderTop, leftColumnStyle } from './landing-page.style';


export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <HeroSection />
        <ResponsiveFixedWidthComponent>
          <StoriesContainer store={ this.props.store }/>
          <div className='pure-g' style={ borderTop }>
            <div className='pure-u-de-3-5 pure-u-ta-1-2 pure-u-mo-1-2'>
              <div style={ leftColumnStyle }>
                <FAQContainer store={ this.props.store }/>
                <NewsHound/>
                <AboutSection/>
              </div>
            </div>
            <div className='pure-u-de-2-5 pure-u-ta-1-2 pure-u-mo-1-2'>
              <TwitterEmbeddedTimeline/>
            </div>
          </div>
        </ResponsiveFixedWidthComponent>
        <CollaborateSection />
      </div>
    );
  }
}

LandingPage.propTypes = {
  store: PropTypes.object
};

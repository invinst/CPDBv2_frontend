import React, { Component, PropTypes } from 'react';

import StoriesContainer from 'containers/stories-container';
import FAQContainer from 'components/faq/faq-container';
import TwitterEmbeddedTimeline from 'components/twitter-embedded-timeline';
import AboutSection from 'components/about-section';
import { borderTop, leftColumnStyle } from './landing-page.style';

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <StoriesContainer store={ this.props.store }/>
        <div className='pure-g' style={ borderTop }>
          <div className='pure-u-de-3-5 pure-u-ta-1-2 pure-u-mo-1-2'>
            <div style={ leftColumnStyle }>
              <FAQContainer/>
              <AboutSection style={ borderTop }/>
            </div>
          </div>
          <div className='pure-u-de-2-5 pure-u-ta-1-2 pure-u-mo-1-2'>
            <TwitterEmbeddedTimeline/>
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  store: PropTypes.object
};

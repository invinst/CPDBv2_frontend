import React, { Component, PropTypes } from 'react';

import StoriesContainer from 'containers/stories-container';
import Header from 'components/header';
import FAQContainer from 'components/faq/faq-container';
import TweetContainer from 'components/tweet-container';
import { borderTop, borderRight } from './landing-page.style';

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div style={ borderTop }>
          <StoriesContainer {...this.props}/>
        </div>
        <div className='pure-g' style={ borderTop }>
          <div className='pure-u-de-3-5 pure-u-ta-1-2 pure-u-mo-1-2' style={ borderRight }>
            <FAQContainer/>
          </div>
          <div className='pure-u-de-2-5 pure-u-ta-1-2 pure-u-mo-1-2'>
            <TweetContainer/>
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  store: PropTypes.object
};

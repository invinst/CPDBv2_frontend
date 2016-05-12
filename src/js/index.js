import React from 'react';
import { render } from 'react-dom';
import TwitterWidgetsLoader from 'twitter-widgets';

import { StyleRoot } from 'radium';
import LandingPage from 'components/landing-page';


TwitterWidgetsLoader.load(function (twttr) {
  global.twttr = twttr;
  render(<StyleRoot><LandingPage/></StyleRoot>, document.getElementById('root'));
});

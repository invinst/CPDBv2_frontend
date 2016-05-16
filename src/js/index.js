import React from 'react';
import { render } from 'react-dom';
import TwitterWidgetsLoader from 'twitter-widgets';

import RootComponent from 'components/root';


TwitterWidgetsLoader.load(function (twttr) {
  global.twttr = twttr;
  render(<RootComponent/>, document.getElementById('root'));
});

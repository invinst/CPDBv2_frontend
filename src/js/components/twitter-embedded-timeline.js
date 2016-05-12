import React from 'react';

import { wrapperStyle } from './twitter-embedded-timeline.style';
import { getTwitterWidgets } from 'utils/vendors';


const widgets = getTwitterWidgets();

export default class TwitterEmbeddedTimeline extends React.Component {
  componentDidMount() {
    widgets.createTimeline(
      '600720083413962752',
      this._wrapper,
      {
        screenName: 'CPDPbot',
        height: '938'
      }
    );
  }

  render() {
    return (
      <div style={ wrapperStyle } ref={ (c) => this._wrapper = c }/>
    );
  }
}

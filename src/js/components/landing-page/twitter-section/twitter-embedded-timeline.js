import React, { PropTypes, Component } from 'react';

import { loadTwitter } from 'utils/vendors';


export default class TwitterEmbeddedTimeline extends Component {
  componentDidMount() {
    loadTwitter(this.updateTimeline.bind(this));
  }

  updateTimeline(twttr) {
    twttr.widgets.createTimeline(
      '600720083413962752',
      this._wrapper,
      {
        screenName: 'CPDPbot',
        height: String(this.props.height),
        showReplies: true
      }
    );
  }

  render() {
    const wrapperStyle = {
      height: `${this.props.height}px`
    };
    return (
      <div style={ wrapperStyle } ref={ (c) => this._wrapper = c }/>
    );
  }
}

TwitterEmbeddedTimeline.propTypes = {
  height: PropTypes.number
};

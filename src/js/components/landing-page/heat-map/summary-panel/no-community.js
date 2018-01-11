import React, { Component } from 'react';

import {
  noCommunityStyle, noCommunityHeaderStyle, boldTextStyle
} from './no-community.style';

export default class NoCommunity extends Component {
  render() {
    return (
      <div style={ noCommunityStyle }>
        <div style={ noCommunityHeaderStyle }>NO COMMUNITY SELECTED</div>
        <div style={ boldTextStyle }>
          Select a community to learn more about police activity.
        </div>
      </div>
    );
  }
}

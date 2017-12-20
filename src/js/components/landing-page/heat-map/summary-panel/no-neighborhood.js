import React, { Component } from 'react';

import {
  noNeighborhoodStyle, noNeighborhoodHeaderStyle, boldTextStyle
} from './no-neighborhood.style';

export default class NoNeighborhood extends Component {
  render() {
    return (
      <div style={ noNeighborhoodStyle }>
        <div style={ noNeighborhoodHeaderStyle }>NO NEIGHBORHOOD SELECTED</div>
        <div style={ boldTextStyle }>
          Select a neighborhood to learn more about police activity.
        </div>
      </div>
    );
  }
}

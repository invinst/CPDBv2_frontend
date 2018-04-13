import React, { Component } from 'react';

import StaticRadarChart from 'components/common/radar-chart';


export default class VisualTokenWidget extends Component {
  render() {
    const data = [
      {
        axis: 'a',
        value: 15,
      },
      {
        axis: 'b',
        value: 50,
      },
      {
        axis: 'c',
        value: 79.8
      }
    ];
    return (
      <div style={ { height: '120px', margin: '0 -8px' } }>
        <StaticRadarChart
          data={ data }
          backgroundColor={ '#ec492c' }
          hideAxisText={ true }
        />
      </div>
    );
  }
}

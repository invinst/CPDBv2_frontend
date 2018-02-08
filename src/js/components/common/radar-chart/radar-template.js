import React from 'react';
import Radar from 'react-d3-radar';

export default class OfficerRadarChart extends React.Component {
  render() {
    const data = {
      variables: [
        { key: 'civil', label: 'Civilian Complaints' },
        { key: 'internal', label: 'Internal Complaints' },
        { key: 'trr', label: 'Use of Force Reports' },
      ],
      sets: [{
        key: 'bounded',
        label: '',
        values: {
          civil: 100,
          internal: 100,
          trr: 100
        }
      }, {
        key: 'UID-1',
        label: 'Jeffery M. Aaron',
        // color: '#005ef4',
        values: {
          civil: 60,
          internal: 40,
          trr: 20
        }
      }]
    };
    const colors = {
      'bounded': 'black',
      'UID-1': 'red'
    };

    return (
      <Radar
        width={ 500 }
        height={ 500 }
        padding={ 70 }
        domainMax={ 100 }
        highlighted={ null }
        onHover={ (point) => {
          if (point) {
            console.log('hovered over a data point');
          } else {
            console.log('not over anything');
          }
        } }
        data={ data }
        colors={ colors }
      />);
  }
}

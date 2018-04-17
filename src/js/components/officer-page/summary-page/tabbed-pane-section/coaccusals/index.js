import React, { Component } from 'react';

import {
  coaccusalsStyle, groupedCoaccusalsStyle, extraCoaccusalCardStyle,
  groupTitleStyle, coaccusedCardsWrapperStyle, groupTitleWrapperStyle
} from './coaccusals.style';
import CoaccusalCard from './coaccusal-card';


const coaccusalsGroups = [
  {
    name: 'COACCUSED 21+ TIMES',
    coaccusals: [
      {
        officerName: 'Donovan Markiewicz',
        allegationCount: 43,
        sustainedCount: 1,
        allegationPercentile: 99.9,
        age: 41,
        race: 'white',
        gender: 'male',
        coaccusalCount: 22,
        thumbnail: '',
      },
      {
        officerName: 'Markiewicz',
        allegationCount: 42,
        sustainedCount: 1,
        allegationPercentile: 99.9,
        age: 41,
        race: 'white',
        gender: 'male',
        coaccusalCount: 22,
        thumbnail: '',
      },
      {
        officerName: 'Donovan Markiewicz',
        allegationCount: 43,
        sustainedCount: 1,
        allegationPercentile: 99.9,
        age: 41,
        race: 'white',
        gender: 'male',
        coaccusalCount: 22,
        thumbnail: '',
      },
    ],
  }
];

export default class Coaccusals extends Component {
  render() {
    return (
      <div style={ coaccusalsStyle }>
        {
          coaccusalsGroups.map((group, index) => (
            <div style={ groupedCoaccusalsStyle } key={ index }>
              <div style={ groupTitleWrapperStyle }>
                <span style={ groupTitleStyle }>{ group.name }</span>
              </div>
              <div style={ coaccusedCardsWrapperStyle(index === coaccusalsGroups.length - 1) }>
                {
                  group.coaccusals.map((coaccusal, index) => (
                    <CoaccusalCard
                      key={ `coaccusal-${index}` }
                      officerName={ coaccusal.officerName }
                      allegationCount={ coaccusal.allegationCount }
                      sustainedCount={ coaccusal.sustainedCount }
                      allegationPercentile={ coaccusal.allegationPercentile }
                      age={ coaccusal.age }
                      race={ coaccusal.race }
                      gender={ coaccusal.gender }
                      coaccusalCount={ coaccusal.coaccusalCount }
                      thumbnail='https://via.placeholder.com/38x38'
                      extraStyle={ extraCoaccusalCardStyle }
                    />
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

Coaccusals.propTypes = {
};

Coaccusals.defaultProps = {
};

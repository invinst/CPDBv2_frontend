import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';

import {
  racePopulationStyle, columnStyle, labelTextStyle, populationCountStyle, medianIncomeStyle,
  raceItemStyle, raceTextStyle, raceCountStyle
} from './community-race-population.style';


export default class CommunityRacePopulation extends Component {
  render() {
    const { population, raceCount, medianIncome } = this.props;

    return (
      <div style={ racePopulationStyle } className='test--community-race-population'>
        <div style={ columnStyle }>
          <div>
            <div style={ labelTextStyle }>Population</div>
            <div style={ populationCountStyle }>{ population }</div>
          </div>
          <div>
            <div style={ labelTextStyle }>Median Household Income</div>
            <div style={ medianIncomeStyle }>{ medianIncome }</div>
          </div>
        </div>
        <div style={ columnStyle }>
          <div style={ labelTextStyle }>Race</div>
          {
            map(raceCount, race => (
              <div key={ race.race } style={ raceItemStyle }>
                <span style={ raceTextStyle }>{ race.race }</span>
                <span style={ raceCountStyle }>{ race.count }</span>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

CommunityRacePopulation.propTypes = {
  population: PropTypes.string,
  raceCount: PropTypes.array,
  medianIncome: PropTypes.string
};

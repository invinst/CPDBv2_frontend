import React, { Component, PropTypes } from 'react';

import {
  coaccusalsStyle, groupedCoaccusalsStyle, extraCoaccusalCardStyle,
  groupTitleStyle, coaccusedCardsWrapperStyle, groupTitleWrapperStyle
} from './coaccusals.style';
import CoaccusalCard from './coaccusal-card';


export default class Coaccusals extends Component {

  render() {
    const { coaccusalGroups, openOfficerPage } = this.props;

    return (
      <div style={ coaccusalsStyle } className='test--officer-coaccusals'>
        {
          coaccusalGroups.map((group, index) => (
            <div style={ groupedCoaccusalsStyle } key={ group.name }>
              <div style={ groupTitleWrapperStyle }>
                <span style={ groupTitleStyle } className='test--coaccusals-group-name'>{ group.name }</span>
              </div>
              <div style={ coaccusedCardsWrapperStyle(index === coaccusalGroups.length - 1) }>
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
                      openOfficerPage={ openOfficerPage }
                      officerId={ coaccusal.officerId }
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
  coaccusalGroups: PropTypes.array,
  openOfficerPage: PropTypes.func,
};

import React, { Component, PropTypes } from 'react';

import {
  coaccusalsStyle, groupedCoaccusalsStyle, extraCoaccusalCardStyle,
  groupTitleStyle, coaccusedCardsWrapperStyle, groupTitleWrapperStyle
} from './coaccusals.style';
import CoaccusalCard from './coaccusal-card';


export default class Coaccusals extends Component {

  render() {
    const { coaccusalsGroups } = this.props;

    return (
      <div style={ coaccusalsStyle }>
        {
          coaccusalsGroups.map((group, index) => (
            <div style={ groupedCoaccusalsStyle } key={ group.name }>
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
  coaccusalsGroups: PropTypes.array,
};

Coaccusals.defaultProps = {
};

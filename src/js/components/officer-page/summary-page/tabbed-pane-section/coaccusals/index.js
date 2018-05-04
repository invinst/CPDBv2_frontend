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
          coaccusalGroups.map((group, groupIndex) => (
            <div style={ groupedCoaccusalsStyle } key={ group.name }>
              <div style={ groupTitleWrapperStyle }>
                <span style={ groupTitleStyle } className='test--coaccusals-group-name'>{ group.name }</span>
              </div>
              <div style={ coaccusedCardsWrapperStyle(groupIndex === coaccusalGroups.length - 1) }>
                {
                  group.coaccusals.map((coaccusal, cardIndex) => (
                    <CoaccusalCard
                      key={ `coaccusal-${cardIndex}` }
                      thumbnail='https://via.placeholder.com/38x38'
                      extraStyle={ extraCoaccusalCardStyle }
                      openOfficerPage={ openOfficerPage }
                      { ...coaccusal }
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

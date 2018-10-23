import React, { Component, PropTypes } from 'react';

import {
  coaccusalsStyle,
  groupedCoaccusalsStyle,
  groupTitleStyle,
  coaccusedCardsWrapperStyle,
  groupTitleWrapperStyle,
  officerCardStyle,
} from './coaccusals.style';
import OfficerCard from 'components/common/officer-card';
import OfficerCardFooter from './officer-card-footer';


export default class Coaccusals extends Component {

  render() {
    const { coaccusalGroups } = this.props;

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
                    <OfficerCard
                      { ...coaccusal }
                      key={ cardIndex }
                      style={ officerCardStyle }
                      footer={ <OfficerCardFooter coaccusalCount={ coaccusal.coaccusalCount } /> }/>
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

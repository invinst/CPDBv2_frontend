import React, { Component, PropTypes } from 'react';

import WidgetWrapper, {
  HeaderWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
  ViewWidget,
} from './widgets';


export default class CommunityPane extends Component {
  render() {
    const {
      name,
      allegationCount,
      mostCommonComplaint,
      officersMostComplaint,
      population,
      raceCount,
      medianIncome
    } = this.props;

    return (
      <WidgetWrapper>
        <HeaderWidget title={ name }/>
        <GeoInfoWidget
          medianIncome={ medianIncome }
          population={ population }
          raceCount={ raceCount }
        />
        <AllegationCountWidget
          numOfAllegations={ allegationCount }
        />
        <ListWidget
          typeName={ 'allegation' }
          showAvatar={ false }
          title='MOST COMMON COMPLAINT'
          items={ mostCommonComplaint }
        />
        <ListWidget
          typeName={ 'allegation' }
          title='OFFICERS WITH MOST COMPLAINTS'
          items={ officersMostComplaint }/>
        <ViewWidget/>
      </WidgetWrapper>
    );
  }
}

CommunityPane.propTypes = {
  name: PropTypes.string.isRequired,
  allegationCount: PropTypes.number.isRequired,
  mostCommonComplaint: PropTypes.array.isRequired,
  officersMostComplaint: PropTypes.array.isRequired,
  population: PropTypes.string.isRequired,
  raceCount: PropTypes.array.isRequired,
  medianIncome: PropTypes.string.isRequired,
};

import React, { Component, PropTypes } from 'react';

import WidgetWrapper, {
  HeaderWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
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
      medianIncome,
      url,
    } = this.props;

    return (
      <WidgetWrapper callToAction={ { url } } maxHeight={ 890 }>
        <HeaderWidget title={ name }/>
        <GeoInfoWidget
          medianIncome={ medianIncome }
          population={ population }
          raceCount={ raceCount }
        />
        <AllegationCountWidget
          numOfAllegations={ allegationCount }
          url={ url }
        />
        <ListWidget
          typeName={ 'allegation' }
          showAvatar={ false }
          title='MOST COMMON COMPLAINTS'
          items={ mostCommonComplaint }
        />
        <ListWidget
          typeName={ 'allegation' }
          title='OFFICERS WITH MOST COMPLAINTS'
          items={ officersMostComplaint }/>
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
  url: PropTypes.string.isRequired,
};

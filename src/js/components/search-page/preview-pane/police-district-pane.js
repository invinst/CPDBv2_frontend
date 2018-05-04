import React, { Component, PropTypes } from 'react';

import WidgetWrapper, {
  HeaderWidget,
  SeparatorWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
  CallToActionWidget,
} from './widgets';


export default class PoliceDistrictPane extends Component {
  render() {
    const {
      name,
      raceCount,
      population,
      allegationCount,
      officersMostComplaint,
      districtCommander,
      url,
    } = this.props;
    const match = /\d+/g.exec(name);
    const district = match ? `#${match[0]}` : name;

    return (
      <WidgetWrapper>
        <HeaderWidget title={ `POLICE DISTRICT ${district}` }/>
        <SeparatorWidget/>
        <GeoInfoWidget raceCount={ raceCount } population={ population }/>
        <AllegationCountWidget
          numOfAllegations={ allegationCount }
          subTitle={ 'More than ##% of other districts' }
        />
        <ListWidget
          typeName={ 'allegation' }
          title='MOST COMMON COMPLAINT'
          items={ officersMostComplaint }
        />
        <ListWidget
          typeName={ 'allegation' }
          title='DISTRICT COMMANDER'
          items={ districtCommander }/>
        <CallToActionWidget url={ url }/>
      </WidgetWrapper>
    );
  }
}

PoliceDistrictPane.propTypes = {
  name: PropTypes.string,
  population: PropTypes.string,
  raceCount: PropTypes.array,
  allegationCount: PropTypes.number,
  officersMostComplaint: PropTypes.array,
  districtCommander: PropTypes.array,
  url: PropTypes.string,
};

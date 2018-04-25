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
        <SeparatorWidget />
        <GeoInfoWidget raceCount={ raceCount } />
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
  name: PropTypes.string.isRequired,
  raceCount: PropTypes.array.isRequired,
  allegationCount: PropTypes.number.isRequired,
  officersMostComplaint: PropTypes.array.isRequired,
  districtCommander: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
};

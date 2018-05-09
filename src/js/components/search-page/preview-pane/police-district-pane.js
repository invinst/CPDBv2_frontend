import React, { Component, PropTypes } from 'react';

import WidgetWrapper, {
  HeaderWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
  CallToActionWidget,
} from './widgets';
import roundPercentile from 'utils/round-percentile';


export default class PoliceDistrictPane extends Component {
  render() {
    const {
      name,
      raceCount,
      population,
      allegationCount,
      officersMostComplaint,
      districtCommander,
      allegationPercentile,
      url,
    } = this.props;
    const match = /\d+/g.exec(name);
    const district = match ? `#${match[0]}` : name.toUpperCase();

    return (
      <WidgetWrapper>
        <HeaderWidget title={ `POLICE DISTRICT ${district}` }/>
        <GeoInfoWidget raceCount={ raceCount } population={ population }/>
        <AllegationCountWidget
          numOfAllegations={ allegationCount }
          subTitle={ `More than ${ roundPercentile(allegationPercentile) }% of other districts` }
          url={ url }
        />
        <ListWidget
          typeName={ 'allegation' }
          title='OFFICERS WITH MOST COMPLAINTS'
          items={ officersMostComplaint }
        />
        <ListWidget
          typeName={ 'allegation' }
          title='DISTRICT COMMANDER'
          items={ districtCommander ? [districtCommander] : [] }/>
        <CallToActionWidget url={ url }/>
      </WidgetWrapper>
    );
  }
}

PoliceDistrictPane.propTypes = {
  name: PropTypes.string,
  population: PropTypes.string,
  raceCount: PropTypes.array,
  allegationPercentile: PropTypes.number,
  allegationCount: PropTypes.number,
  officersMostComplaint: PropTypes.array,
  districtCommander: PropTypes.object,
  url: PropTypes.string,
};

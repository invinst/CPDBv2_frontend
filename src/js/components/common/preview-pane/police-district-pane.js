import React, { Component, PropTypes } from 'react';

import WidgetWrapper, {
  HeaderWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
} from './widgets';
import { roundedPercentile } from 'utils/calculations';


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
      <WidgetWrapper callToAction={ { url } } maxHeight={ 830 }>
        <HeaderWidget title={ `POLICE DISTRICT ${district}` }/>
        <GeoInfoWidget raceCount={ raceCount } population={ population }/>
        <AllegationCountWidget
          numOfAllegations={ allegationCount }
          subTitle={ `More than ${ roundedPercentile(allegationPercentile) }% of other districts` }
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

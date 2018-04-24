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
      to,
    } = this.props;

    return (
      <WidgetWrapper>
        <HeaderWidget title={ name }/>
        <SeparatorWidget />
        <GeoInfoWidget { ...raceCount }/>
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
        <CallToActionWidget to={ to }/>
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
  to: PropTypes.string.isRequired,
};

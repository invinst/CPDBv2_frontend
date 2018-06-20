import React, { Component } from 'react';

import WidgetWrapper, {
  HeaderWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
  CallToActionWidget,
} from './widgets';


export default class CensusTrackPane extends Component {
  render() {
    const complaintCategories = [
      {
        'id': 1,
        'name': 'Inadequate / Failure to Provide Service',
        'count': 90,
      },
      {
        'id': 2,
        'name': 'Search of Premise without Warrant',
        'count': 90,
      },
      {
        'id': 3,
        'name': 'Excessive Force / On Duty - Injury',
        'count': 90,
      },
    ];
    const geoInfo = {
      population: '9,863',
      raceCount: [
        {
          race: 'White',
          count: '46.8%'
        },
        {
          race: 'Black',
          count: '46.8%'
        },
        {
          race: 'Asian',
          count: '46.8%'
        },
        {
          race: 'Hispanic',
          count: '46.8%'
        },
        {
          race: 'Others',
          count: '46.8%'
        },
      ],
      medianIncome: '$60,400',
    };
    return (
      <WidgetWrapper>
        <HeaderWidget title={ 'POLICE BEAT #269' } showBottomBorder={ true }/>
        <GeoInfoWidget { ...geoInfo } />
        <AllegationCountWidget numOfAllegations={ 465 }/>
        <ListWidget
          items={ complaintCategories }
          typeName={ 'allegation' }
          showAvatar={ false }
          title={ 'MOST COMMON COMPLAINTS' }
        />
        <CallToActionWidget/>
      </WidgetWrapper>
    );
  }
}

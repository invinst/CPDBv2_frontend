import React, { Component } from 'react';

import WidgetWrapper, {
  HeaderWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
  ViewWidget,
} from './widgets';


export default class PoliceDistrictPane extends Component {
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
    const officers = [
      {
        'id': 1,
        'name': 'Jerome Finigan',
        'image': 'http://via.placeholder.com/32x32',
        'count': 90,
      },
      {
        'id': 2,
        'name': 'Raymond Pinnicki',
        'image': 'http://via.placeholder.com/32x32',
        'count': 90,
      },
      {
        'id': 3,
        'name': 'Sean Campbell',
        'image': 'http://via.placeholder.com/32x32',
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
        <HeaderWidget title={ 'COMMUNITY NAME' }/>
        <GeoInfoWidget { ...geoInfo }/>
        <AllegationCountWidget
          numOfAllegations={ 465 }
          subTitle={ 'More than ##% of other districts' }
        />
        <ListWidget
          typeName={ 'allegation' }
          showAvatar={ false }
          title='MOST COMMON COMPLAINT'
          items={ complaintCategories }
        />
        <ListWidget
          typeName={ 'allegation' }
          title='OFFICERS WITH MOST COMPLAINTS'
          items={ officers }/>
        <ViewWidget/>
      </WidgetWrapper>
    );
  }
}



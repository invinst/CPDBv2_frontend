import React, { Component } from 'react';

import WidgetWrapper, {
  HeaderWidget,
  TextWidget,
  AllegationCountWidget,
  ListWidget,
  CallToActionWidget,
} from './widgets';


export default class WardPane extends Component {
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

    return (
      <WidgetWrapper>
        <HeaderWidget title={ 'COMMUNITY NAME' }/>
        <AllegationCountWidget numOfAllegations={ 465 }/>
        <TextWidget title={ 'CURRENT ALDERMAN' } content={ 'Firstname Lastname' }/>
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
        <CallToActionWidget/>
      </WidgetWrapper>
    );
  }
}



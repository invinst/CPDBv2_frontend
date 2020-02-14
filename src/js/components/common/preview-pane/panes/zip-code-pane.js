import React from 'react';

import WidgetWrapper, {
  HeaderWidget,
  AllegationCountWidget,
  ListWidget,
} from '../widgets';


export default function ZipCodePane(props) {
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

  const officersWithDocuments = [
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
      <ListWidget
        typeName={ 'allegation' }
        showAvatar={ false }
        title='MOST COMMON COMPLAINTS'
        items={ complaintCategories }
      />
      <ListWidget
        typeName={ 'allegation' }
        title='OFFICERS WITH MOST COMPLAINTS'
        items={ officers }/>
      <ListWidget
        typeName={ 'document' }
        title='OFFICERS WITH MOST COMPLAINTS'
        items={ officersWithDocuments }/>
    </WidgetWrapper>
  );
}


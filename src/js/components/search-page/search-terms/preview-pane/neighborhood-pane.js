import React, { Component } from 'react';

import WidgetWrapper, {
  HeaderWidget,
  AllegationCountWidget,
  ListWidget,
  ViewWidget,
  SeparatorWidget,
} from './widgets';


export default class PoliceBeatPane extends Component {
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
    return (
      <WidgetWrapper>
        <HeaderWidget title={ 'POLICE BEAT #269' } showBottomBorder={ true }/>
        <SeparatorWidget/>
        <AllegationCountWidget numOfAllegations={ 465 } subTitle={ 'within XX meters of the school' }/>
        <ListWidget
          items={ complaintCategories }
          typeName={ 'allegation' }
          showAvatar={ false }
          title={ 'MOST COMMON COMPLAINT' }
        />
        <ViewWidget/>
      </WidgetWrapper>
    );
  }
}

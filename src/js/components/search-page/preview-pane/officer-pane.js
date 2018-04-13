import React, { Component } from 'react';
import moment from 'moment';

import WidgetWrapper, {
  VisualTokenWidget,
  OfficerInfoWidget,
  MetricWidget,
  CallToActionWidget,
} from './widgets';


export default class OfficerPane extends Component {
  render() {
    const officerInfo = {
      fullName: 'Timothy Parker',
      birthYear: 1981,
      appointedDate: moment('2017-01-02'),
    };
    const metrics = [
      {
        name: 'Allegations',
        value: 1,
        description: 'More than ##% of other officers',
      },
      {
        name: 'Allegations',
        value: 1,
        isHighlight: true,
        description: 'More than ##% of other officers',
      },
      {
        name: 'Allegations',
        value: 1,
        description: 'More than ##% of other officers',
      },
      {
        name: 'Allegations',
        value: 1,
        description: 'More than ##% of other officers',
      },
      {
        name: 'Allegations',
        value: 1,
        description: 'More than ##% of other officers',
      },
    ];
    return (
      <WidgetWrapper>
        <VisualTokenWidget/>
        <OfficerInfoWidget { ...officerInfo }/>
        <MetricWidget metrics={ metrics }/>
        <CallToActionWidget url='/officer/30215'/>
      </WidgetWrapper>
    );
  }
}

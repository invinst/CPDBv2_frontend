import React, { PropTypes, Component } from 'react';
import moment from 'moment';

import CirclesSVG from './circles-svg';
import DateTextSVG from './date-text-svg';
import EventTextSVG from './event-text-svg';


export default class SVGComponent extends Component {
  render() {
    const { incidentDate } = this.props;
    return (
      <svg x='0px' y='0px' viewBox='0 0 320 186'>
        <CirclesSVG cy1='9' cy2='9' cy3='9'/>
        <g>
          { incidentDate
            ? [
              <DateTextSVG key='1' y='14'>{ moment(incidentDate).format('ll') }</DateTextSVG>,
              <EventTextSVG key='2' y='30'>Incident Occurs</EventTextSVG>,
              <EventTextSVG key='3' y='46'>Investigation Begins</EventTextSVG>,
              <EventTextSVG key='4' y='62'>Investigation Closed</EventTextSVG>
            ]
            : [
              <EventTextSVG key='2' y='14'>Incident Occurs</EventTextSVG>,
              <EventTextSVG key='3' y='30'>Investigation Begins</EventTextSVG>,
              <EventTextSVG key='4' y='46'>Investigation Closed</EventTextSVG>
            ]
          }
        </g>
      </svg>
    );
  }
}

SVGComponent.propTypes = {
  incidentDate: PropTypes.string
};

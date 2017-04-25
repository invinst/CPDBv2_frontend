import React, { PropTypes, Component } from 'react';
import moment from 'moment';

import CirclesSVG from './circles-svg';
import DateTextSVG from './date-text-svg';
import EventTextSVG from './event-text-svg';


export default class SVGComponent extends Component {
  render() {
    const { startDate, endDate, incidentDate } = this.props;
    return (
      <svg x='0px' y='0px' viewBox='0 0 320 186'>
        <CirclesSVG cy1='9' cy2='84' cy3='159'/>
        <g>
          { incidentDate
            ? [
              <DateTextSVG key='1' y='14'>{ moment(incidentDate).format('ll') }</DateTextSVG>,
              <EventTextSVG key='2' y='30'>Incident Occurs</EventTextSVG>
            ]
            : <EventTextSVG y='14'>Incident Occurs</EventTextSVG>
          }

          { startDate
            ? [
              <DateTextSVG key='1' y='89'>{ moment(startDate).format('ll') }</DateTextSVG>,
              <EventTextSVG key='2' y='105'>Investigation Begins</EventTextSVG>
            ]
            : <EventTextSVG y='89'>Investigation Begins</EventTextSVG>
          }

          { endDate
            ? [
              <DateTextSVG key='1' y='164'>{ moment(endDate).format('ll') }</DateTextSVG>,
              <EventTextSVG key='2' y='180'>Investigation Closed</EventTextSVG>
            ]
            : <EventTextSVG y='164'>Investigation Closed</EventTextSVG>
          }
        </g>
      </svg>
    );
  }
}

SVGComponent.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  incidentDate: PropTypes.string
};

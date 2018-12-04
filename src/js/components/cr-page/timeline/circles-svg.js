import React, { PropTypes, Component } from 'react';
import { uniq } from 'lodash';

import { whiteTwoColor, greyishColor } from 'utils/styles';


export default class CirclesSVG extends Component {
  render() {
    const { startDate, endDate, incidentDate } = this.props;
    const dates = uniq([incidentDate, startDate, endDate]);
    const ind1 = dates.indexOf(incidentDate);
    const ind2 = dates.indexOf(startDate);
    const ind3 = dates.indexOf(endDate);
    const circleRadius = '5.5';
    const smallCircleRadius = '2.5';
    const startX = '6';
    const ySlots = ['8', '68', '128'];
    const height = Math.max(15, (dates.length - 1) * 80);
    return (
      <svg width='12' x='0px' y='0px' viewBox={ `0 0 12 ${height}` } className='no-print'>
        <g>
          <line
            x1={ startX }
            y1={ circleRadius }
            x2={ startX }
            y2={ ySlots[ind3] }
            stroke={ whiteTwoColor }
            strokeWidth='1' />
          <circle
            r={ circleRadius }
            cx={ startX }
            strokeWidth='1'
            stroke={ greyishColor }
            fill='white'
            cy={ ySlots[ind1] }/>
          <circle
            r={ smallCircleRadius }
            cx={ startX }
            fill={ greyishColor }
            cy={ ySlots[ind2] }/>
          <circle
            r={ circleRadius }
            cx={ startX }
            fill={ greyishColor }
            cy={ ySlots[ind3] }/>
        </g>
      </svg>
    );
  }
}

CirclesSVG.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  incidentDate: PropTypes.string
};

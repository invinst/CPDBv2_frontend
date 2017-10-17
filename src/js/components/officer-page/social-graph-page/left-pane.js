import React, { PropTypes, Component } from 'react';

import Legend from './legend';
import {
  titleStyle, totalStyle, textStyle, numberStyle, wrapperStyle
} from './left-pane.style';


export default class LeftPane extends Component {
  render() {
    const { legend, numOfficers } = this.props;
    return (
      <div style={ wrapperStyle }>
        <div style={ titleStyle }>TOTALS</div>
        <Legend { ...legend }/>
        <div style={ totalStyle }>
          <span style={ textStyle }>Officers</span>
          <span
            style={ numberStyle }
            className='test--social-graph-left-pane-num-officers'
          >
            { numOfficers }
          </span>
        </div>
      </div>
    );
  }
}

LeftPane.propTypes = {
  legend: PropTypes.object,
  numOfficers: PropTypes.number,
  crs: PropTypes.number
};

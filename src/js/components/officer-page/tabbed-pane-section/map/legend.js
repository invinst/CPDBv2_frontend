import React, { Component, PropTypes } from 'react';

import {
  contentStyle,
  titleStyle,
  legendCountStyle,
  unsustainedOvalStyle,
  legendTextStyle,
  wrapperStyle,
  sustainedOvalStyle,
  useOfForceOvalStyle,
  rowStyle
} from './legend.style';


export default class Legend extends Component {

  render() {
    const { legend } = this.props;
    return (
      <div style={ wrapperStyle }>
        <div style={ titleStyle }>
          LEGEND
        </div>
        <div style={ contentStyle }>
          <div style={ rowStyle }>
            <div style={ unsustainedOvalStyle } />
            <span style={ legendTextStyle }>
              Unsustained Complaint
            </span>
            <span style={ legendCountStyle }>
              { legend.allegationCount - legend.sustainedCount }
            </span>
          </div>
          <div style={ rowStyle }>
            <div style={ sustainedOvalStyle } />
            <span style={ legendTextStyle }>
              Sustained Allegation
            </span>
            <span style={ legendCountStyle }>
              { legend.sustainedCount }
            </span>
          </div>
          <div>
            <div style={ useOfForceOvalStyle } />
            <span style={ legendTextStyle }>
              Use of Force Report
            </span>
            <span style={ legendCountStyle }>
              { legend.useOfForceCount }
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Legend.propTypes = {
  legend: PropTypes.shape({
    allegationCount: PropTypes.number,
    sustainedCount: PropTypes.number,
    useOfForceCount: PropTypes.number
  }),
};

Legend.defaultProps = {
  legend: {
    allegationCount: 0,
    sustainedCount: 0,
    useOfForceCount: 0
  },
};

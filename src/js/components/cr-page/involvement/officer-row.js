import React, { Component, PropTypes } from 'react';

import StaticRadarChart from 'components/common/radar-chart';
import {
  wrapperStyle, chartWrapperStyle, officerNameStyle, extraInfoStyle, rightWrapperStyle, tagStyle, tagWrapperStyle
} from './officer-row.style';


class OfficerRow extends Component {
  render() {
    const { id, fullName, extraInfo, onClick, style, radarAxes, radarColor, tag } = this.props;

    return (
      <div className='test--officer-row' style={ { ...wrapperStyle, ...style } } onClick={ () => onClick(id) }>
        <div style={ chartWrapperStyle }>
          <StaticRadarChart
            width={ 32 }
            height={ 32 }
            radius={ 15 }
            hideAxisText={ true }
            data={ radarAxes }
            { ...radarColor }/>
        </div>
        <div style={ rightWrapperStyle }>
          <div style={ officerNameStyle }>{ fullName }</div>
          <div style={ extraInfoStyle }>{ extraInfo }</div>
        </div>
        <div style={ tagWrapperStyle }>
          {
            tag ? (
              <span style={ tagStyle }>{ tag }</span>
            ) : null
          }
        </div>
      </div>
    );
  }
}

OfficerRow.propTypes = {
  id: PropTypes.number,
  fullName: PropTypes.string,
  extraInfo: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  radarColor: PropTypes.object,
  radarAxes: PropTypes.array,
  tag: PropTypes.string
};

export default OfficerRow;

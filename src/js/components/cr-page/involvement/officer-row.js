import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import StaticRadarChart from 'components/common/radar-chart';
import {
  wrapperStyle, chartWrapperStyle, officerNameStyle, extraInfoStyle, rightWrapperStyle, tagStyle, tagWrapperStyle
} from './officer-row.style';


class OfficerRow extends Component {
  render() {
    const { id, fullName, extraInfo, style, radarAxes, radarColor, tag } = this.props;

    return (
      <Link
        className='test--officer-row'
        style={ { ...wrapperStyle, ...style } }
        to={ id ? `/officer/${id}/` : null }>
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
      </Link>
    );
  }
}

OfficerRow.propTypes = {
  id: PropTypes.number,
  fullName: PropTypes.string,
  extraInfo: PropTypes.string,
  style: PropTypes.object,
  radarColor: PropTypes.object,
  radarAxes: PropTypes.array,
  tag: PropTypes.string
};

export default OfficerRow;

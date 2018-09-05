import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { kebabCase } from 'lodash';

import NavigationButton from './navigation-button';
import StaticRadarChart from 'components/common/radar-chart';
import {
  officerRowStyle,
  officerNameStyle,
  visualTokenStyle,
  rankStyle,
} from './officer-row.style';
import Hoverable from 'components/common/higher-order/hoverable';


class OfficerRow extends Component {
  render() {
    const { percentile, fullName, officerId, hovering } = this.props;
    const officerSlug = kebabCase(fullName);

    const visualTokenConfig = percentile ? {
      backgroundColor: percentile.visualTokenBackground,
      data: percentile.items,
    } : {};

    return (
      <Link
        className='test--trr-officer-row'
        style={ officerRowStyle }
        to={ `/officer/${officerId}/${officerSlug}/` }
      >
        <div style={ visualTokenStyle }>
          <StaticRadarChart { ...visualTokenConfig }/>
        </div>
        <div style={ officerNameStyle(hovering) }>
          <div style={ rankStyle }>Officer</div>
          <div className='test--officer-full-name'>{ fullName }</div>
        </div>
        <NavigationButton
          text='View Profile'
          hovering={ hovering }
        />
      </Link>
    );
  }
}

OfficerRow.propTypes = {
  percentile: PropTypes.object,
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  hovering: PropTypes.bool,
  officerSlug: PropTypes.string,
};

export default Hoverable(OfficerRow);

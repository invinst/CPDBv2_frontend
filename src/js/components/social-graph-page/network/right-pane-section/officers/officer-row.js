import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';
import { isEqual } from 'lodash';

import StaticRadarChart from 'components/common/radar-chart';
import styles from './officer-row.sass';


export default class OfficerRow extends Component {
  shouldComponentUpdate(nextProps) {
    const { officer } = this.props;
    return !isEqual(officer, nextProps.officer);
  }

  handleClick = () => {
    const { officer, updateSelectedOfficerId } = this.props;
    updateSelectedOfficerId(officer.id);
  };

  render() {
    const { officer } = this.props;

    const percentile = officer && officer.percentile;
    const chartData = percentile && percentile.items;

    const radarConfig = {
      width: 30,
      height: 30,
      radius: 16,
      backgroundColor: percentile ? percentile.visualTokenBackground : undefined,
    };

    return (
      <div className={ cx(styles.officerRow, 'officer-preview-link') } onClick={ this.handleClick }>
        <div className='radar-chart-wrapper'>
          <StaticRadarChart data={ chartData } { ...radarConfig } />
        </div>
        <div className='officer-name'>{ officer.fullName }</div>
        <div className='clearfix' />
      </div>
    );
  }
}

OfficerRow.propTypes = {
  officer: PropTypes.object,
  updateSelectedOfficerId: PropTypes.func,
};

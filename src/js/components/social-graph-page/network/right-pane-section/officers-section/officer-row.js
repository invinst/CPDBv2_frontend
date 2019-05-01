import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import StaticRadarChart from 'components/common/radar-chart';
import styles from './officer-row.sass';


export default class OfficerRow extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { officer, updateOfficerId } = this.props;
    updateOfficerId(officer.id);
  }

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
  updateOfficerId: PropTypes.func,
};

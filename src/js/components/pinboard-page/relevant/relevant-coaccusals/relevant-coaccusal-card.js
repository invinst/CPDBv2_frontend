import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';
import { kebabCase } from 'lodash';

import StaticRadarChart from 'components/common/radar-chart';
import styles from './relevant-coaccusal-card.sass';


export class RelevantCoaccusalCard extends Component {
  render() {
    const {
      id,
      fullName,
      percentile,
      rank,
      coaccusalCount,
    } = this.props;
    const officerSlug = kebabCase(fullName);
    const chartData = percentile && percentile.items;

    const radarConfig = {
      width: 148,
      height: 60,
      radius: 24,
      backgroundColor: percentile ? percentile.visualTokenBackground : undefined,
    };

    return (
      <Link
        to={ `/officer/${id}/${officerSlug}/` }
        className={ styles.relevantCoaccusalCard }
      >
        <div className='no-print radar-chart-wrapper'>
          <StaticRadarChart data={ chartData } { ...radarConfig } />
        </div>
        <div className='officer-card-section'>
          <p className='light-text officer-card-rank'>{ rank }</p>
          <p className='bold-text officer-card-name'>{ fullName }</p>
        </div>
        <div className='coaccusal-count'>{ pluralize('coaccusal', coaccusalCount, true) }</div>
      </Link>
    );
  }
}

RelevantCoaccusalCard.propTypes = {
  id: PropTypes.number,
  fullName: PropTypes.string,
  percentile: PropTypes.object,
  rank: PropTypes.string,
  coaccusalCount: PropTypes.number,
};

export default RelevantCoaccusalCard;

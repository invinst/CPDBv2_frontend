import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';
import { kebabCase } from 'lodash';
import cx from 'classnames';

import { getThisYear } from 'utils/date';
import StaticRadarChart from 'components/common/radar-chart';
import { roundedPercentile } from 'utils/calculations';
import styles from './officer-card.sass';


export class OfficerCard extends Component {
  render() {
    const {
      officerId,
      fullName,
      complaintCount,
      sustainedCount,
      birthYear,
      complaintPercentile,
      race,
      gender,
      style,
      percentile,
      openCardInNewPage,
      rank,
      footer,
      className,
    } = this.props;
    const officerSlug = kebabCase(fullName);

    const complaintString = () => {
      const complaint = `${complaintCount} ${pluralize('Allegation', complaintCount)}`;
      const sustained = `${sustainedCount} Sustained`;
      return (
        <span className='test--officer-card-metric'>
          <span className='officer-card-allegation'>{ complaint }</span>&nbsp;
          <span className='officer-card-sustained'>{ sustained }</span>
        </span>
      );
    };

    const ageString = () => {
      if (!birthYear) {
        return '';
      }
      const age = getThisYear() - birthYear - 1;
      return `${age}-year-old`;
    };

    const extraInfo = () => {
      return `${ageString()} ${race} ${gender}`;
    };

    const complaintPercentileString = () => {
      if (complaintPercentile) {
        const complaintFormat = roundedPercentile(complaintPercentile);
        return (
          <p className='light-text no-print test--officer-card-percentile'>
            More than { complaintFormat }% of other officers
          </p>
        );
      }
      return '';
    };

    const chartData = percentile && percentile.items;

    const radarConfig = {
      width: 230,
      height: 100,
      radius: 40,
      backgroundColor: percentile ? percentile.visualTokenBackground : undefined,
    };

    return (
      <Link
        to={ `/officer/${officerId}/${officerSlug}/` }
        style={ { ...style } }
        target={ openCardInNewPage ? '_blank' : null }
        className={ cx(styles.officerCard, className) }
      >
        <div className='no-print radar-chart-wrapper'>
          <StaticRadarChart data={ chartData } { ...radarConfig } />
        </div>
        <div>
          <div className='officer-card-info'>
            <div className='officer-card-section'>
              <p className='light-text officer-card-rank'>{ rank }</p>
              <p className='bold-text officer-card-name'>{ fullName }</p>
            </div>
            <div className='officer-card-section'>
              <p className='bold-text'>{ complaintString() }</p>
              { complaintPercentileString() }
            </div>
            <div className='officer-card-section test--officer-card-demographic'>
              <p className='extra-info'>{ extraInfo() }</p>
            </div>
          </div>
        </div>
        { footer }
      </Link>
    );
  }
}

OfficerCard.propTypes = {
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  visualTokenBackgroundColor: PropTypes.string,
  style: PropTypes.object,
  complaintCount: PropTypes.number,
  sustainedCount: PropTypes.number,
  complaintPercentile: PropTypes.number,
  birthYear: PropTypes.number,
  race: PropTypes.string,
  gender: PropTypes.string,
  percentile: PropTypes.object,
  openCardInNewPage: PropTypes.bool,
  rank: PropTypes.string,
  footer: PropTypes.object,
  className: PropTypes.string,
};

OfficerCard.defaultProps = {
  openCardInNewPage: false
};

export default OfficerCard;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pluralize from 'pluralize';
import { kebabCase } from 'lodash';
import cx from 'classnames';

import StaticRadarChart from 'components/common/radar-chart';
import { roundedPercentile } from 'utils/calculations';
import styles from './small-radar-chart-officer-card.sass';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { PINNED_ITEM_TYPES } from 'utils/constants';
import ItemPinButton from 'components/common/item-pin-button';
import { PrintModeContext } from 'contexts';


export default class SmallRadarChartOfficerCard extends Component {
  renderComplaintInfo() {
    const { complaintCount, sustainedCount } = this.props;
    const complaint = pluralize('allegation', complaintCount, true);
    const sustained = `${sustainedCount} sustained`;
    return (
      <span className='test--officer-card-metric'>
        <span className='officer-card-allegation'>{ complaint }</span>&nbsp;
        <span className={ cx('officer-card-sustained', { 'unsustained': sustainedCount === 0 }) }>
          { sustained }
        </span>
      </span>
    );
  }

  renderAllegationPercentile() {
    const { allegationPercentile } = this.props;
    if (allegationPercentile) {
      const complaintFormat = roundedPercentile(allegationPercentile);
      return (
        <p className='light-text no-print test--officer-card-percentile'>
          More than { complaintFormat }% of other officers
        </p>
      );
    }
    return null;
  }

  render() {
    const {
      officerId,
      fullName,
      style,
      percentile,
      openCardInNewPage,
      rank,
      className,
      addOrRemoveItemInPinboard,
      isPinned,
      complaintCount,
      sustainedCount,
      age,
      race,
      gender,
      cardFooter,
    } = this.props;
    const officerSlug = kebabCase(fullName);
    const chartData = percentile && percentile.items;

    const radarConfig = {
      width: 30,
      height: 30,
      radius: 16,
      backgroundColor: percentile ? percentile.visualTokenBackground : undefined,
    };

    return (
      <Link
        to={ `/officer/${officerId}/${officerSlug}/` }
        style={ style }
        target={ openCardInNewPage ? '_blank' : null }
        className={ cx(styles.smallRadarChartOfficerCard, className) }
      >
        <ItemPinButton
          className={ pinButtonStyles.cardPinnedButton }
          addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
          showHint={ false }
          item={ {
            type: PINNED_ITEM_TYPES.OFFICER,
            id: officerId,
            isPinned,
            fullName,
            complaintCount,
            sustainedCount,
            age,
            race,
            gender,
            rank,
          } }
        />
        <div className='officer-card-info'>
          <div className='officer-card-header'>
            <div className='no-print radar-chart-wrapper'>
              <StaticRadarChart data={ chartData } { ...radarConfig } />
            </div>
            <div className='officer-card-header-info'>
              <p className='light-text officer-card-rank'>{ rank }</p>
              <p className='bold-text officer-card-name'>{ fullName }</p>
            </div>
            <div className='clearfix'/>
          </div>
          <div className='officer-card-section'>
            <p className='bold-text'>{ this.renderComplaintInfo() }</p>
            { this.renderAllegationPercentile() }
          </div>
          <div className='officer-card-section officer-card-demographic'>
            <p className='extra-info'>{ `${age} ${race} ${gender}` }</p>
          </div>
        </div>
        { cardFooter }
      </Link>
    );
  }
}

SmallRadarChartOfficerCard.contextType = PrintModeContext;

SmallRadarChartOfficerCard.propTypes = {
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  visualTokenBackgroundColor: PropTypes.string,
  style: PropTypes.object,
  complaintCount: PropTypes.number,
  sustainedCount: PropTypes.number,
  allegationPercentile: PropTypes.number,
  age: PropTypes.string,
  race: PropTypes.string,
  gender: PropTypes.string,
  percentile: PropTypes.object,
  openCardInNewPage: PropTypes.bool,
  rank: PropTypes.string,
  className: PropTypes.string,
  addOrRemoveItemInPinboard: PropTypes.func,
  isPinned: PropTypes.bool,
  cardFooter: PropTypes.node,
};

SmallRadarChartOfficerCard.defaultProps = {
  openCardInNewPage: false,
};

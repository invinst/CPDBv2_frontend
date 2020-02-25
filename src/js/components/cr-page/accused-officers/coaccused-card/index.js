import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pluralize from 'pluralize';
import { compact, join, kebabCase } from 'lodash';
import cx from 'classnames';

import StaticRadarChart from 'components/common/radar-chart';
import { roundedPercentile } from 'utils/calculations';
import styles from './coaccused-card.sass';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { PINNED_ITEM_TYPES } from 'utils/constants';
import ItemPinButton from 'components/common/item-pin-button';
import { PrintModeContext } from 'contexts';


export default class CoaccusedCard extends Component {
  renderComplaintInfo() {
    const { complaintCount, sustainedCount } = this.props;
    const complaint = pluralize('allegation', complaintCount, true);
    const sustained = `${sustainedCount} sustained`;
    return (
      <span className='test--officer-card-metric'>
        <span className='coaccused-card-allegation'>{ complaint }</span>&nbsp;
        <span className={ cx('coaccused-card-sustained', { 'unsustained': sustainedCount === 0 }) }>
          { sustained }
        </span>
      </span>
    );
  }

  renderComplaintPercentile() {
    const { complaintPercentile } = this.props;
    if (complaintPercentile) {
      const complaintFormat = roundedPercentile(complaintPercentile);
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
      finding,
      disciplined,
      category,
      findingOutcomeMix,
      addOrRemoveItemInPinboard,
      isPinned,
      complaintCount,
      sustainedCount,
      age,
      race,
      gender,
    } = this.props;
    const officerSlug = kebabCase(fullName);
    const { printMode } = this.context;
    const outcomeDisciplined = printMode && disciplined ? 'Disciplined' : null;
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
        className={ cx(styles.coaccusedCard, className) }
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
        <div className='coaccused-card-info'>
          <div className='coaccused-card-header'>
            <div className='no-print radar-chart-wrapper'>
              <StaticRadarChart data={ chartData } { ...radarConfig } />
            </div>
            <div className='coaccused-card-header-info'>
              <p className='light-text coaccused-card-rank'>{ rank }</p>
              <p className='bold-text coaccused-card-name'>{ fullName }</p>
            </div>
            <div className='clearfix'/>
          </div>
          <div className='coaccused-card-section'>
            <p className='bold-text'>{ this.renderComplaintInfo() }</p>
            { this.renderComplaintPercentile() }
          </div>
          <div className='coaccused-card-section officer-card-demographic'>
            <p className='extra-info'>{ `${age} ${race} ${gender}` }</p>
          </div>
        </div>
        <div className='coaccused-card-footer'>
          <div className='accused-card-category'>{ category }</div>
          <div
            className={
              cx('accused-card-outcome', { 'sustained': finding === 'Sustained', disciplined })
            }
          >
            <div className='finding-outcome-mix'>{ join(compact([findingOutcomeMix, outcomeDisciplined]), ', ') }</div>
          </div>
        </div>
      </Link>
    );
  }
}

CoaccusedCard.contextType = PrintModeContext;

CoaccusedCard.propTypes = {
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  visualTokenBackgroundColor: PropTypes.string,
  style: PropTypes.object,
  complaintCount: PropTypes.number,
  sustainedCount: PropTypes.number,
  complaintPercentile: PropTypes.number,
  age: PropTypes.string,
  race: PropTypes.string,
  gender: PropTypes.string,
  percentile: PropTypes.object,
  openCardInNewPage: PropTypes.bool,
  rank: PropTypes.string,
  className: PropTypes.string,
  finding: PropTypes.string,
  disciplined: PropTypes.bool,
  category: PropTypes.string,
  findingOutcomeMix: PropTypes.string,
  addOrRemoveItemInPinboard: PropTypes.func,
  isPinned: PropTypes.bool,
};

CoaccusedCard.defaultProps = {
  openCardInNewPage: false,
};

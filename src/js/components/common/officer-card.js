import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';
import { kebabCase } from 'lodash';
import cx from 'classnames';

import StaticRadarChart from 'components/common/radar-chart';
import { roundedPercentile } from 'utils/calculations';
import styles from './officer-card.sass';
import ItemPinButton from 'components/common/item-pin-button';
import { PINNED_ITEM_TYPES } from 'utils/constants';
import pinButtonStyles from 'components/common/item-pin-button.sass';


export class OfficerCard extends Component {
  renderComplaintInfo() {
    const { complaintCount, sustainedCount } = this.props;
    const complaint = `${ complaintCount } ${ pluralize('Allegation', complaintCount) }`;
    const sustained = `${ sustainedCount } Sustained`;
    return (
      <span className='test--officer-card-metric'>
        <span className='officer-card-allegation'>{ complaint }</span>&nbsp;
        <span className='officer-card-sustained'>{ sustained }</span>
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
      footer,
      className,
      addOrRemoveItemInPinboard,
      isPinned,
      pinnable,
      complaintCount,
      sustainedCount,
      age,
      race,
      gender,
    } = this.props;
    const officerSlug = kebabCase(fullName);
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
        {
          pinnable && <ItemPinButton
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
        }
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
              <p className='bold-text'>{ this.renderComplaintInfo() }</p>
              { this.renderComplaintPercentile() }
            </div>
            <div className='officer-card-section officer-card-demographic'>
              <p className='extra-info'>{ `${age} ${race} ${gender}` }</p>
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
  age: PropTypes.string,
  race: PropTypes.string,
  gender: PropTypes.string,
  percentile: PropTypes.object,
  openCardInNewPage: PropTypes.bool,
  rank: PropTypes.string,
  footer: PropTypes.object,
  className: PropTypes.string,
  addOrRemoveItemInPinboard: PropTypes.func,
  isPinned: PropTypes.bool,
  pinnable: PropTypes.bool,
};

OfficerCard.defaultProps = {
  openCardInNewPage: false,
  pinnable: true,
};

export default OfficerCard;

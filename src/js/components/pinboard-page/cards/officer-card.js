import React, { PropTypes } from 'react';
import pluralize from 'pluralize';

import StaticRadarChart from 'components/common/radar-chart';
import ItemUnpinButton from './item-unpin-button';
import BaseCard from './base-card';
import styles from './officer-card.sass';


export default class OfficerCard extends BaseCard {
  renderContent() {
    const { item } = this.props;
    const { percentile, complaintCount, fullName, rank } = item;
    const chartData = percentile && percentile.items;

    const radarConfig = {
      width: 148,
      height: 62,
      radius: 28,
      backgroundColor: percentile ? percentile.visualTokenBackground : undefined,
    };

    return (
      <div className={ styles.officerCard }>
        <ItemUnpinButton onClick={ this.removeItem }/>
        <div className='radar-chart-wrapper'>
          <StaticRadarChart data={ chartData } { ...radarConfig } />
        </div>
        <div className='officer-card-body'>
          <div className='officer-info'>
            <div className='officer-rank'>{ rank }</div>
            <div className='officer-name'>{ fullName }</div>
          </div>
          <div className='officer-complaints-count'>
            { `${ complaintCount } ${ pluralize('complaint', complaintCount) }` }
          </div>
        </div>
      </div>
    );
  }
}

OfficerCard.propTypes = {
  item: PropTypes.object,
  removeItemInPinboardPage: PropTypes.func,
  isAdded: PropTypes.bool,
};

OfficerCard.defaultProps = {
  isAdded: false,
  removeItemInPinboardPage: () => {},
};

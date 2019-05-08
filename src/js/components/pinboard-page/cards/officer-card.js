import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';

import StaticRadarChart from 'components/common/radar-chart';
import ItemUnpinButton from './item-unpin-button';
import Removable from './removable';
import styles from './officer-card.sass';


class OfficerCard extends Component {
  render() {
    const { item, removeItem } = this.props;
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
        <ItemUnpinButton onClick={ removeItem }/>
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
  removeItem: PropTypes.func,
};

OfficerCard.defaultProps = {
  removeItem: () => {},
};

export default Removable(OfficerCard);

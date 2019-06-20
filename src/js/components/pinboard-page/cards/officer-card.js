import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';
import { get } from 'lodash';

import StaticRadarChart from 'components/common/radar-chart';
import ItemUnpinButton from './item-unpin-button';
import withUndoCard from './with-undo-card';
import styles from './officer-card.sass';


export default class OfficerCard extends Component {
  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  removeItem() {
    const { item, removeItemInPinboardPage } = this.props;
    const { type, id } = item;

    removeItemInPinboardPage({ type, id });
  }

  render() {
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
};

OfficerCard.defaultProps = {
  removeItemInPinboardPage: () => {},
};


export const OfficerCardWithUndo = withUndoCard(
  OfficerCard,
  props => `${get(props, 'item.fullName', '')} removed.`,
  'removeItemInPinboardPage'
);

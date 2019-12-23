import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';
import { get, noop } from 'lodash';

import StaticRadarChart from 'components/common/radar-chart';
import ShortPress from 'components/common/short-press';
import ItemUnpinButton from './item-unpin-button';
import withUndoCard from './with-undo-card';
import styles from './officer-card.sass';


export default class OfficerCard extends Component {
  componentDidUpdate() {
    const { item } = this.props;

    if (item.isPinStatusChanging) {
      this.removeItem();
    }
  }

  removeItem = () => {
    const { item, removeItemInPinboardPage } = this.props;
    const { type, id } = item;

    removeItemInPinboardPage({ type, id });
  };

  focusItem = () => {
    const { type, id } = this.props.item;
    this.props.focusItem({ type, id });
  };

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
      <div
        className={ styles.officerCard }>
        <ItemUnpinButton onClick={ this.removeItem }/>
        <ShortPress action={ this.focusItem }>
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
        </ShortPress>
      </div>
    );
  }
}

OfficerCard.propTypes = {
  item: PropTypes.object,
  removeItemInPinboardPage: PropTypes.func,
  addItemInPinboardPage: PropTypes.func,
  focusItem: PropTypes.func,
};

OfficerCard.defaultProps = {
  removeItemInPinboardPage: noop,
  addItemInPinboardPage: noop,
  focusItem: noop,
};


export const OfficerCardWithUndo = withUndoCard(
  OfficerCard,
  props => `${get(props, 'item.fullName', '')} removed.`,
  'removeItemInPinboardPage',
  {
    isRequestDelay: false,
    completeActionName: 'completeRemoveItemInPinboardPage',
    revertActionName: 'addItemInPinboardPage',
  }
);

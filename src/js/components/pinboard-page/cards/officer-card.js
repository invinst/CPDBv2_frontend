import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';

import StaticRadarChart from 'components/common/radar-chart';
import ItemUnpinButton from './item-unpin-button';
import styles from './officer-card.sass';
import { startAnimation } from 'utils/animation';


export default class OfficerCard extends Component {
  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    const { isAdded } = this.props;
    if (isAdded) {
      startAnimation(() => this.el.classList.add('fade-in'));
    }
  }

  removeItem() {
    this.el.classList.add('fade-out');
    const { item, removeItemInPinboardPage } = this.props;
    const { type, id, isPinned } = item;

    setTimeout(
      () => removeItemInPinboardPage({ type, id, isPinned }),
      1000
    );
  }

  render() {
    const { item, isAdded } = this.props;
    const { percentile, complaintCount, fullName, rank } = item;
    const chartData = percentile && percentile.items;

    const radarConfig = {
      width: 148,
      height: 62,
      radius: 28,
      backgroundColor: percentile ? percentile.visualTokenBackground : undefined,
    };

    return (
      <div className={ cx(styles.wrapper, { hide: isAdded }) } ref={ el => this.el = el }>
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

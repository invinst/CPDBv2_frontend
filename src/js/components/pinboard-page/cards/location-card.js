import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { get, noop } from 'lodash';

import ShortPress from 'components/common/short-press';
import { mapStyle } from 'components/cr-page/related-complaints/complaint-card.style';
import ItemUnpinButton from './item-unpin-button';
import styles from './location-card.sass';


export default class LocationCard extends Component {
  removeItem = () => {
    const { item, removeItemInPinboardPage } = this.props;
    const { type, id } = item;

    removeItemInPinboardPage({ type, id });
  };

  focusItem = () => {
    const { type, id } = this.props.item;
    this.props.focusItem({ type, id });
  };

  renderContent() {
    const { item, dateKey } = this.props;
    const { point, category } = item;

    const cardMapConfig = {
      lat: get(point, 'lat', null),
      lon: get(point, 'lon', null),
      width: 148,
      height: 88,
    };

    return (
      <div>
        {
          (point === null) ?
            <div className='location-card-map empty-map' />
            :
            <div
              className='location-card-map'
              style={ mapStyle(
                cardMapConfig['lat'],
                cardMapConfig['lon'],
                cardMapConfig['width'],
                cardMapConfig['height']) } />
        }
        <div className='location-card-body'>
          <span className='location-card-date'>{ item[dateKey] }</span>
          <span className='location-card-category'>{ category }</span>
        </div>
      </div>
    );
  }

  render() {
    const { focusable } = this.props;

    return (
      <div className={ styles.locationCard }>
        <ItemUnpinButton onClick={ this.removeItem }/>
        {
          focusable ? (
            <ShortPress action={ this.focusItem }>
              { this.renderContent() }
            </ShortPress>
          ) : this.renderContent()
        }
      </div>
    );
  }
}

LocationCard.propTypes = {
  item: PropTypes.object,
  dateKey: PropTypes.string,
  removeItemInPinboardPage: PropTypes.func,
  focusItem: PropTypes.func,
  focusable: PropTypes.bool,
};

LocationCard.defaultProps = {
  removeItemInPinboardPage: noop,
  focusItem: noop,
  focusable: false,
};

import React, { PropTypes } from 'react';
import { get } from 'lodash';

import { mapStyle } from 'components/cr-page/related-complaints/complaint-card.style';
import ItemUnpinButton from './item-unpin-button';
import BaseCard from './base-card';
import styles from './location-card.sass';


export default class LocationCard extends BaseCard {
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
      <div className={ styles.locationCard }>
        <ItemUnpinButton onClick={ this.removeItem }/>
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
}

LocationCard.propTypes = {
  item: PropTypes.object,
  dateKey: PropTypes.string,
  removeItemInPinboardPage: PropTypes.func,
  isAdded: PropTypes.bool,
};

LocationCard.defaultProps = {
  isAdded: false,
  removeItemInPinboardPage: () => {},
};

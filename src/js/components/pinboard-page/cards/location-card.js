import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import { mapStyle } from 'components/cr-page/related-complaints/complaint-card.style';
import ItemUnpinButton from './item-unpin-button';
import Removable from './removable';
import styles from './location-card.sass';


class LocationCard extends Component {
  render() {
    const { item, dateKey, removeItem } = this.props;
    const { point, category } = item;


    const cardMapConfig = {
      lat: get(point, 'lat', null),
      lon: get(point, 'lon', null),
      width: 148,
      height: 88,
    };

    return (
      <div className={ styles.locationCard }>
        <ItemUnpinButton onClick={ removeItem }/>
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
  removeItem: PropTypes.func,
};

LocationCard.defaultProps = {
  isAdded: false,
  removeItem: () => {},
};

export default Removable(LocationCard);

import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import { mapStyle } from 'components/cr-page/related-complaints/complaint-card.style';
import ItemUnpinButton from '../item-unpin-button';
import styles from './trr-card.sass';

export default class TRRCard extends Component {
  render() {
    const { removeItemInPinboardPage, item } = this.props;
    const { trrDate, point, category } = item;

    const cardMapConfig = {
      lat: get(point, 'lat', null),
      lon: get(point, 'lon', null),
      width: 148,
      height: 88,
    };

    return (
      <div className={ styles.wrapper }>
        <ItemUnpinButton
          item={ item }
          removeItemInPinboardPage={ removeItemInPinboardPage } />
        {
        (point === null) ?
          <div className='trr-card-map' />
          :
          <div
            className='trr-card-map'
            style={ mapStyle(
              cardMapConfig['lat'],
              cardMapConfig['lon'],
              cardMapConfig['width'],
              cardMapConfig['height']) } />
        }
        <div className='trr-card-body'>
          <span className='trr-date'>{ trrDate }</span>
          <span className='trr-category'>{ category }</span>
        </div>
      </div>
    );
  }
}

TRRCard.propTypes = {
  item: PropTypes.object,
  removeItemInPinboardPage: PropTypes.func,
};

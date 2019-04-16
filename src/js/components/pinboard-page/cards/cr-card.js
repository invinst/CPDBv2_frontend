import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import { mapStyle } from 'components/cr-page/related-complaints/complaint-card.style';
import ItemUnpinButton from '../item-unpin-button';
import styles from './cr-card.sass';

export default class CRCard extends Component {
  render() {
    const { removeItemInPinboardPage, item } = this.props;
    const { incidentDate, point, category } = item;

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
          <div className='cr-card-map' />
          :
          <div
            className='cr-card-map'
            style={ mapStyle(
              cardMapConfig['lat'],
              cardMapConfig['lon'],
              cardMapConfig['width'],
              cardMapConfig['height']) } />
        }
        <div className='cr-card-body'>
          <span className='cr-incident-date'>{ incidentDate }</span>
          <span className='cr-category'>{ category }</span>
        </div>
      </div>
    );
  }
}

CRCard.propTypes = {
  item: PropTypes.object,
  removeItemInPinboardPage: PropTypes.func,
};

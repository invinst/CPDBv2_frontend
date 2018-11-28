import React, { PropTypes, Component } from 'react';

import { getPrintMapUrl } from 'utils/mapbox';
import styles from './print-map.sass';


export default class PrintMap extends Component {
  render() {
    const { lat, lng, width, height, className } = this.props;

    return (
      <div className={ styles.printMap }>
        <img src={ getPrintMapUrl(lat, lng, width, height) } className={ className }/>
        <div className='map-attribution'>
          © <a href='https://www.mapbox.com/about/maps/'>Mapbox</a>&nbsp;
          © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>&nbsp;
          <a href='https://www.mapbox.com/map-feedback/' target='_blank' className='improve-this-map'>
            Improve this map
          </a>
        </div>
      </div>
    );
  }
}

PrintMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  width: PropTypes. number,
  height: PropTypes. number,
  className: PropTypes.string,
};

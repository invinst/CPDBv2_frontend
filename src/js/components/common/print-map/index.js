import React, { PropTypes } from 'react';

import { getPrintMapUrl } from 'utils/mapbox';
import styles from './print-map.sass';


export default function PrintMap(props) {
  const { lat, lng, width, height, className } = props;

  return (
    <div className={ styles.printMap }>
      <img src={ getPrintMapUrl(lat, lng, width, height) } className={ className }/>
      <div className='map-attribution'>
        © <a href='https://www.mapbox.com/about/maps/'>Mapbox</a>&nbsp;
        © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>&nbsp;
      </div>
    </div>
  );
}

PrintMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  width: PropTypes. number,
  height: PropTypes. number,
  className: PropTypes.string,
};

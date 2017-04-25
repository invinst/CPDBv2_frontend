import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { viewMapButtonStyle, textStyle, arrowStyle } from './view-map-button.style';


class ViewMapButton extends Component {
  render() {
    const { hovering, lat, lng, zoom } = this.props;
    const url = `http://maps.google.com/maps?&z=${zoom}&q=${lat}+${lng}&ll=${lat}+${lng}`;

    return (
      <a className='test--view-map-button' style={ viewMapButtonStyle(hovering) } href={ url } target='_blank'>
        <span style={ textStyle }>view on google maps</span>
        <div style={ arrowStyle(hovering) } />
      </a>
    );
  }
}

ViewMapButton.propTypes = {
  hovering: PropTypes.bool,
  lng: PropTypes.number,
  lat: PropTypes.number,
  zoom: PropTypes.number
};

ViewMapButton.defaultProps = {
  zoom: 10
};

export default Hoverable(ViewMapButton);

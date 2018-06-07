import React, { PropTypes, Component } from 'react';

import { TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';
import { wrapperStyle } from './cr-location-map.style';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import LocationMap from 'components/common/location-map';


export default class CRLocationMap extends Component {
  renderWithResponsiveStyle(style) {
    const { lat, lng } = this.props;

    return (
      <LocationMap lat={ lat } lng={ lng } extraStyle={ style.wrapper } />
    );
  }

  render() {

    return (
      <ResponsiveStyleComponent
        responsiveStyle={ {
          [TABLET]: {
            wrapper: wrapperStyle.tablet
          },
          [DESKTOP]: {
            wrapper: wrapperStyle.desktop
          },
          [EXTRA_WIDE]: {
            wrapper: wrapperStyle.extraWide
          }
        } }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

CRLocationMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number
};

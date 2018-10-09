import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { stub } from 'sinon';

import Hoverable from 'components/common/higher-order/hoverable';
import { wrapperStyle } from './marker.style';
import { MAP_ITEMS } from 'utils/constants';


export class Marker extends Component {
  constructor(props) {
    super(props);
    this.buildUrl = this.buildUrl.bind(this);
  }

  componentDidUpdate() {
    const { mapboxMarker, hovering } = this.props;
    if (hovering) {
      if (!mapboxMarker.getPopup().isOpen()) {
        mapboxMarker.togglePopup();
        mapboxMarker.getElement().style.zIndex = '10';
      }
    }
    else {
      if (mapboxMarker.getPopup().isOpen()) {
        mapboxMarker.togglePopup();
        mapboxMarker.getElement().style.zIndex = '0';
      }
    }
  }

  buildUrl() {
    const { id, kind } = this.props;
    if (kind === MAP_ITEMS.CR) {
      return `/complaint/${id}/`;
    } else if (kind === MAP_ITEMS.FORCE) {
      return `/trr/${id}/`;
    }
  }

  render() {
    const { kind, finding, hovering } = this.props;

    return (
      <Link
        to={ this.buildUrl() }
        className='test--marker'
        style={ wrapperStyle(kind, finding, hovering) }
      />
    );
  }
}

Marker.propTypes = {
  id: PropTypes.string,
  kind: PropTypes.string,
  finding: PropTypes.string,
  mapboxMarker: PropTypes.object,
  hovering: PropTypes.bool,
};

Marker.defaultProps = {
  mapboxMarker: stub(),
};

export default Hoverable(Marker);

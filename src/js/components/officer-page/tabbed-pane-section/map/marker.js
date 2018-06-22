import React, { Component, PropTypes } from 'react';

import { stub } from 'sinon';
import Hoverable from 'components/common/higher-order/hoverable';
import { wrapperStyle } from './marker.style';
import { MAP_ITEMS } from 'utils/constants';


export class Marker extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { id, kind, openComplaintPage, openTRRPage } = this.props;
    if (kind === MAP_ITEMS.CR) {
      openComplaintPage({ crid: id });
    } else if (kind === MAP_ITEMS.FORCE) {
      openTRRPage({ trrId: id });
    }
  }

  render() {
    const { kind, finding, hovering } = this.props;
    return (
      <div
        className='test--marker'
        style={ wrapperStyle(kind, finding, hovering) }
        onClick={ this.handleClick }
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
  openComplaintPage: PropTypes.func,
  openTRRPage: PropTypes.func,
};

Marker.defaultProps = {
  mapboxMarker: stub(),
  openComplaintPage: () => {},
  openTRRPage: () => {},
};

export default Hoverable(Marker);

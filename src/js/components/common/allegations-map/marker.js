import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import cx from 'classnames';

import Hoverable from 'components/common/higher-order/hoverable';
import { MAP_ITEMS } from 'utils/constants';
import styles from './marker.sass';


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

  handleClick() {
    // This is a work-around as Mapbox does not support react-router's Link.
    const { id, kind, handleClickCRMarker, handleClickTRRMarker } = this.props;
    if (kind === MAP_ITEMS.CR) {
      if (handleClickCRMarker) {
        handleClickCRMarker(id);
        handleClickTRRMarker(null);
        return;
      }
      browserHistory.push(`/complaint/${id}/`);
    } else if (kind === MAP_ITEMS.FORCE) {
      if (handleClickTRRMarker) {
        handleClickTRRMarker(id);
        handleClickCRMarker(null);
        return;
      }
      browserHistory.push(`/trr/${id}/`);
    }
  }

  render() {
    const { kind, finding } = this.props;

    return (
      <div
        className={ cx(
          styles.marker,
          'geographic-preview-link',
          {
            'force': kind === MAP_ITEMS.FORCE,
            'complaint': kind === MAP_ITEMS.CR,
            'sustained-finding': finding === 'Sustained'
          }
        ) }
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
  handleClickCRMarker: PropTypes.func,
  handleClickTRRMarker: PropTypes.func,
};

export default Hoverable(Marker);

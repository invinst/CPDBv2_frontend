import React, { Component, PropTypes } from 'react';

import GeographicContainer from 'containers/pinboard-page/geographic-container';
import SocialGraphContainer from 'containers/pinboard-page/social-graph-container';
import styles from './pinboard-data-visualization.sass';


export default class PinboardDataVisualization extends Component {
  expandedLink(visualizationName) {
    const { pinboard } = this.props;

    return `/${visualizationName}/pinboard/${pinboard.id}/`;
  }

  render() {
    const { hasMapMarker } = this.props;

    return (
      <div className={ styles.pinboardDataVisualization }>
        <div className='visualization-item'>
          <SocialGraphContainer />
          <a href={ this.expandedLink('social-graph') } className='expanded-mode-btn'>Expand</a>
        </div>
        {
          hasMapMarker &&
          (<div className='visualization-item'>
            <GeographicContainer />
            <a href={ this.expandedLink('geographic') } className='expanded-mode-btn'>Expand</a>
          </div>)
        }
      </div>
    );
  }
}

PinboardDataVisualization.propTypes = {
  pinboard: PropTypes.object,
  hasMapMarker: PropTypes.bool,
};

PinboardDataVisualization.defaultProps = {
  pinboard: {},
  hasMapMarker: false,
};

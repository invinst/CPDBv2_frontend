import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GeographicContainer from 'containers/pinboard-page/geographic-container';
import SocialGraphContainer from 'containers/pinboard-page/social-graph-container';
import ComplaintSummaryContainer from 'containers/pinboard-page/widgets/complaint-summary-container';
import TRRSummaryContainer from 'containers/pinboard-page/widgets/trr-summary-container';
import OfficersSummaryContainer from 'containers/pinboard-page/widgets/officers-summary-container';
import ComplainantsSummaryContainer from 'containers/pinboard-page/widgets/complainants-summary-container';
import Widget from 'components/common/pinboard/widgets/widget';
import styles from './pinboard-data-visualization.sass';


export default class PinboardDataVisualization extends Component {
  expandedLink(visualizationName) {
    const { pinboard } = this.props;

    return `/${visualizationName}/pinboard/${pinboard.id}/`;
  }

  render() {
    const { hasMapMarker, hasComplaintSummary, hasTRRSummary, hasOfficersSummary, hasComplainantsSummary } = this.props;

    return (
      <div className={ styles.pinboardDataVisualization }>
        <Widget widgetTitle='SOCIAL GRAPH' isVisualization={ true }>
          <SocialGraphContainer />
          <Link to={ this.expandedLink('social-graph') } className='expanded-mode-btn'>Expand</Link>
        </Widget>
        {
          hasMapMarker && (
            <Widget widgetTitle='GEOGRAPHIC MAP' isVisualization={ true }>
              <GeographicContainer />
              <Link to={ this.expandedLink('geographic') } className='expanded-mode-btn'>Expand</Link>
            </Widget>
          )
        }
        {
          hasComplaintSummary && (
            <Widget widgetTitle='COMPLAINT SUMMARY'>
              <ComplaintSummaryContainer />
            </Widget>
          )
        }
        {
          hasTRRSummary && (
            <Widget widgetTitle='TACTICAL RESPONSE REPORT SUMMARY'>
              <TRRSummaryContainer />
            </Widget>
          )
        }
        {
          hasOfficersSummary && (
            <Widget widgetTitle='OFFICERS'>
              <OfficersSummaryContainer />
            </Widget>
          )
        }
        {
          hasComplainantsSummary && (
            <Widget widgetTitle='COMPLAINANTS'>
              <ComplainantsSummaryContainer />
            </Widget>
          )
        }
        <div className='clearfix' />
      </div>
    );
  }
}

PinboardDataVisualization.propTypes = {
  pinboard: PropTypes.object,
  hasMapMarker: PropTypes.bool,
  hasComplaintSummary: PropTypes.bool,
  hasTRRSummary: PropTypes.bool,
  hasOfficersSummary: PropTypes.bool,
  hasComplainantsSummary: PropTypes.bool,
};

PinboardDataVisualization.defaultProps = {
  pinboard: {},
  hasMapMarker: false,
  hasComplaintSummary: false,
  hasTRRSummary: false,
  hasOfficersSummary: false,
  hasComplainantsSummary: false,
};

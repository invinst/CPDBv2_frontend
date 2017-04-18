import React, { Component, PropTypes } from 'react';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import SideBarContainer from 'containers/officer-page/timeline-sidebar';
import TimelineContainer from 'containers/officer-page/timeline';
import { wrapperStyle } from './timeline-page.style';


export default class TimelinePage extends Component {
  render() {
    const { officerId } = this.props;
    return (
      <ResponsiveFixedWidthComponent>
        <div style={ wrapperStyle }>
          <SideBarContainer officerId={ officerId }/>
          <TimelineContainer officerId={ officerId }/>
        </div>
      </ResponsiveFixedWidthComponent>
    );
  }
}

TimelinePage.propTypes = {
  officerId: PropTypes.number
};

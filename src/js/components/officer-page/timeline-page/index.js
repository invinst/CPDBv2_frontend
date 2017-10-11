import React, { Component, PropTypes } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import SideBarContainer from 'containers/officer-page/timeline-sidebar';
import TimelineContainer from 'containers/officer-page/timeline';
import { wrapperStyle } from './timeline-page.style';


export default class TimelinePage extends Component {
  render() {
    const { officerId, urlParams } = this.props;
    return (
      <ResponsiveFluidWidthComponent>
        <div style={ wrapperStyle }>
          <SideBarContainer officerId={ officerId }/>
          <TimelineContainer officerId={ officerId } urlParams={ urlParams }/>
        </div>
      </ResponsiveFluidWidthComponent>
    );
  }
}

TimelinePage.propTypes = {
  officerId: PropTypes.number,
  urlParams: PropTypes.object
};

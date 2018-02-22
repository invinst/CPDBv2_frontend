import React, { Component, PropTypes } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';

import OfficerRadarChart from 'components/common/radar-chart';


export default class OfficerRadarDemoPage extends Component {

  componentDidMount() {
    const { fetchPercentile, officerId } = this.props;
    fetchPercentile(officerId);
  }

  render() {
    const { threeCornerPercentile } = this.props;

    return (
      <div className='test--officer--radar-chart' >
        <ResponsiveFluidWidthComponent>
          <OfficerRadarChart data={ threeCornerPercentile }/>
        </ResponsiveFluidWidthComponent>
      </div>
    );
  }
}

OfficerRadarDemoPage.propTypes = {
  officerId: PropTypes.number,
  threeCornerPercentile: PropTypes.array,
  fetchPercentile: PropTypes.func
};

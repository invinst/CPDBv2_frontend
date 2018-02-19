import React, { Component, PropTypes } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import { wrapperStyle } from './radar-chart.style';

import OfficerRadarChart from 'components/common/radar-chart';


export default class OfficerRadarDemoPage extends Component {

  componentDidMount() {
    const { fetchPercentile, officerId } = this.props;
    fetchPercentile(officerId);
  }

  render() {
    const { threeCornerPercentile, fiveCornerPercentile } = this.props;

    // const yearlyPercentile = [{
    //   year: 2015,
    //   items: [
    //     { axis: 'Use of Force Reports', value: 20 },
    //     { axis: 'Civilian Complaints', value: 0 },
    //     { axis: 'Internal Complaints', value: 10 },
    //   ]
    // }, {
    //   year: 2016,
    //   items: [
    //     { axis: 'Use of Force Reports', value: 40 },
    //     { axis: 'Civilian Complaints', value: 50 },
    //     { axis: 'Internal Complaints', value: 60 },
    //   ]
    // }, {
    //   year: 2017,
    //   items: [
    //     { axis: 'Use of Force Reports', value: 80 },
    //     { axis: 'Civilian Complaints', value: 70 },
    //     { axis: 'Internal Complaints', value: 60 },
    //   ]
    // }]; // TODO: dummy data, retrieve from this.props, remove later

    return (
      <div style={ wrapperStyle }>
        <ResponsiveFluidWidthComponent>
          <OfficerRadarChart data={ threeCornerPercentile }/>
          <OfficerRadarChart data={ fiveCornerPercentile }/>
        </ResponsiveFluidWidthComponent>
      </div>
    );
  }
}

OfficerRadarDemoPage.propTypes = {
  officerId: PropTypes.number,
  threeCornerPercentile: PropTypes.array,
  fiveCornerPercentile: PropTypes.array,
  fetchPercentile: PropTypes.func

};

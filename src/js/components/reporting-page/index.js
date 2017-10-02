import React, { Component, PropTypes } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import ReportsMasonryContainer from 'containers/reporting-page/reports-masonry';
import { pageStyle } from './reporting-page.style';


export default class ReportingPage extends Component {
  render() {
    const { editModeOn } = this.context;
    return (
      <div style={ pageStyle }>
        <ResponsiveFluidWidthComponent>
          <ReportsMasonryContainer editModeOn={ editModeOn }/>
        </ResponsiveFluidWidthComponent>
      </div>
    );
  }
}

ReportingPage.contextTypes = {
  editModeOn: PropTypes.bool
};

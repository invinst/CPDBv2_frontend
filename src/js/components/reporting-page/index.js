import React, { Component } from 'react';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import ReportsMasonryContainer from 'containers/reporting-page/reports-masonry';
import { pageStyle } from './reporting-page.style';


export default class ReportingPage extends Component {
  render() {
    return (
      <div style={ pageStyle }>
        <ResponsiveFixedWidthComponent>
          <ReportsMasonryContainer/>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}

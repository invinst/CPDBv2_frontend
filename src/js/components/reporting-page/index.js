import React, { Component, PropTypes } from 'react';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import ReportsMasonryContainer from 'containers/reporting-page/reports-masonry';
import { pageStyle } from './reporting-page.style';


export default class ReportingPage extends Component {
  render() {
    const { editModeOn } = this.context;
    return (
      <div style={ pageStyle }>
        <ResponsiveFixedWidthComponent>
          <ReportsMasonryContainer editModeOn={ editModeOn }/>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}

ReportingPage.contextTypes = {
  editModeOn: PropTypes.bool
};

import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import {
  incidentDateWrapperStyle,
  incidentDateStyleLabel,
  incidentDateStyleValue,
} from 'components/cr-page/complaint-incident-date/complaint-incident-date.style';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';


export default class ComplaintIncidentDate extends Component {
  render() {
    const { incidentDate } = this.props;
    if (!incidentDate) return null;

    return (
      <ResponsiveFluidWidthComponent>
        <div style={ incidentDateWrapperStyle }>
          <div style={ incidentDateStyleLabel }>DATE</div>
          <div className='test--cr-incident-date' style={ incidentDateStyleValue }>
            { moment(incidentDate).format('ll') }
          </div>
        </div>
      </ResponsiveFluidWidthComponent>
    );
  }
}

ComplaintIncidentDate.propTypes = {
  incidentDate: PropTypes.string,
};

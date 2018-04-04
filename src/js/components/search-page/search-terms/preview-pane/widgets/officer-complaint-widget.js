import React, { Component, PropTypes } from 'react';

import { map } from 'lodash';
import pluralize from 'pluralize';


export default class OfficerComplaintWidget extends Component {
  render() {
    return (
      <div className='test--officer-complaint-widget'>
        <h5>OFFICERS WITH MOST COMPLAINTS</h5>
        <ul>
          { map(this.props.officers, (officer) => (
            <li>
              <div><img src='http://via.placeholder.com/32x32'/></div>
              <div>
                <p>{ officer.name }</p>
                <p>{ pluralize('allegation', officer.allegation_count, true) }</p>
              </div>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

OfficerComplaintWidget.propTypes = {
  officers: PropTypes.shape({
    name: PropTypes.string.isRequired,
    'allegation_count': PropTypes.number.isRequired
  }).isRequired
};

import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import pluralize from 'pluralize';


export default class CommonComplaintWidget extends Component {
  render() {
    return (
      <div className='test--common-complaint-widget'>
        <h5>MOST COMMON COMPLAINT</h5>
        <ul>
          { map(this.props.complaintCategories, (category) => (
            <li>
              <p>{ category.name } </p>
              <p>{ pluralize('allegation', category.allegation_count, true) }</p>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

CommonComplaintWidget.propTypes = {
  complaintCategories: PropTypes.shape({
    'name': PropTypes.string.isRequired,
    'allegation_count': PropTypes.number.isRequired,
  }).isRequired
};

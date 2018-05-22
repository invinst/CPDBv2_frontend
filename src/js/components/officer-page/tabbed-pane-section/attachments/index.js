import React, { Component, PropTypes } from 'react';
import Complaint from './complaint';


export default class Attachments extends Component {

  render() {
    const { complaints, openComplaintPage } = this.props;
    return (
      <div>
        {
          complaints.map((complaint, index) => {
            return (
              <Complaint
                complaint={ complaint }
                key={ index }
                openComplaintPage={ openComplaintPage }
              />
            );
          })
        }
      </div>
    );
  }
}

Attachments.propTypes = {
  complaints: PropTypes.array,
  openComplaintPage: PropTypes.func,
};

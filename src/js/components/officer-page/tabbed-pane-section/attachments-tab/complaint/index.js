import React, { Component, PropTypes } from 'react';
import Attachment from './attachment';
import { wrapperStyle } from './complaint.style';
import Heading from './heading';


export default class Complaint extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { complaint } = this.props;
    return (
      <div
        style={ wrapperStyle }
        className='test--attachments-complaint'
      >
        <Heading complaint={ complaint } />
        <div>
          {
            complaint.attachments.map((attachment, index) =>
              <Attachment attachment={ attachment } key={ index }/>
            )
          }
        </div>
      </div>
    );
  }
}

Complaint.propTypes = {
  complaint: PropTypes.object,
};

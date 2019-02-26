import React, { Component, PropTypes } from 'react';

import Attachment from './attachment';
import Heading from './heading';
import styles from './complaint.sass';


export default class Complaint extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { complaint, onTrackingAttachment } = this.props;
    return (
      <div className={ styles.complaint }>
        <Heading complaint={ complaint } />
        <div>
          {
            complaint.attachments.map((attachment, index) =>
              <Attachment attachment={ attachment } key={ index } onTrackingAttachment={ onTrackingAttachment }/>
            )
          }
        </div>
      </div>
    );
  }
}

Complaint.propTypes = {
  complaint: PropTypes.object,
  onTrackingAttachment: PropTypes.func
};

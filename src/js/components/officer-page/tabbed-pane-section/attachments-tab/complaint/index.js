import PropTypes from 'prop-types';
import React from 'react';

import Attachment from './attachment';
import Heading from './heading';
import styles from './complaint.sass';


export default function Complaint(props) {
  const { complaint, onTrackingAttachment, pathname } = props;
  return (
    <div className={ styles.complaint }>
      <Heading complaint={ complaint } />
      <div>
        {
          complaint.attachments.map((attachment, index) =>
            <Attachment
              attachment={ attachment }
              key={ index }
              onTrackingAttachment={ onTrackingAttachment }
              pathname={ pathname }
            />
          )
        }
      </div>
    </div>
  );
}

Complaint.propTypes = {
  complaint: PropTypes.object,
  onTrackingAttachment: PropTypes.func,
  pathname: PropTypes.string,
};

import PropTypes from 'prop-types';
import React from 'react';

import Complaint from './complaint';
import styles from './attachments-tab.sass';


export default function AttachmentsTab(props) {
  const { complaints, onTrackingAttachment } = props;
  return (
    <div className={ styles.attachmentsTab }>
      <div className='attachments-tab-title'>
        <div className='title-text'>
          <span className='attachments-text'>
            DOCUMENTS &nbsp;
          </span>
          <span className='graphic-content-text'>
            MAY CONTAIN GRAPHIC CONTENT
          </span>
        </div>
      </div>
      {
        complaints.map((complaint, index) => {
          return (
            <Complaint
              complaint={ complaint }
              key={ index }
              onTrackingAttachment={ onTrackingAttachment }
            />
          );
        })
      }
    </div>
  );
}

AttachmentsTab.defaultProps = {
  complaints: () => {},
};

AttachmentsTab.propTypes = {
  complaints: PropTypes.array,
  onTrackingAttachment: PropTypes.func,
};

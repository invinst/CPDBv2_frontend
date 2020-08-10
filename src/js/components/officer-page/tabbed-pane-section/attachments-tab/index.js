import PropTypes from 'prop-types';
import React from 'react';

import Complaint from './complaint';
import Lawsuit from './lawsuit';
import styles from './attachments-tab.sass';


export default function AttachmentsTab(props) {
  const { lawsuits, complaints, onTrackingAttachment, location: { pathname } } = props;
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
              pathname={ pathname }
            />
          );
        })
      }
      {
        lawsuits.map((lawsuit, index) => {
          return (
            <Lawsuit
              lawsuit={ lawsuit }
              key={ index }
              onTrackingAttachment={ onTrackingAttachment }
              pathname={ pathname }
            />
          );
        })
      }
    </div>
  );
}

AttachmentsTab.defaultProps = {
  complaints: () => {},
  lawsuits: () => {},
  location: {},
};

AttachmentsTab.propTypes = {
  complaints: PropTypes.array,
  lawsuits: PropTypes.array,
  onTrackingAttachment: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

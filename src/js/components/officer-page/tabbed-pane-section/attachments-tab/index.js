import React, { Component, PropTypes } from 'react';

import Complaint from './complaint';
import styles from './attachments-tab.sass';


export default class AttachmentsTab extends Component {

  render() {
    const { complaints } = this.props;
    return (
      <div className={ styles.attachmentsTab }>
        <div className='attachments-tab-title'>
          <div className='title-text'>
            <span className='attachments-text'>
              ATTACHMENTS &nbsp;
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
              />
            );
          })
        }
      </div>
    );
  }
}

AttachmentsTab.defaultProps = {
  complaints: () => {},
};

AttachmentsTab.propTypes = {
  complaints: PropTypes.array,
};

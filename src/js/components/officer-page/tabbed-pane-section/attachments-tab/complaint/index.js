import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import Attachment from './attachment';
import Heading from './heading';
import styles from './complaint.sass';


export default class Complaint extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { complaint } = this.props;
    return (
      <div
        className={ cx(styles.complaint, 'test--attachments-complaint') }
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

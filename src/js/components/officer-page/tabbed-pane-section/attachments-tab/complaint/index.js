import React, { Component, PropTypes } from 'react';
import Attachment from './attachment';
import { wrapperStyle } from './complaint.style';
import Heading from './heading';


export default class Complaint extends Component {
  constructor(props) {
    super(props);

    this.renderAttachments = this.renderAttachments.bind(this);
  }

  renderAttachments() {
    const { attachments } = this.props.complaint;
    return (
      attachments.map((attachment, index) => {
        return <Attachment attachment={ attachment } key={ index } />;
      })
    );
  }

  render() {
    const { complaint, openComplaintPage } = this.props;
    return (
      <div
        style={ wrapperStyle }
        className='test--attachments-complaint'
      >
        <Heading complaint={ complaint } openComplaintPage={ openComplaintPage } />
        <div>
          { this.renderAttachments() }
        </div>
      </div>
    );
  }
}

Complaint.propTypes = {
  complaint: PropTypes.object,
  openComplaintPage: PropTypes.func,
};

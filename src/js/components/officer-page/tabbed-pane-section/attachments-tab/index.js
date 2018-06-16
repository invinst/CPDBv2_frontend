import React, { Component, PropTypes } from 'react';

import {
  wrapperStyle,
  attachmentsTextStyle,
  titleStyle,
  graphicContentTextStyle,
  titleTextStyle
} from './attachments-tab.style';
import Complaint from './complaint';


export default class AttachmentsTab extends Component {

  render() {
    const { complaints, openComplaintPage } = this.props;
    return (
      <div style={ wrapperStyle }>
        <div style={ titleStyle }>
          <div style={ titleTextStyle }>
            <span style={ attachmentsTextStyle }>
              ATTACHMENTS &nbsp;
            </span>
            <span style={ graphicContentTextStyle }>
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
                openComplaintPage={ openComplaintPage }
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
  openComplaintPage: PropTypes.func,
};

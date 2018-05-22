import Hoverable from 'components/common/higher-order/hoverable';
import React, { Component, PropTypes } from 'react';
import Attachment from './attachment';
import {
  attachmentWrapperStyle,
  baseCategoryStyle,
  baseDateStyle,
  baseKindStyle,
  baseShowingStyle,
  baseWrapperKindStyle,
  baseWrapperShowingStyle,
  categoryStyle,
  coaccusedStyle,
  dateStyle,
  detailStyle,
  findingStyle,
  kindStyle,
  rightStyle,
  showingStyle,
  wrapperShowingStyle
} from './complaint.style';


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
    const {
      crid, officerId, category, finding, outcome, date, coaccused, hovering
    } = this.props.complaint;

    const { openComplaintPage } = this.props;

    return (
      <div
        style={ { ...baseWrapperShowingStyle, ...wrapperShowingStyle(hovering) } }
        className='test--attachments-complaint'
      >
        <span
          style={ { ...baseShowingStyle, ...showingStyle } }
          onClick={ () => openComplaintPage({ crid: crid, officerId: officerId }) }
        >
          <div style={ baseWrapperKindStyle }>
            <span
              style={ { ...baseKindStyle, ...kindStyle(finding === 'Sustained') } }
              className='test--attachments-complaint-kind'
            >
              Complaint
            </span>
          </div>
          <span style={ detailStyle }>
            <div
              style={ { ...baseCategoryStyle, ...categoryStyle } }
              className='test--attachments-complaint-category'>
              { category }
            </div>
            <div style={ findingStyle } className='test--attachments-complaint-finding'>{ finding }, { outcome }</div>
          </span>
          <span style={ rightStyle }>
            <span
              style={ coaccusedStyle }
              className='test--attachments-complaint-coaccused'>
              1 of { coaccused } coaccused
            </span>
            <span style={ attachmentWrapperStyle } />
            <span
              style={ { ...baseDateStyle, ...dateStyle } }
              className='test--attachments-complaint-date'>{ date }
            </span>
          </span>
        </span>
        { this.renderAttachments() }
      </div>
    );
  }
}

Complaint.propTypes = {
  complaint: PropTypes.object,
  openComplaintPage: PropTypes.func,
};

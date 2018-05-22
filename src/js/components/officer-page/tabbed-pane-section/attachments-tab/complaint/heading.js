import Hoverable from 'components/common/higher-order/hoverable';
import React, { Component, PropTypes } from 'react';
import {
  categoryStyle,
  coaccusedStyle,
  dateStyle,
  detailStyle,
  findingStyle,
  wrapperStyle,
  kindStyle,
  rightStyle,
  wrapperKindStyle
} from './heading.style';


class Heading extends Component {

  render() {
    const {
      crid, officerId, category, finding, outcome, date, coaccused
    } = this.props.complaint;

    const { openComplaintPage, hovering } = this.props;

    return (
      <div
        style={ wrapperStyle(hovering) }
        onClick={ () => openComplaintPage({ crid: crid, officerId: officerId }) }
      >
        <div style={ wrapperKindStyle }>
          <span
            style={ kindStyle(finding === 'Sustained') }
            className='test--attachments-complaint-kind'
          >
            Complaint
          </span>
        </div>
        <span style={ detailStyle }>
          <div
            style={ categoryStyle(hovering) }
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
          <span
            style={ dateStyle }
            className='test--attachments-complaint-date'>{ date }
          </span>
        </span>
      </div>
    );
  }
}

Heading.propTypes = {
  complaint: PropTypes.object,
  openComplaintPage: PropTypes.func,
  hovering: PropTypes.bool,
};

export default Hoverable(Heading);

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Hoverable from 'components/common/higher-order/hoverable';
import {
  categoryStyle,
  coaccusedStyle,
  dateStyle,
  detailStyle,
  findingStyle,
  wrapperStyle,
  kindStyle,
  rightStyle,
  wrapperKindStyle,
  boxStyle,
} from './heading.style';


class Heading extends Component {

  render() {
    const { crid, category, finding, outcome, date, coaccused } = this.props.complaint;
    const { hovering } = this.props;

    return (
      <Link
        style={ wrapperStyle(hovering) }
        to={ `/complaint/${crid}/` }
        className='test--attachments-heading'
      >
        <div style={ boxStyle }>
          <div style={ wrapperKindStyle }>
            <span
              style={ kindStyle(finding === 'Sustained') }
              className='test--attachments-heading-kind'
            >
              Complaint
            </span>
          </div>
          <span style={ detailStyle }>
            <div
              style={ categoryStyle(hovering) }
              className='test--attachments-heading-category'>
              { category }
            </div>
            <div style={ findingStyle } className='test--attachments-heading-finding'>{ finding }, { outcome }</div>
          </span>
          <span style={ rightStyle }>
            <span
              style={ coaccusedStyle }
              className='test--attachments-heading-coaccused'>
              1 of { coaccused } coaccused
            </span>
            <span
              style={ dateStyle }
              className='test--attachments-heading-date'>{ date }
            </span>
          </span>
        </div>
      </Link>
    );
  }
}

Heading.propTypes = {
  complaint: PropTypes.object,
  hovering: PropTypes.bool,
};

export default Hoverable(Heading);

import Attachments from 'components/officer-page/tabbed-pane-section/timeline/item/showings/cr/attachments';
import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';

import {
  categoryStyle,
  coaccusedStyle,
  dateStyle,
  detailStyle,
  findingStyle,
  kindStyle,
  rightStyle,
  showingStyle,
  wrapperShowingStyle,
} from './cr.style';


class Cr extends Component {
  render() {
    const {
      item,
      hasBorderBottom,
      baseStyles,
      hovering,
      officerId,
      openComplaintPage,
      changeOfficerTab,
      pathname,
    } = this.props;

    const {
      baseWrapperShowingStyle,
      baseShowingStyle,
      baseWrapperKindStyle,
      baseKindStyle,
      baseCategoryStyle,
      baseDateStyle,
    } = baseStyles;

    return (
      <span
        style={ { ...baseWrapperShowingStyle, ...wrapperShowingStyle(hovering) } }
        onClick={ () => openComplaintPage({ crid: item.crid, officerId: officerId }) }
        className='test--cr-item'
      >
        <span style={ { ...baseShowingStyle(hasBorderBottom), ...showingStyle } }>
          <div style={ baseWrapperKindStyle }>
            <span
              style={ { ...baseKindStyle, ...kindStyle(item.finding === 'Sustained') } }
              className='test--cr-item-kind'
            >
              Complaint
            </span>
          </div>
          <span style={ detailStyle }>
            <div
              style={ { ...baseCategoryStyle, ...categoryStyle(hovering) } }
              className='test--cr-item-category'>
              { item.category }
            </div>
            <div style={ findingStyle } className='test--cr-item-finding'>{ item.finding }, { item.outcome }</div>
          </span>
          <span style={ rightStyle }>
            <span style={ coaccusedStyle } className='test--cr-item-coaccused'>1 of { item.coaccused } coaccused</span>
            <Attachments attachments={ item.attachments } changeOfficerTab={ changeOfficerTab } pathname={ pathname } />
            <span style={ { ...baseDateStyle, ...dateStyle } } className='test--cr-item-date'>{ item.date }</span>
          </span>
        </span>
      </span>
    );
  }
}

Cr.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
  baseStyles: PropTypes.object,
  hovering: PropTypes.bool,
  officerId: PropTypes.number,
  openComplaintPage: PropTypes.func,
  changeOfficerTab: PropTypes.func,
  pathname: PropTypes.string,
};

export default Hoverable(Cr);

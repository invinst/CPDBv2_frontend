import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import {
  attachmentImageStyle,
  attachmentWrapperStyle,
  coaccusedStyle,
  dateStyle,
  findingStyle,
  kindStyle,
  moreAttachmentsStyle,
  rightStyle,
  showingStyle,
  wrapperShowingStyle,
  categoryStyle,
} from './cr.style';


class Cr extends Component {
  renderAttachments() {
    const { attachments } = this.props.item;

    const [firstAttachment, ...rest] = attachments;
    if (firstAttachment) {
      return (
        <span style={ attachmentWrapperStyle }>
          {
            rest.length ?
              <span style={ moreAttachmentsStyle } className='test--more-attachment'>+{rest.length}</span>
              :
              null
          }
          <a href={ firstAttachment.url } className='test--attachment-image-href'>
            <img
              style={ attachmentImageStyle }
              src={ firstAttachment.previewImageUrl }
              className='test--attachment-image'
            />
          </a>
        </span>
      );
    }
    return <span style={ attachmentWrapperStyle }/>;
  }

  render() {
    const { item, hasBorderBottom, baseStyles, hovering } = this.props;
    const {
      baseWrapperShowingStyle,
      baseShowingStyle,
      baseWrapperKindStyle,
      baseKindStyle,
      baseDetailStyle,
      baseCategoryStyle,
      baseDateStyle,
    } = baseStyles;

    return (
      <span style={ { ...baseWrapperShowingStyle, ...wrapperShowingStyle(hovering) } }>
        <span style={ { ...baseShowingStyle(hasBorderBottom), ...showingStyle } }>
          <div style={ baseWrapperKindStyle }>
            <span
              style={ { ...baseKindStyle, ...kindStyle(item.finding === 'Sustained') } }
              className='test--cr-item-kind'
            >
              Complaint
            </span>
          </div>
          <span style={ baseDetailStyle }>
            <div
              style={ { ...baseCategoryStyle, ...categoryStyle(hovering) } }
              className='test--cr-item-category'>
              { item.category }
            </div>
            <div style={ findingStyle } className='test--cr-item-finding'>{ item.finding }, { item.outcome }</div>
          </span>
          <span style={ rightStyle }>
            <span style={ coaccusedStyle } className='test--cr-item-coaccused'>1 of { item.coaccused } coaccused</span>
            { this.renderAttachments() }
            <span style={ { ...baseDateStyle, ...dateStyle } } className='test--cr-item-date'>{ item.date }</span>
          </span>
        </span>
      </span>
    );
  }
}

Cr.propTypes = {
  item: PropTypes.object,
  attachments: PropTypes.array,
  hasBorderBottom: PropTypes.bool,
  baseStyles: PropTypes.object,
  hovering: PropTypes.bool,
};

export default Hoverable(Cr);

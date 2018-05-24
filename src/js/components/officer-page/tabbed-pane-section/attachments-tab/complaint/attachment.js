import Hoverable from 'components/common/higher-order/hoverable';
import OutboundLink from 'components/common/outbound-link';
import React, { Component, PropTypes } from 'react';

import {
  attachmentImageStyle,
  attachmentTitleStyle,
  wrapperStyle
} from './attachment.style';


class Attachment extends Component {
  render() {
    const { title, url, previewImageUrl, fileType } = this.props.attachment;
    const { hovering } = this.props;
    return (
      <OutboundLink href={ url } style={ wrapperStyle(hovering) } className='test--attachment'>
        <div
          className='test--attachment-preview-image'
          style={ attachmentImageStyle(hovering, previewImageUrl, fileType) }
        />
        <span
          className='test--attachment-title'
          style={ attachmentTitleStyle(hovering) }>{ title }
        </span>
      </OutboundLink>
    );
  }
}

Attachment.propTypes = {
  attachment: PropTypes.object,
  hovering: PropTypes.bool,
};

export default Hoverable(Attachment);

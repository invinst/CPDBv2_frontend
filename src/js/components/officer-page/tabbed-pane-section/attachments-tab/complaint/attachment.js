import Hoverable from 'components/common/higher-order/hoverable';
import OutboundLink from 'components/common/outbound-link';
import React, { Component, PropTypes } from 'react';

import {
  attachmentImageStyle,
  attachmentNameStyle,
  insideStyle,
  outboundLinkStyle,
  wrapperStyle
} from './attachment.style';


class Attachment extends Component {
  render() {
    const { title, url, previewImageUrl } = this.props.attachment;
    const { hovering } = this.props;
    return (
      <div style={ wrapperStyle(hovering) }>
        <div style={ insideStyle }>
          <OutboundLink href={ url } className='test--attachment-complaints-image-href' style={ outboundLinkStyle }>
            <img
              style={ attachmentImageStyle(hovering) }
              src={ previewImageUrl }
              className='test--attachment-complaints-image'
            />
          </OutboundLink>
          <span style={ attachmentNameStyle(hovering) }>{ title }</span>
        </div>
      </div>
    );
  }
}

Attachment.propTypes = {
  attachment: PropTypes.object,
  hovering: PropTypes.bool,
};

export default Hoverable(Attachment);

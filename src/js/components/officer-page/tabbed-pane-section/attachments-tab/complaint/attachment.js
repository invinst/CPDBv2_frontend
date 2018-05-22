import OutboundLink from 'components/common/outbound-link';
import React, { Component, PropTypes } from 'react';

import {
  attachmentImageStyle,
  attachmentNameStyle,
  insideStyle,
  outboundLinkStyle,
  wrapperStyle
} from './attachment.style';


export default class Attachment extends Component {
  render() {
    const { title, url, previewImageUrl } = this.props.attachment;
    return (
      <div style={ wrapperStyle }>
        <div style={ insideStyle }>
          <OutboundLink href={ url } className='test--attachment-complaints-image-href' style={ outboundLinkStyle }>
            <img
              style={ attachmentImageStyle }
              src={ previewImageUrl }
              className='test--attachment-complaints-image'
            />
          </OutboundLink>
          <span style={ attachmentNameStyle }>{ title }</span>
        </div>
      </div>
    );
  }
}

Attachment.propTypes = {
  attachment: PropTypes.object,
};

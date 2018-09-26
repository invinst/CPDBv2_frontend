import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { wrapperStyle, thumbnailStyle, titleStyle } from './attachment-item.style';
import * as GATracking from 'utils/google_analytics_tracking';
import OutboundLink from 'components/common/outbound-link';


class AttachmentItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { pathname, url } = this.props;
    GATracking.trackAttachmentClick(pathname, url);
  }

  render() {
    const { url, previewImageUrl, title, fileType, hovering } = this.props;

    return (
      <OutboundLink style={ wrapperStyle } href={ url } className='test--attachment-card' onClick={ this.handleClick }>
        <div style={ thumbnailStyle(fileType, previewImageUrl, hovering) } />
        <div style={ titleStyle(hovering) } className='test--attachment-card-title'>{ title }</div>
      </OutboundLink>
    );
  }
}

AttachmentItem.propTypes = {
  url: PropTypes.string,
  previewImageUrl: PropTypes.string,
  title: PropTypes.string,
  fileType: PropTypes.string,
  hovering: PropTypes.bool,
  pathname: PropTypes.string,
};

AttachmentItem.defaultProps = {
  fileType: 'audio'
};

export default Hoverable(AttachmentItem);

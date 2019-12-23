import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import { thumbnailStyle } from './attachment-item.style';
import * as GATracking from 'utils/google_analytics_tracking';
import OutboundLink from 'components/common/outbound-link';
import styles from './attachment-item.sass';


class AttachmentItem extends Component {
  handleClick = () => {
    const { pathname, url, onTrackingAttachment, id } = this.props;
    GATracking.trackAttachmentClick(pathname, url);
    onTrackingAttachment({ attachmentId: id, sourcePage: 'CR Page', app: 'Frontend' });
  };

  render() {
    const { url, previewImageUrl, title, fileType } = this.props;

    return (
      <OutboundLink
        href={ url }
        className={ cx(styles.attachmentItem, 'test--attachment-card') }
        onClick={ this.handleClick }
      >
        <div
          style={ thumbnailStyle(fileType, previewImageUrl) }
          className={ cx('attachment-card-thumbnail', fileType, 'no-print') } />
        <div className='attachment-card-title'>{ title }</div>
      </OutboundLink>
    );
  }
}

AttachmentItem.propTypes = {
  url: PropTypes.string,
  previewImageUrl: PropTypes.string,
  title: PropTypes.string,
  fileType: PropTypes.string,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
  id: PropTypes.string,
};

AttachmentItem.defaultProps = {
  fileType: 'audio',
  onTrackingAttachment: () => {},
};

export default AttachmentItem;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

import OutboundLink from 'components/common/outbound-link';
import styles from './attachment.sass';
import { imageStyle } from 'components/common/shared.style';
import * as tracking from 'utils/tracking';


export default class Attachment extends Component {
  handleClick = () => {
    const { onTrackingAttachment, pathname } = this.props;
    const { id, url } = this.props.attachment;
    tracking.trackAttachmentClick(pathname, url);
    onTrackingAttachment({ attachmentId: id, sourcePage: 'Officer Page - Attachments Tab', app: 'Frontend' });
  };

  render() {
    const { title, url, previewImageUrl, fileType } = this.props.attachment;
    return (
      <OutboundLink href={ url } target='_blank' className={ styles.attachment } onClick={ this.handleClick }>
        <div
          className={ cx('attachment-preview-image', fileType) }
          style={ imageStyle(previewImageUrl) }
        />
        <span className='attachment-title'>
          { title }
        </span>
      </OutboundLink>
    );
  }
}

Attachment.propTypes = {
  attachment: PropTypes.object,
  onTrackingAttachment: PropTypes.func,
  url: PropTypes.string,
  pathname: PropTypes.string,
};

Attachment.defaultProps = {
  onTrackingAttachment: () => {},
};

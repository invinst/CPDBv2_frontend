import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import OutboundLink from 'components/common/outbound-link';
import styles from './attachment.sass';
import { imageStyle } from 'components/common/shared.style';


export default class Attachment extends Component {
  handleClick = () => {
    const { onTrackingAttachment } = this.props;
    const { id } = this.props.attachment;
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
};

Attachment.defaultProps = {
  onTrackingAttachment: () => {},
};

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import OutboundLink from 'components/common/outbound-link';
import styles from './attachment.sass';
import { imageStyle } from 'components/common/shared.style';


export default class Attachment extends Component {
  render() {
    const { title, url, previewImageUrl, fileType } = this.props.attachment;
    return (
      <OutboundLink href={ url } target='_blank' className={ styles.attachment }>
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
};

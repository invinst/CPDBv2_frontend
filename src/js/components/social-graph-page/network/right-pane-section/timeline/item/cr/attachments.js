import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './attachments.sass';
import { ATTACHMENT_TYPES } from 'utils/constants';
import * as GATracking from 'utils/google_analytics_tracking';


export default class Attachments extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // this is necessary at we cannot use nested anchors
  handleClick(e) {
    e.preventDefault();
    const { pathname, attachments, onTrackingAttachment } = this.props;
    const url = attachments[0].url;
    const id = attachments[0]['id'];
    GATracking.trackAttachmentClick(pathname, url);
    onTrackingAttachment({ attachmentId: id, sourcePage: 'Social Graph Page - Timeline Tab', app: 'Frontend' });
    window.open(url, '_blank');
  }

  render() {
    const firstAttachment = this.props.attachments[0];
    if (firstAttachment) {
      const { fileType, previewImageUrl } = firstAttachment;
      return (
        <div className={ cx(styles.wrapper, 'test--attachments') } >
          <div
            className={ cx('image', { 'document': fileType === ATTACHMENT_TYPES.DOCUMENT }) }
            style={ { backgroundImage: `url(${previewImageUrl})` } }
            onClick={ this.handleClick }
          />
        </div>
      );
    }
    return null;
  }
}

Attachments.propTypes = {
  attachments: PropTypes.array,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
};

Attachments.defaultProps = {
  onTrackingAttachment: () => {}
};

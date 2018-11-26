import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import { thumbnailStyle } from './attachment-item.style';
import * as GATracking from 'utils/google_analytics_tracking';
import OutboundLink from 'components/common/outbound-link';
import styles from './attachment-item.sass';
import printStyles from 'components/common/print.sass';


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
    const { url, previewImageUrl, title, fileType } = this.props;

    return (
      <OutboundLink
        href={ url }
        className={ cx(styles.attachmentItem, 'test--attachment-card') }
        onClick={ this.handleClick }
      >
        <div
          style={ thumbnailStyle(fileType, previewImageUrl) }
          className={ cx('attachment-card-thumbnail', fileType, printStyles.noPrint) } />
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
  hovering: PropTypes.bool,
  pathname: PropTypes.string,
};

AttachmentItem.defaultProps = {
  fileType: 'audio'
};

export default AttachmentItem;

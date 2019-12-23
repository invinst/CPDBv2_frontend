import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import OutboundLink from 'components/common/outbound-link';
import { imageStyle } from 'components/common/shared.style';
import { scrollToElement } from 'utils/dom';
import { OFFICER_PAGE_TAB_NAMES } from 'utils/constants';
import * as GATracking from 'utils/google_analytics_tracking';
import styles from './attachments.sass';


export default class Attachments extends Component {
  handleClick = () => {
    const { pathname, attachments, onTrackingAttachment } = this.props;
    const [firstAttachment] = attachments;
    const { url, id } = firstAttachment;
    GATracking.trackAttachmentClick(pathname, url);
    onTrackingAttachment({ attachmentId: id, sourcePage: 'Officer Page - Timeline Tab', app: 'Frontend' });
  };

  render() {
    const { attachments, changeOfficerTab } = this.props;
    const [firstAttachment, ...rest] = attachments;
    if (firstAttachment) {
      const { url, previewImageUrl, fileType } = firstAttachment;
      return (
        <span className={ styles.attachments }>
          {
            rest.length
              ? (
                <span
                  className='more-attachment'
                  onClick={ (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    changeOfficerTab(OFFICER_PAGE_TAB_NAMES.ATTACHMENTS);
                    scrollToElement('.tabbed-pane-section', true, -40);
                  } }
                >
                  +{ rest.length }
                </span>
              )
              : null
          }
          <OutboundLink
            href={ url }
            className='attachment-image-href'
            target='_blank'
            onClick={ this.handleClick }
          >
            <div
              className={ cx('attachment-image', fileType, 'no-print') }
              style={ imageStyle(previewImageUrl) }
            />
          </OutboundLink>
        </span>
      );
    }
    return <span className={ styles.attachments }/>;
  }
}

Attachments.propTypes = {
  attachments: PropTypes.array,
  changeOfficerTab: PropTypes.func,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
};

Attachments.defaultProps = {
  onTrackingAttachment: () => {},
};

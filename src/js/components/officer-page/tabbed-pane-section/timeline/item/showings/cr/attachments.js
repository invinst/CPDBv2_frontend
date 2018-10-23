import React, { Component, PropTypes } from 'react';

import OutboundLink from 'components/common/outbound-link';
import { imageStyle, wrapperStyle, moreStyle } from './attachments.style';
import { scrollToElement } from 'utils/dom';
import { OFFICER_PAGE_TAB_NAMES } from 'utils/constants';
import * as GATracking from 'utils/google_analytics_tracking';


export default class Attachments extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { pathname, attachments } = this.props;
    const [firstAttachment] = attachments;
    const { url } = firstAttachment;
    GATracking.trackAttachmentClick(pathname, url);
  }

  render() {
    const { attachments, changeOfficerTab } = this.props;
    const [firstAttachment, ...rest] = attachments;
    if (firstAttachment) {
      const { url, previewImageUrl, fileType } = firstAttachment;
      return (
        <span style={ wrapperStyle }>
          {
            rest.length
              ? (
                <span
                  style={ moreStyle }
                  className='test--more-attachment'
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
            className='test--attachment-image-href'
            target='_blank'
            onClick={ this.handleClick }
          >
            <div
              className='test--attachment-image'
              style={ imageStyle(previewImageUrl, fileType) }
            />
          </OutboundLink>
        </span>
      );
    }
    return <span style={ wrapperStyle }/>;
  }
}

Attachments.propTypes = {
  attachments: PropTypes.array,
  changeOfficerTab: PropTypes.func,
  pathname: PropTypes.string,
};

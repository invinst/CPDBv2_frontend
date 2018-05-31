import React, { Component, PropTypes } from 'react';

import OutboundLink from 'components/common/outbound-link';
import { imageStyle, wrapperStyle, moreStyle } from './attachments.style';
import { scrollToTop } from 'utils/dom';


export default class Attachments extends Component {
  render() {
    const { attachments, changeOfficerTab } = this.props;
    const [firstAttachment, ...rest] = attachments;
    if (firstAttachment) {
      const { url, previewImageUrl, fileType } = firstAttachment;
      return (
        <span style={ wrapperStyle } className='test--first-attachment'>
          {
            rest.length
              ? (
                <span
                  style={ moreStyle }
                  className='test--more-attachment'
                  onClick={ (e) => {
                    e.stopPropagation();
                    changeOfficerTab('ATTACHMENTS');
                    scrollToTop();
                  } }
                >
                  +{ rest.length }
                </span>
              )
              : null
          }
          <OutboundLink href={ url } className='test--attachment-image-href' target='_blank'>
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
};

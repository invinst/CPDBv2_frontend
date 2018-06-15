import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { wrapperStyle, thumbnailStyle, titleStyle } from './attachment-item.style';


class AttachmentItem extends Component {
  render() {
    const { url, previewImageUrl, title, fileType, hovering } = this.props;

    return (
      <a style={ wrapperStyle } href={ url } className='test--attachment-card'>
        <div style={ thumbnailStyle(fileType, previewImageUrl, hovering) } />
        <div style={ titleStyle(hovering) } className='test--attachment-card-title'>{ title }</div>
      </a>
    );
  }
}

AttachmentItem.propTypes = {
  url: PropTypes.string,
  previewImageUrl: PropTypes.string,
  title: PropTypes.string,
  fileType: PropTypes.string,
  hovering: PropTypes.bool
};

AttachmentItem.defaultProps = {
  fileType: 'audio'
};

export default Hoverable(AttachmentItem);

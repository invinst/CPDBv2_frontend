import React, { PropTypes, Component } from 'react';

import { wrapperStyle, thumbnailStyle, titleStyle } from './attachment-item.style';


export default class AttachmentItem extends Component {
  render() {
    const { url, previewImageUrl, title, fileType } = this.props;

    return (
      <a style={ wrapperStyle } href={ url } className='test--attachment-card'>
        <div style={ thumbnailStyle(fileType, previewImageUrl) } />
        <div style={ titleStyle } className='test--attachment-card-title'>{ title }</div>
      </a>
    );
  }
}

AttachmentItem.propTypes = {
  url: PropTypes.string,
  previewImageUrl: PropTypes.string,
  title: PropTypes.string,
  fileType: PropTypes.string
};

AttachmentItem.defaultProps = {
  fileType: 'audio'
};

import React, { PropTypes, Component } from 'react';

import { wrapperStyle, thumbnailStyle, titleStyle } from './attachment-item.style';


export default class AttachmentItem extends Component {
  render() {
    const { url, previewImageUrl, title } = this.props;

    return (
      <a style={ wrapperStyle } href={ url }>
        <div style={ thumbnailStyle(previewImageUrl) } />
        <div style={ titleStyle }>{ title }</div>
      </a>
    );
  }
}

AttachmentItem.propTypes = {
  url: PropTypes.string,
  previewImageUrl: PropTypes.string,
  title: PropTypes.string
};

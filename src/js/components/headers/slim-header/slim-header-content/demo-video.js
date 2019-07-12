import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './demo-video.sass';


class DemoVideo extends Component {
  constructor(props) {
    super(props);
    this.handleWatchVideoButtonClick = this.handleWatchVideoButtonClick.bind(this);
  }

  handleWatchVideoButtonClick(e) {
    e.stopPropagation();

    const { openVideoModal } = this.props;
    openVideoModal();
  }

  render() {
    const { position, videoThumbnailUrl } = this.props;
    return (
      <div className={ cx(styles.demoVideo, position) }>
        <div className='demo-video-text'>
          <span className='demo-video-text-upper'>WATCH:</span>
          <br/>
          <span className='demo-video-text-lower'>What is CPDP?</span>
        </div>
        <div className='demo-video-button' onClick={ this.handleWatchVideoButtonClick }>
          <img className='demo-video-thumbnail' src={ videoThumbnailUrl } />
          <img className='demo-video-play-button' src='/img/video-play-button.svg' width={ 32 } height={ 32 } />
        </div>
      </div>
    );
  }
}

DemoVideo.propTypes = {
  position: PropTypes.string,
  openVideoModal: PropTypes.func,
  videoThumbnailUrl: PropTypes.string,
};

export default DemoVideo;

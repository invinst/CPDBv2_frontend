import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './demo-video.sass';


class DemoVideo extends Component {
  render() {
    const { position } = this.props;
    return (
      <div className={ cx(styles.demoVideo, position) }>
        <div className='demo-video-text'>
          <span className='demo-video-text-upper'>WATCH:</span>
          <br/>
          <span className='demo-video-text-lower'>What is CPDP?</span>
        </div>
        <div className='demo-video-button' onClick={ this.handleWatchVideoButtonClick }>
          <img className='demo-video-play-button' width={ 32 } height={ 32 } src='/img/video-play-button.svg'/>
        </div>
      </div>
    );
  }
}

DemoVideo.propTypes = {
  position: PropTypes.string,
};

export default DemoVideo;

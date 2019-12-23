import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import styles from './demo-video.sass';


class DemoVideo extends Component {
  handleWatchVideoButtonClick = e => {
    e.stopPropagation();

    const { openVideoModal } = this.props;
    openVideoModal();
  };

  render() {
    const { position, editWrapperStateProps } = this.props;
    return (
      <div className={ cx(styles.demoVideo, position) }>
        <EditWrapperStateProvider { ...editWrapperStateProps }>
          <HoverableEditWrapper className='demo-video-text'>
            <RichTextEditable
              className='demo-video-text-input'
              placeholder='What is CPDP?'
              fieldname='demo_video_text'
            />
          </HoverableEditWrapper>
        </EditWrapperStateProvider>
        <div className='demo-video-button' onClick={ this.handleWatchVideoButtonClick }>
          <div className='demo-video-thumbnail'/>
          <img className='demo-video-play-button' src='/img/ic-play-big.svg' width={ 14 } height={ 17 } />
        </div>
      </div>
    );
  }
}

DemoVideo.propTypes = {
  position: PropTypes.string,
  openVideoModal: PropTypes.func,
  editWrapperStateProps: PropTypes.object,
};

export default DemoVideo;

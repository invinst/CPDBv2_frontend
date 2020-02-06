import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
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
          <img
            className='demo-video-thumbnail'
            srcSet={
              '/img/demo-video-thumbnail.png, ' +
              '/img/demo-video-thumbnail@2x.png 2x, ' +
              '/img/demo-video-thumbnail@3x.png 3x'
            }
          />
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

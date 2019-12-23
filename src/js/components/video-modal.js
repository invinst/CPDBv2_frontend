import React, { PropTypes } from 'react';
import ModalVideo from 'react-modal-video';

import { MODAL_VIDEO_INFO } from 'utils/constants';

export default function VideoModal(props) {
  const { closeVideoModal, isVideoModalActive } = props;
  return (
    <ModalVideo
      channel={ MODAL_VIDEO_INFO.CHANNEL }
      isOpen={ isVideoModalActive }
      videoId={ MODAL_VIDEO_INFO.VIDEO_ID }
      onClose={ closeVideoModal }
    />
  );
}

VideoModal.propTypes = {
  closeVideoModal: PropTypes.func,
  isVideoModalActive: PropTypes.bool,
};

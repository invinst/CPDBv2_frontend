import React from 'react';
import { spy } from 'sinon';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import ModalVideo from 'react-modal-video';

import VideoModal from 'components/video-modal';
import { unmountComponentSuppressError } from 'utils/test';

describe('VideoModal component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render ModalVideo with correct props', function () {
    const closeVideoModal = spy();

    instance = renderIntoDocument(
      <VideoModal
        closeVideoModal={ closeVideoModal }
        isVideoModalActive={ false }
      />
    );

    const modalVideo = findRenderedComponentWithType(instance, ModalVideo);
    modalVideo.props.channel.should.equal('vimeo');
    modalVideo.props.isOpen.should.be.false();
    modalVideo.props.videoId.should.equal('285002059');
    modalVideo.props.onClose.should.equal(closeVideoModal);

    instance = renderIntoDocument(
      <VideoModal
        closeVideoModal={ closeVideoModal }
        isVideoModalActive={ true }
      />
    );

    findRenderedComponentWithType(instance, ModalVideo).props.isOpen.should.be.true();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import ModalVideo from 'react-modal-video';

import VideoModal from 'components/video-modal';

describe('VideoModal component', function () {
  it('should render ModalVideo with correct props', function () {
    const closeVideoModal = spy();

    const wrapper = shallow(
      <VideoModal
        closeVideoModal={ closeVideoModal }
        isVideoModalActive={ false }
      />
    );

    const modalVideo = wrapper.find(ModalVideo);
    modalVideo.prop('channel').should.equal('vimeo');
    modalVideo.prop('isOpen').should.be.false();
    modalVideo.prop('videoId').should.equal('285002059');
    modalVideo.prop('onClose').should.equal(closeVideoModal);
    modalVideo.prop('vimeo').should.eql({ autoplay: true, texttrack: 'en' });

    wrapper.setProps({
      closeVideoModal,
      isVideoModalActive: true,
    });

    wrapper.find(ModalVideo).prop('isOpen').should.be.true();
  });
});

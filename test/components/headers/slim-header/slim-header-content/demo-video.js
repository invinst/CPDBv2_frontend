import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import DemoVideo from 'components/headers/slim-header/slim-header-content/demo-video';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';


describe('DemoVideo component', function () {
  it('should render correctly', function () {
    const openVideoModalStub = stub();
    const wrapper = shallow(
      <DemoVideo
        position='top'
        openVideoModal={ openVideoModalStub }
      />
    );

    wrapper.prop('className').should.containEql('top');
    const richTextEditable = wrapper.find(RichTextEditable);
    richTextEditable.prop('className').should.equal('demo-video-text-input');
    richTextEditable.prop('placeholder').should.equal('What is CPDP?');
    richTextEditable.prop('fieldname').should.equal('demo_video_text');
    const demoVideoThumbnail = wrapper.find('.demo-video-thumbnail');
    demoVideoThumbnail.exists().should.be.true();
    demoVideoThumbnail.prop('srcSet').should.eql(
      '/img/demo-video-thumbnail.png, /img/demo-video-thumbnail@2x.png 2x, /img/demo-video-thumbnail@3x.png 3x'
    );
  });

  it('should openVideoModal when clicking on video button', function () {
    const openVideoModalStub = stub();
    const stopPropagationStub = stub();
    const wrapper = shallow(
      <DemoVideo
        position='top'
        openVideoModal={ openVideoModalStub }
      />
    );
    const videoButton = wrapper.find('.demo-video-button');

    videoButton.simulate('click', { stopPropagation: stopPropagationStub });

    openVideoModalStub.should.be.calledOnce();
    stopPropagationStub.should.be.calledOnce();
  });
});

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
    wrapper.find('.demo-video-thumbnail').exists().should.be.true();
    wrapper.find('.demo-video-play-button').prop('src').should.equal('/img/ic-play-big.svg');
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

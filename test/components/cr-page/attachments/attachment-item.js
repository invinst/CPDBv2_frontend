import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import AttachmentItem from 'components/cr-page/attachments/attachment-item';
import * as tracking from 'utils/tracking';


describe('AttachmentItem component', function () {
  it('should track click event', function () {
    const stubTrackAttachmentClick = sinon.stub(tracking, 'trackAttachmentClick');
    const wrapper = shallow(
      <AttachmentItem
        url='https://www.documentcloud.org/documents/4769822-CRID-1002813-CR.html'
        pathname='/complaint/123456/'
      />
    );
    wrapper.find('.test--attachment-card').simulate('click');
    stubTrackAttachmentClick.should.be.calledWith(
      '/complaint/123456/',
      'https://www.documentcloud.org/documents/4769822-CRID-1002813-CR.html'
    );
  });

  it('should render audio background correctly', function () {
    const wrapper = shallow(
      <AttachmentItem fileType='audio' />
    );

    const thumbnail = wrapper.find('.attachment-card-thumbnail');
    thumbnail.prop('style').backgroundImage.should.containEql('ic-audio.svg');
  });

  it('should render video default background when preview image url is None', function () {
    const wrapper = shallow(
      <AttachmentItem fileType='video' />
    );

    const thumbnail = wrapper.find('.attachment-card-thumbnail');
    thumbnail.prop('style').backgroundImage.should.containEql('ic-video.svg');
  });

  it('should render video background correctly', function () {
    const wrapper = shallow(
      <AttachmentItem fileType='video' previewImageUrl='https://vimeo.com/123456'/>
    );

    const thumbnail = wrapper.find('.attachment-card-thumbnail');
    thumbnail.prop('style').backgroundImage.should.containEql('https://vimeo.com/123456');
  });

  it('should render document background correctly', function () {
    const wrapper = shallow(
      <AttachmentItem fileType='document' previewImageUrl='http://url/image'/>
    );

    const thumbnail = wrapper.find('.attachment-card-thumbnail');
    thumbnail.prop('style').backgroundImage.should.containEql('http://url/image');
  });

  it('should track attachment click event', function () {
    const stubOnTrackingAttachment = sinon.stub();
    const wrapper = shallow(
      <AttachmentItem
        onTrackingAttachment={ stubOnTrackingAttachment }
        id={ '123456' }
      />
    );
    wrapper.find('.test--attachment-card').simulate('click');
    stubOnTrackingAttachment.should.be.calledWith({
      attachmentId: '123456',
      sourcePage: 'CR Page',
      app: 'Frontend',
    });
  });
});

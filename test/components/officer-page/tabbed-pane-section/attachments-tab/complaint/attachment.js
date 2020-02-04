import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import OutboundLink from 'components/common/outbound-link';
import Attachment from 'components/officer-page/tabbed-pane-section/attachments-tab/complaint/attachment';


describe('Attachment component', function () {
  const attachment = {
    title: 'CRID 1071970 OCIR 2 of 3',
    url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html',
    previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
    fileType: 'document',
  };

  it('should render content correctly', function () {
    const wrapper = shallow(
      <Attachment attachment={ attachment } hovering={ false } />
    );

    const outboundLink = wrapper.find(OutboundLink);
    outboundLink.prop('href').should.equal(
      'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html'
    );
    outboundLink.prop('target').should.equal('_blank');

    const previewImage = wrapper.find('.attachment-preview-image');
    previewImage.prop('style').backgroundImage.should.eql(
      'url(https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif)'
    );

    const title = wrapper.find('.attachment-title');
    title.text().should.equal('CRID 1071970 OCIR 2 of 3');
  });

  it('should render preview image correctly', function () {
    const videoAttachment = {
      title: 'Video Clip',
      url: 'https://player.vimeo.com/video/165206078',
      previewImageUrl: '/src/img/ic-video.svg',
      fileType: 'video',
    };

    const wrapper = shallow(
      <Attachment attachment={ videoAttachment }/>
    );
    const previewImage = wrapper.find('.attachment-preview-image');
    previewImage.prop('style').backgroundImage.should.equal('url(/src/img/ic-video.svg)');
  });

  it('should track attachment click event', function () {
    const stubOnTrackingAttachment = sinon.stub();
    const attachment = {
      title: 'CRID 1071970 OCIR 2 of 3',
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
      fileType: 'document',
      id: '123456',
    };

    const wrapper = mount(
      <Attachment attachment={ attachment } onTrackingAttachment={ stubOnTrackingAttachment } />
    );
    wrapper.find('.attachment-preview-image').simulate('click');
    stubOnTrackingAttachment.should.be.calledWith({
      attachmentId: '123456',
      sourcePage: 'Officer Page - Attachments Tab',
      app: 'Frontend',
    });
  });
});

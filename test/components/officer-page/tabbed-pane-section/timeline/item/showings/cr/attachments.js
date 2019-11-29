import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import Attachments from 'components/officer-page/tabbed-pane-section/timeline/item/showings/cr/attachments';
import OutboundLink from 'components/common/outbound-link';
import * as domUtils from 'utils/dom';
import * as GATracking from 'utils/google_analytics_tracking';
import styles from 'components/officer-page/tabbed-pane-section/timeline/item/showings/cr/attachments.sass';


describe('Attachments component', function () {
  const attachments = [{
    url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.html',
    previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
    fileType: 'document',
  }, {
    url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-2-of-3.html',
    previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif',
    fileType: 'document',
  }, {
    url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html',
    previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p3-normal.gif',
    fileType: 'document',
  }];

  it('should render attachments correctly', function () {
    const wrapper = shallow(<Attachments attachments={ attachments } />);

    const moreAttachment = wrapper.find('.more-attachment');
    const attachmentImage = wrapper.find('.attachment-image');
    const attachmentImageHref = wrapper.find('.attachment-image-href');
    const outboundLink = wrapper.find(OutboundLink);

    moreAttachment.text().should.equal('+2');
    attachmentImage.prop('style').backgroundImage.should.eql(
      'url(https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif)'
    );
    attachmentImageHref.prop('href').should.eql(
      'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.html'
    );
    outboundLink.prop('href').should.equal(
      'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.html'
    );
    outboundLink.prop('target').should.equal('_blank');
  });

  it('should render file types of attachments correctly', function () {
    const videoAttachments = [{
      url: 'https://player.vimeo.com/video/165206078',
      previewImageUrl: '/src/img/ic-video.svg',
      fileType: 'video',
    }];
    const wrapper = shallow(<Attachments attachments={ videoAttachments } />);

    const attachmentImage = wrapper.find('.attachment-image');
    attachmentImage.prop('style').backgroundImage.should.equal('url(/src/img/ic-video.svg)');
  });

  it('should call changeOfficerTab and scrollToElement', function () {
    const stubChangeOfficerTab = stub();
    const stubScrollToElement = stub(domUtils, 'scrollToElement');

    const wrapper = shallow(
      <Attachments attachments={ attachments } changeOfficerTab={ stubChangeOfficerTab } />
    );
    const moreAttachmentEl = wrapper.find('.more-attachment');
    moreAttachmentEl.simulate('click', { preventDefault: () => {}, stopPropagation: () => {} });

    stubChangeOfficerTab.should.be.calledWith('DOCUMENTS');
    stubScrollToElement.should.be.calledWith('.tabbed-pane-section', true, -40);

    stubScrollToElement.restore();
  });

  it('should track click event', function () {
    const stubTrackAttachmentClick = stub(GATracking, 'trackAttachmentClick');
    const attachments = [{
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-2-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif',
      fileType: 'document',
    }];
    const wrapper = shallow(
      <Attachments
        attachments={ attachments }
        pathname='/complaint/123456/'
      />
    );
    wrapper.find('.attachment-image-href').simulate('click');
    stubTrackAttachmentClick.should.be.calledWith(
      '/complaint/123456/',
      'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-2-of-3.html'
    );
    stubTrackAttachmentClick.restore();
  });

  it('should render an empty span when attachments is empty', function () {
    const wrapper = shallow(<Attachments attachments={ [] }/>);
    wrapper.find(`.${styles.attachments}`).should.have.length(1);
  });

  it('should track attachment click event', function () {
    const stubOnTrackingAttachment = stub();
    const attachment = [{
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
      fileType: 'document',
      id: '123456',
    }];

    const wrapper = shallow(
      <Attachments
        attachments={ attachment }
        onTrackingAttachment={ stubOnTrackingAttachment }
      />
    );
    wrapper.find('.attachment-image-href').simulate('click');
    stubOnTrackingAttachment.should.be.calledWith({
      attachmentId: '123456',
      sourcePage: 'Officer Page - Timeline Tab',
      app: 'Frontend',
    });
  });
});

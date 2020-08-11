import React from 'react';
import { shallow } from 'enzyme';

import Lawsuit from 'components/officer-page/tabbed-pane-section/attachments-tab/lawsuit';
import Heading from 'components/officer-page/tabbed-pane-section/attachments-tab/lawsuit/heading';
import Attachment from 'components/officer-page/tabbed-pane-section/attachments-tab/attachment';


describe('Lawsuit component', function () {
  const attachment0 = {
    title: 'CRID 1071970 OCIR 2 of 3',
    url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-2-of-3.html',
    previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
    fileType: 'document',
  };
  const attachment1 = {
    title: 'Video Clip',
    url: 'https://player.vimeo.com/video/165206078',
    previewImageUrl: '/src/img/ic-video.svg',
    fileType: 'video',
  };
  const lawsuit = {
    caseNo: 'LL-540-10',
    kind: 'LAWSUIT',
    primaryCause: 'Excessive force',
    date: 'MAR 1',
    coaccused: 4,
    attachments: [attachment0, attachment1],
  };

  it('should render Heading and AttachmentsTab', function () {
    const wrapper = shallow(
      <Lawsuit lawsuit={ lawsuit } pathname='/lawsuit/307775/'/>
    );

    const heading = wrapper.find(Heading);
    heading.prop('lawsuit').should.eql(lawsuit);

    const attachments = wrapper.find(Attachment);
    attachments.should.have.length(2);
    attachments.at(0).prop('attachment').should.eql(attachment0);
    attachments.at(0).prop('pathname').should.eql('/lawsuit/307775/');
    attachments.at(1).prop('attachment').should.eql(attachment1);
    attachments.at(1).prop('pathname').should.eql('/lawsuit/307775/');
  });
});

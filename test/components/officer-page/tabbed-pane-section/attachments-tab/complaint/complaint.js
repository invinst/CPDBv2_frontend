import React from 'react';
import { shallow } from 'enzyme';

import Complaint from 'components/officer-page/tabbed-pane-section/attachments-tab/complaint';
import Heading from 'components/officer-page/tabbed-pane-section/attachments-tab/complaint/heading';
import Attachment from 'components/officer-page/tabbed-pane-section/attachments-tab/complaint/attachment';


describe('Complaint component', function () {
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
  const complaint = {
    crid: '307775',
    officerId: '12074',
    category: 'Use Of Force',
    finding: 'Not Sustained',
    outcome: 'No Action Taken',
    date: 'MAR 1',
    coaccused: 4,
    attachments: [attachment0, attachment1],
  };

  it('should render Heading and AttachmentsTab', function () {
    const wrapper = shallow(
      <Complaint complaint={ complaint } />
    );

    const heading = wrapper.find(Heading);
    heading.prop('complaint').should.eql(complaint);

    const attachments = wrapper.find(Attachment);
    attachments.should.have.length(2);
    attachments.at(0).prop('attachment').should.eql(attachment0);
    attachments.at(1).prop('attachment').should.eql(attachment1);
  });
});

import React from 'react';
import { stub } from 'sinon';

import AttachmentsTab from 'components/officer-page/tabbed-pane-section/attachments-tab';
import Complaint from 'components/officer-page/tabbed-pane-section/attachments-tab/complaint';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';


describe('AttachmentsTab component', function () {
  let instance;
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
  const complaint0 = {
    crid: '307775',
    officerId: '12074',
    category: 'Use Of Force',
    finding: 'Not Sustained',
    outcome: 'No Action Taken',
    date: 'MAR 1',
    coaccused: 4,
    attachments: [attachment0, attachment1],
  };
  const complaint1 = {
    crid: '307776',
    officerId: '12074',
    category: 'Use Of Force',
    finding: 'Sustained',
    outcome: 'No Action Taken',
    date: 'MAR 2',
    coaccused: 2,
    attachments: [attachment0],
  };
  const complaints = [complaint0, complaint1];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Complaints', function () {
    const stubOpenComplaintPage = stub();
    instance = renderIntoDocument(
      <AttachmentsTab complaints={ complaints } openComplaintPage={ stubOpenComplaintPage }/>,
    );

    const complaintComponents = scryRenderedComponentsWithType(instance, Complaint);
    complaintComponents.should.have.length(2);

    const complaintComponent0 = complaintComponents[0];
    complaintComponent0.props.complaint.should.eql(complaint0);
    complaintComponent0.props.openComplaintPage.should.eql(stubOpenComplaintPage);

    const complaintComponent1 = complaintComponents[1];
    complaintComponent1.props.complaint.should.eql(complaint1);
    complaintComponent1.props.openComplaintPage.should.eql(stubOpenComplaintPage);
  });
});

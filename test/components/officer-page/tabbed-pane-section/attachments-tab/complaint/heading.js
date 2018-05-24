import React from 'react';

import Heading from 'components/officer-page/tabbed-pane-section/attachments-tab/complaint/heading';
import {
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  Simulate,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { stub } from 'sinon';


describe('Heading component', function () {
  let instance;
  const complaint = {
    crid: 307775,
    officerId: 12074,
    category: 'Use Of Force',
    finding: 'Not Sustained',
    outcome: 'No Action Taken',
    date: 'MAR 1',
    coaccused: 4,
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render with correct content', function () {
    instance = renderIntoDocument(
      <Heading complaint={ complaint } hovering={ false }/>,
    );

    const complaintCategory = findRenderedDOMComponentWithClass(instance, 'test--attachments-heading-category');
    complaintCategory.textContent.should.eql('Use Of Force');
    complaintCategory.style.color.should.eql('rgb(35, 31, 32)');

    const complaintFinding = findRenderedDOMComponentWithClass(instance, 'test--attachments-heading-finding');
    complaintFinding.textContent.should.eql('Not Sustained, No Action Taken');

    const complaintCoaccused = findRenderedDOMComponentWithClass(instance, 'test--attachments-heading-coaccused');
    complaintCoaccused.textContent.should.eql('1 of 4 coaccused');

    const complaintDate = findRenderedDOMComponentWithClass(instance, 'test--attachments-heading-date');
    complaintDate.textContent.should.eql('MAR 1');

    const attachments = findRenderedDOMComponentWithClass(instance, 'test--attachments-heading');
    attachments.style.backgroundColor.should.eql('inherit');

    const complaintKind = findRenderedDOMComponentWithClass(instance, 'test--attachments-heading-kind');
    complaintKind.style.color.should.eql('rgb(255, 96, 0)');
    complaintKind.style.backgroundColor.should.eql('inherit');
  });

  it('should change style when hovered', function () {
    instance = renderIntoDocument(
      <Heading complaint={ complaint } hovering={ true }/>,
    );

    const attachments = findRenderedDOMComponentWithClass(instance, 'test--attachments-heading');
    attachments.style.backgroundColor.should.eql('white');

    const complaintCategory = findRenderedDOMComponentWithClass(instance, 'test--attachments-heading-category');
    complaintCategory.style.color.should.eql('rgb(0, 94, 244)');
  });

  it('should change kind style when "Sustained"', function () {
    const complaint = {
      crid: '307775',
      officerId: '12074',
      category: 'Use Of Force',
      finding: 'Sustained',
      outcome: 'No Action Taken',
      date: 'MAR 1',
      coaccused: 4,
    };
    instance = renderIntoDocument(
      <Heading complaint={ complaint }/>,
    );

    const complaintKind = findRenderedDOMComponentWithClass(instance, 'test--attachments-heading-kind');
    complaintKind.style.color.should.eql('rgb(255, 31, 0)');
    complaintKind.style.backgroundColor.should.eql('rgb(251, 226, 212)');
  });

  it('should open complaint page when clicked', function () {
    const stubOpenComplaintPage = stub();
    instance = renderIntoDocument(
      <Heading complaint={ complaint } openComplaintPage={ stubOpenComplaintPage }/>,
    );

    const heading = findRenderedDOMComponentWithClass(instance, 'test--attachments-heading');
    Simulate.click(heading);
    stubOpenComplaintPage.should.be.calledWith({ crid: 307775, officerId: 12074 });
  });
});

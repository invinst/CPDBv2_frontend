import React from 'react';
import { Link } from 'react-router';

import Heading from 'components/officer-page/tabbed-pane-section/attachments-tab/complaint/heading';
import {
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';


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

    const complaintCategory = findRenderedDOMComponentWithClass(instance, 'attachments-heading-category');
    complaintCategory.textContent.should.eql('Use Of Force');

    const complaintFinding = findRenderedDOMComponentWithClass(instance, 'attachments-heading-finding');
    complaintFinding.textContent.should.eql('Not Sustained, No Action Taken');

    const complaintCoaccused = findRenderedDOMComponentWithClass(instance, 'attachments-heading-coaccused');
    complaintCoaccused.textContent.should.eql('1 of 4 coaccused');

    const complaintDate = findRenderedDOMComponentWithClass(instance, 'attachments-heading-date');
    complaintDate.textContent.should.eql('MAR 1');

    const link = findRenderedComponentWithType(instance, Link);
    link.props.to.should.eql('/complaint/307775/');
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import Heading from 'components/officer-page/tabbed-pane-section/attachments-tab/complaint/heading';


describe('Complaint heading component', function () {
  const complaint = {
    crid: 307775,
    officerId: 12074,
    category: 'Use Of Force',
    finding: 'Not Sustained',
    outcome: 'No Action Taken',
    date: 'MAR 1',
    coaccused: 4,
  };

  it('should render with correct content', function () {
    const wrapper = shallow(
      <Heading complaint={ complaint } hovering={ false }/>,
    );

    const complaintCategory = wrapper.find('.attachments-heading-category');
    complaintCategory.text().should.equal('Use Of Force');

    const complaintFinding = wrapper.find('.attachments-heading-finding');
    complaintFinding.text().should.equal('Not Sustained, No Action Taken');

    const complaintCoaccused = wrapper.find('.attachments-heading-coaccused');
    complaintCoaccused.text().should.equal('1 of 4 coaccused');

    const complaintDate = wrapper.find('.attachments-heading-date');
    complaintDate.text().should.equal('MAR 1');

    const link = wrapper.find(Link);
    link.prop('to').should.equal('/complaint/307775/');
  });
});

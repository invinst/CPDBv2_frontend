import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import Heading from 'components/officer-page/tabbed-pane-section/attachments-tab/lawsuit/heading';


describe('Lawsuit heading component', function () {
  const lawsuit = {
    caseNo: 'LL-540-10',
    kind: 'LAWSUIT',
    misconduct: 'Excessive force',
    outcome: 'killed by officer',
    date: 'MAR 1',
    coaccused: 4,
  };

  it('should render with correct content', function () {
    const wrapper = shallow(
      <Heading lawsuit={ lawsuit } hovering={ false }/>,
    );

    const lawsuitMisconduct = wrapper.find('.attachments-heading-misconduct');
    lawsuitMisconduct.text().should.equal('Excessive force');

    const lawsuitOutcome = wrapper.find('.attachments-heading-outcome');
    lawsuitOutcome.text().should.equal('killed by officer');

    const lawsuitDate = wrapper.find('.attachments-heading-date');
    lawsuitDate.text().should.equal('MAR 1');

    const link = wrapper.find(Link);
    link.prop('to').should.equal('/lawsuit/LL-540-10/');
  });
});

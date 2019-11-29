import React from 'react';
import { shallow, mount } from 'enzyme';

import Item from 'components/officer-page/tabbed-pane-section/timeline/item';
import Year from 'components/officer-page/tabbed-pane-section/timeline/item/showings/year';
import CR from 'components/officer-page/tabbed-pane-section/timeline/item/showings/cr';
import TRR from 'components/officer-page/tabbed-pane-section/timeline/item/showings/trr';
import Award from 'components/officer-page/tabbed-pane-section/timeline/item/showings/award';
import UnitChange from 'components/officer-page/tabbed-pane-section/timeline/item/showings/unit-change';
import Joined from 'components/officer-page/tabbed-pane-section/timeline/item/showings/joined';
import Empty from 'components/officer-page/tabbed-pane-section/timeline/item/showings/empty';


describe('Item component', function () {
  it('should render item with correct kind', function () {
    const year = {
      date: '1994',
      hasData: true,
      kind: 'YEAR',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: 'Unit 153',
    };
    const wrapper = shallow(<Item item={ year }/>);
    wrapper.find(Year).exists().should.be.true();
  });

  it('should not render item with incorrect kind', function () {
    const components = [CR, TRR, Award, UnitChange, Joined, Year, Empty];
    const someItem = {
      kind: 'SOMEKIND',
    };
    const wrapper = mount(<Item item={ someItem }/>);
    components.map(component => {
      wrapper.find(component).exists().should.be.false();
    });
  });

  it('should render item correctly', function () {
    const item = {
      date: 'Jan 01',
      kind: 'AWARD',
      unitName: 'Unit 001',
      rank: 'Police Officer',
      isAfterRankChange: true,
      isAfterUnitChange: true,
    };

    const wrapper = shallow(<Item item={ item }/>);

    const rank = wrapper.find('.rank-change-content');
    const unit = wrapper.find('.unit-change-content');

    rank.text().should.equal('Police Officer');
    unit.text().should.equal('Unit 001');
  });
});

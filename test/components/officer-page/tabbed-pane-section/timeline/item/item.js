import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Item from 'components/officer-page/tabbed-pane-section/timeline/item';
import Year from 'components/officer-page/tabbed-pane-section/timeline/item/showings/year';
import CR from 'components/officer-page/tabbed-pane-section/timeline/item/showings/cr';
import TRR from 'components/officer-page/tabbed-pane-section/timeline/item/showings/trr';
import Award from 'components/officer-page/tabbed-pane-section/timeline/item/showings/award';
import UnitChange from 'components/officer-page/tabbed-pane-section/timeline/item/showings/unit-change';
import Joined from 'components/officer-page/tabbed-pane-section/timeline/item/showings/joined';
import Empty from 'components/officer-page/tabbed-pane-section/timeline/item/showings/empty';


describe('Item component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render item with correct kind', function () {
    const year = {
      date: '1994',
      hasData: true,
      kind: 'YEAR',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: 'Unit 153',
    };
    instance = renderIntoDocument(<Item item={ year }/>);
    findRenderedComponentWithType(instance, Year);
  });

  it('should not render item with incorrect kind', function () {
    const components = [CR, TRR, Award, UnitChange, Joined, Year, Empty];
    const someItem = {
      kind: 'SOMEKIND',
    };
    instance = renderIntoDocument(<Item item={ someItem }/>);
    components.map(component => {
      scryRenderedComponentsWithType(instance, component).should.have.length(0);
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

    instance = renderIntoDocument(<Item item={ item }/>);

    const rank = findRenderedDOMComponentWithClass(instance, 'rank-change-content');
    const unit = findRenderedDOMComponentWithClass(instance, 'unit-change-content');

    rank.textContent.should.eql('Police Officer');
    unit.textContent.should.eql('Unit 001');
  });
});

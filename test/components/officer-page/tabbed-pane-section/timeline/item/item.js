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
      isLastUnit: true,
      kind: 'YEAR',
      rank: 'Police Officer',
      rankDisplay: ' ',
      unitDescription: 'Mobile Strike Force',
      unitDisplay: ' ',
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
      unitDisplay: '001 Display',
      rank: 'Police Officer',
      rankDisplay: 'Police Officer Display',
      isFirstRank: true,
      isLastRank: false,
      isFirstUnit: true,
      isLastUnit: false,
    };

    instance = renderIntoDocument(<Item item={ item }/>);

    const rank = findRenderedDOMComponentWithClass(instance, 'test--item-rank');
    const unit = findRenderedDOMComponentWithClass(instance, 'test--item-unit');

    rank.textContent.should.eql('Police Officer Display');
    unit.textContent.should.eql('001 Display');
  });

  it('should render unit name as a space if it is the first event in that unit duration ' +
    'and unitDisplay is an empty string', function () {
    const item = {
      date: 'Jan 01',
      kind: 'AWARD',
      unitName: '001',
      unitDisplay: '',
      rank: 'Police Officer',
      rankDisplay: 'Police Officer Display',
      isFirstRank: false,
      isLastRank: false,
      isFirstUnit: true,
      isLastUnit: false,
    };

    instance = renderIntoDocument(<Item item={ item }/>);

    findRenderedDOMComponentWithClass(instance, 'test--item-unit').textContent.should.eql(' ');
  });
});

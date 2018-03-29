import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';

import Item from 'components/officer-page/summary-page/biography-section/timeline/item';
import YearItem from 'components/officer-page/summary-page/biography-section/timeline/year-item';
import CRItem from 'components/officer-page/summary-page/biography-section/timeline/cr-item';
import TRRItem from 'components/officer-page/summary-page/biography-section/timeline/trr-item';
import AwardItem from 'components/officer-page/summary-page/biography-section/timeline/award-item';
import UnitChangeItem from 'components/officer-page/summary-page/biography-section/timeline/unit-change-item';
import JoinedItem from 'components/officer-page/summary-page/biography-section/timeline/joined-item';
import EmptyItem from 'components/officer-page/summary-page/biography-section/timeline/empty-item';


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
      unitName: '153',
    };
    instance = renderIntoDocument(<Item item={ year }/>);
    findRenderedComponentWithType(instance, YearItem);
  });

  it('should not render item with incorrect kind', function () {
    const components = [CRItem, TRRItem, AwardItem, UnitChangeItem, JoinedItem, YearItem, EmptyItem];
    const someItem = {
      kind: 'SOMEKIND',
    };
    instance = renderIntoDocument(<Item item={ someItem }/>);
    components.map(component => {
      scryRenderedComponentsWithType(instance, component).should.have.length(0);
    });
  });
});

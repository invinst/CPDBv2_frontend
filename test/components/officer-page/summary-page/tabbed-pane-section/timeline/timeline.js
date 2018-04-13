import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import Timeline from 'components/officer-page/summary-page/tabbed-pane-section/timeline';
import Item from 'components/officer-page/summary-page/tabbed-pane-section/timeline/item';
import Dropdown from 'components/common/dropdown';


describe('Timeline component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render headers correctly', function () {
    instance = renderIntoDocument(<Timeline />);
    const header = findRenderedDOMComponentWithClass(instance, 'test--timeline-header');
    header.textContent.should.eql('RANKUNITSHOWINGALL EVENTSDATE');
  });

  it('should render items with correct borders', function () {
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
    const cr = {
      attachments: [],
      category: 'Illegal Search',
      coaccused: 8,
      crid: '267098',
      date: 'NOV 8',
      finding: 'Not Sustained',
      isFirstRank: false,
      isFirstUnit: false,
      isLastRank: false,
      isLastUnit: false,
      kind: 'CR',
      outcome: 'No Action Taken',
      rank: 'Police Officer',
      rankDisplay: ' ',
      unitDescription: 'Mobile Strike Force',
      unitDisplay: ' ',
      unitName: '153',
      year: 2000,
    };
    const joined = {
      date: 'DEC 5',
      isFirstRank: false,
      isFirstUnit: false,
      isLastRank: true,
      isLastUnit: true,
      kind: 'JOINED',
      rank: 'Police Officer',
      rankDisplay: ' ',
      unitDescription: 'Recruit Training Section',
      unitDisplay: ' ',
      unitName: '044',
      year: 1988,
    };
    const unitChange = {
      date: 'APR 28',
      isFirstRank: false,
      isFirstUnit: false,
      isLastRank: false,
      isLastUnit: false,
      kind: 'UNIT_CHANGE',
      oldUnitDescription: 'Airport Law Enforcement Section - South',
      oldUnitName: '051',
      rank: 'Police Officer',
      rankDisplay: ' ',
      unitDescription: 'Mobile Strike Force',
      unitDisplay: ' ',
      unitName: '153',
      year: 1994,
    };
    instance = renderIntoDocument(<Timeline items={ [cr, year, unitChange, year, joined] }/>);
    const items = scryRenderedComponentsWithType(instance, Item);
    items[0].props.hasBorderBottom.should.be.true();
    items[1].props.hasBorderBottom.should.be.false();
    items[2].props.hasBorderBottom.should.be.false();
    items[3].props.hasBorderBottom.should.be.false();
    items[4].props.hasBorderBottom.should.be.false();
  });

  it('should render dropdown with correct props', function () {
    const changeFilterStub = stub();
    instance = renderIntoDocument(
      <Timeline
        changeFilter={ changeFilterStub }
      />
    );
    const dropdown = findRenderedComponentWithType(instance, Dropdown);
    dropdown.props.defaultValue.should.eql('ALL EVENTS');
    dropdown.props.onChange.should.eql(changeFilterStub);
    dropdown.props.options.should.eql(['ALL EVENTS', 'COMPLAINTS', 'USE OF FORCE', 'AWARDS']);
  });
});

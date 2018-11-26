import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import Timeline from 'components/officer-page/tabbed-pane-section/timeline';
import Item from 'components/officer-page/tabbed-pane-section/timeline/item';
import Dropdown from 'components/common/dropdown';
import Popup from 'components/common/popup';


describe('Timeline component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render headers correctly', function () {
    instance = renderIntoDocument(<Timeline />);
    findRenderedDOMComponentWithClass(instance, 'test--timeline-header');
    const cols = scryRenderedDOMComponentsWithClass(instance, 'test--timeline-header-col');

    cols.should.have.length(4);
    cols[0].textContent.should.containEql('RANK');
    cols[1].textContent.should.containEql('UNIT');
    cols[2].textContent.should.containEql('SHOWING');
    cols[2].textContent.should.containEql('ALL');
    cols[3].textContent.should.containEql('DATE');
  });

  it('should render rank and unit popups', function () {
    const popup = {
      'rank': {
        title: 'Rank',
        text: 'Some rank explanation',
      },
      'unit': {
        title: 'Unit',
        text: 'Some unit explanation',
      },
    };

    instance = renderIntoDocument(<Timeline popup={ popup } pathname='/officer/8562/jerome-finnigan/'/>);
    const timelinePopup = scryRenderedComponentsWithType(instance, Popup);
    timelinePopup[0].props.title.should.eql('Rank');
    timelinePopup[0].props.text.should.eql('Some rank explanation');
    timelinePopup[0].props.url.should.eql('/officer/8562/jerome-finnigan/');
    timelinePopup[1].props.title.should.eql('Unit');
    timelinePopup[1].props.text.should.eql('Some unit explanation');
    timelinePopup[1].props.url.should.eql('/officer/8562/jerome-finnigan/');
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

  it('should render dropdown with correct order', function () {
    instance = renderIntoDocument(
      <Timeline />
    );
    const dropdown = findRenderedComponentWithType(instance, Dropdown);
    dropdown.props.defaultValue.should.eql('ALL');
    dropdown.props.options.should.eql([
      'ALL', 'COMPLAINTS', 'SUSTAINED', 'USE OF FORCE', 'AWARDS', 'RANK/UNIT CHANGES'
    ]);
  });

  it('should call changeFilter when clicking dropdown items', function () {
    const changeFilterStub = stub();
    instance = renderIntoDocument(
      <Timeline
        changeFilter={ changeFilterStub }
      />
    );

    const dropdownButton = findRenderedDOMComponentWithClass(instance, 'test--dropdown-button');
    Simulate.click(dropdownButton);
    const options = scryRenderedDOMComponentsWithClass(instance, 'test--dropdown-menu-item');
    Simulate.click(options[0]);

    changeFilterStub.calledWith({
      label: 'COMPLAINTS',
      kind: ['CR'],
    }).should.be.true();
  });
});

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
import Dropdown from 'components/common/dropdown';
import Popup from 'components/common/popup';
import Item from 'components/officer-page/tabbed-pane-section/timeline/item';


describe('Timeline component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render headers correctly', function () {
    instance = renderIntoDocument(<Timeline />);
    findRenderedDOMComponentWithClass(instance, 'rank-header').textContent.should.containEql('RANK');
    findRenderedDOMComponentWithClass(instance, 'unit-header').textContent.should.containEql('UNIT');
    const contentHeader = findRenderedDOMComponentWithClass(instance, 'showing-content-header');
    contentHeader.textContent.should.containEql('SHOWING');
    contentHeader.textContent.should.containEql('ALL');
    findRenderedDOMComponentWithClass(instance, 'date-header').textContent.should.containEql('DATE');
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

  it('should render dropdown with correct order', function () {
    instance = renderIntoDocument(
      <Timeline />
    );
    const dropdown = findRenderedComponentWithType(instance, Dropdown);
    dropdown.props.defaultValue.should.eql('ALL');
    dropdown.props.options.should.eql([
      'ALL', 'COMPLAINTS', 'SUSTAINED', 'USE OF FORCE', 'AWARDS', 'RANK/UNIT CHANGES',
    ]);
  });

  it('should call changeFilter when clicking dropdown items', function () {
    const changeFilterStub = stub();
    instance = renderIntoDocument(
      <Timeline
        changeFilter={ changeFilterStub }
      />
    );

    const dropdownButton = findRenderedDOMComponentWithClass(instance, 'dropdown-button');
    Simulate.click(dropdownButton);
    const options = scryRenderedDOMComponentsWithClass(instance, 'dropdown-menu-item');
    Simulate.click(options[0]);

    changeFilterStub.calledWith({
      label: 'COMPLAINTS',
      kind: ['CR'],
    }).should.be.true();
  });

  it('should render items correctly', function () {
    const items = [
      {
        date: '1988-12-05',
        kind: 'JOINED',
        rank: 'Police Officer',
        'unit_description': 'Recruit Training Section',
        'unit_name': '044',
      },
      {
        date: 'Jan 01',
        kind: 'AWARD',
        unitName: 'Unit 001',
        unitDescription: 'Mobile Strike Force',
        rank: 'Police Officer',
        isAfterRankChange: true,
        isAfterUnitChange: true,
      },
      {
        date: '1994',
        hasData: true,
        kind: 'YEAR',
        rank: 'Police Officer',
        unitDescription: 'Mobile Strike Force',
        unitName: 'Unit 153',
      },
    ];
    instance = renderIntoDocument(<Timeline items={ items } />);
    scryRenderedComponentsWithType(instance, Item).should.have.length(3);
  });
});

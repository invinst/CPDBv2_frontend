import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Timeline from 'components/officer-page/tabbed-pane-section/timeline';
import Dropdown from 'components/common/dropdown';
import Popup from 'components/common/popup';
import Item from 'components/officer-page/tabbed-pane-section/timeline/item';
import { NEW_TIMELINE_FILTERS } from 'utils/constants';


describe('Timeline component', function () {
  it('should render headers correctly', function () {
    const wrapper = shallow(<Timeline selectedFilter={ NEW_TIMELINE_FILTERS.ALL }/>);
    wrapper.find('.rank-header').text().should.containEql('RANK');
    wrapper.find('.unit-header').text().should.containEql('UNIT');
    const contentHeader = wrapper.find('.showing-content-header');
    contentHeader.find('.showing-text').text().should.containEql('SHOWING');
    contentHeader.find(Dropdown).dive().text().should.containEql('All');
    wrapper.find('.date-header').text().should.containEql('DATE');
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

    const wrapper = shallow(<Timeline popup={ popup } pathname='/officer/8562/jerome-finnigan/'/>);
    const timelinePopup = wrapper.find(Popup);
    timelinePopup.at(0).prop('title').should.equal('Rank');
    timelinePopup.at(0).prop('text').should.equal('Some rank explanation');
    timelinePopup.at(0).prop('url').should.equal('/officer/8562/jerome-finnigan/');
    timelinePopup.at(1).prop('title').should.equal('Unit');
    timelinePopup.at(1).prop('text').should.equal('Some unit explanation');
    timelinePopup.at(1).prop('url').should.equal('/officer/8562/jerome-finnigan/');
  });

  it('should render dropdown with correct order', function () {
    const wrapper = shallow(
      <Timeline selectedFilter={ NEW_TIMELINE_FILTERS.ALL }/>
    );
    const dropdown = wrapper.find(Dropdown);
    dropdown.prop('defaultValue').should.equal('All');
    dropdown.prop('options').should.eql([
      'All', 'Complaints', 'Sustained', 'Use Of Force', 'Awards', 'Rank/Unit Changes',
    ]);
  });

  it('should call changeFilter when clicking dropdown items', function () {
    const changeFilterStub = sinon.stub();
    const wrapper = mount(
      <Timeline
        selectedFilter={ NEW_TIMELINE_FILTERS.ALL }
        changeFilter={ changeFilterStub }
      />
    );

    const dropdownButton = wrapper.find('.dropdown-button');
    dropdownButton.simulate('click');
    const options = wrapper.find('.dropdown-menu-item');
    options.at(0).simulate('click');

    changeFilterStub.should.be.calledWith({
      label: 'Complaints',
      kind: ['CR'],
    });
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
    const wrapper = shallow(<Timeline items={ items } />);
    wrapper.find(Item).should.have.length(3);
  });
});

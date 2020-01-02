import React from 'react';
import { shallow } from 'enzyme';

import Joined from 'components/officer-page/tabbed-pane-section/timeline/item/showings/joined';


describe('Joined component', function () {
  it('should render item correctly', function () {
    const joinedItem = {
      date: 'DEC 5',
      isFirstRank: false,
      isFirstUnit: false,
      isLastRank: true,
      isLastUnit: true,
      kind: 'JOINED',
      rank: 'Police Officer',
      unitDescription: 'Recruit Training Section',
      unitName: 'Unit 044',
      year: 1988,
    };

    const wrapper = shallow(<Joined item={ joinedItem } hasBorderBottom={ false } />);

    const join = wrapper.find('.joined-item-join');
    const date = wrapper.find('.joined-item-date');

    join.text().should.equal('Joined Chicago Police Department with Unit 044 as a Police Officer');
    date.text().should.equal('DEC 5');
  });

  it('should show correct content if unit name is Unassigned', function () {
    const joinedItem = {
      date: 'DEC 5',
      isFirstRank: false,
      isFirstUnit: false,
      isLastRank: true,
      isLastUnit: true,
      kind: 'JOINED',
      rank: 'Police Officer',
      unitDescription: 'Some description',
      unitName: 'Unassigned',
      year: 1988,
    };

    const wrapper = shallow(<Joined item={ joinedItem } hasBorderBottom={ false } />);

    const join = wrapper.find('.joined-item-join');
    const date = wrapper.find('.joined-item-date');

    join.text().should.equal('Joined Chicago Police Department as a Police Officer');
    date.text().should.equal('DEC 5');
  });

  it('should show correct content if there is no rank', function () {
    const joinedItem = {
      date: 'DEC 5',
      isFirstRank: false,
      isFirstUnit: false,
      isLastRank: true,
      isLastUnit: true,
      kind: 'JOINED',
      unitDescription: 'Some description',
      unitName: 'Unassigned',
      rank: 'Unknown',
      year: 1988,
    };
    const wrapper = shallow(<Joined item={ joinedItem } hasBorderBottom={ false } />);
    const join = wrapper.find('.joined-item-join');
    join.text().should.equal('Joined Chicago Police Department');
  });
});

import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Joined from 'components/officer-page/tabbed-pane-section/timeline/item/showings/joined';


describe('Joined component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


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

    instance = renderIntoDocument(<Joined item={ joinedItem } hasBorderBottom={ false } />);

    const join = findRenderedDOMComponentWithClass(instance, 'joined-item-join');
    const date = findRenderedDOMComponentWithClass(instance, 'joined-item-date');

    join.textContent.should.eql('Joined Chicago Police Department with Unit 044 as a Police Officer');
    date.textContent.should.eql('DEC 5');
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

    instance = renderIntoDocument(<Joined item={ joinedItem } hasBorderBottom={ false } />);

    const join = findRenderedDOMComponentWithClass(instance, 'joined-item-join');
    const date = findRenderedDOMComponentWithClass(instance, 'joined-item-date');

    join.textContent.should.eql('Joined Chicago Police Department as a Police Officer');
    date.textContent.should.eql('DEC 5');
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
    instance = renderIntoDocument(<Joined item={ joinedItem } hasBorderBottom={ false } />);
    const join = findRenderedDOMComponentWithClass(instance, 'joined-item-join');
    join.textContent.should.eql('Joined Chicago Police Department');
  });
});

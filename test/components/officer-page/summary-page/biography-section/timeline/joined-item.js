import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import JoinedItem from 'components/officer-page/summary-page/biography-section/timeline/joined-item';


describe('JoinedItem component', function () {
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
      rankDisplay: ' ',
      unitDescription: 'Recruit Training Section',
      unitDisplay: ' ',
      unitName: '044',
      year: 1988,
    };

    instance = renderIntoDocument(<JoinedItem item={ joinedItem } hasBorderBottom={ false }/>);

    const join = findRenderedDOMComponentWithClass(instance, 'test--joined-item-join');
    const date = findRenderedDOMComponentWithClass(instance, 'test--joined-item-date');

    join.textContent.should.eql('Joined Chicago Police Department with Unit 044 as a Police Officer');
    date.textContent.should.eql('DEC 5');
  });

  it('should show correct content if unit info is missing for that date', function () {
    const joinedItem = {
      date: 'DEC 5',
      isFirstRank: false,
      isFirstUnit: false,
      isLastRank: true,
      isLastUnit: true,
      kind: 'JOINED',
      rank: 'Police Officer',
      rankDisplay: ' ',
      unitDescription: '',
      unitDisplay: ' ',
      unitName: '',
      year: 1988,
    };

    instance = renderIntoDocument(<JoinedItem item={ joinedItem } hasBorderBottom={ false }/>);

    const join = findRenderedDOMComponentWithClass(instance, 'test--joined-item-join');
    const date = findRenderedDOMComponentWithClass(instance, 'test--joined-item-date');

    join.textContent.should.eql('Joined Chicago Police Department as a Police Officer');
    date.textContent.should.eql('DEC 5');
  });
});

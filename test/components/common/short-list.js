import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import ShortList from 'components/common/short-list';


describe('ShortList component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    const data = [
      ['unit', '001'],
      ['rank', 'big guy'],
      ['2017 salary', '$50,000'],
      ['race', null],
      ['sex', 'male'],
    ];

    instance = renderIntoDocument(
      <ShortList
        title={ 'David The Officer' }
        data={ data }
      />
    );

    const title = findRenderedDOMComponentWithClass(instance, 'test--short-list-title');
    title.textContent.should.eql('David The Officer');

    const rows = scryRenderedDOMComponentsWithClass(instance, 'test--short-list-row');
    rows[0].textContent.should.eql('unit001');
    rows[1].textContent.should.eql('rankbig guy');
    rows[2].textContent.should.eql('2017 salary$50,000');
    rows[3].textContent.should.eql('raceNot Available');
    rows[4].textContent.should.eql('sexmale');
  });

});

import React from 'react';
import { shallow } from 'enzyme';

import ShortList from 'components/common/short-list';


describe('ShortList component', function () {
  it('should render correctly', function () {
    const data = [
      ['unit', '001'],
      ['rank', 'big guy'],
      ['2017 salary', '$50,000'],
      ['race', null],
      ['sex', 'male'],
    ];

    const wrapper = shallow(
      <ShortList
        title={ 'David The Officer' }
        data={ data }
      />
    );

    const title = wrapper.find('.test--short-list-title');
    title.text().should.equal('David The Officer');

    const rows = wrapper.find('.test--short-list-row');
    rows.at(0).text().should.equal('unit001');
    rows.at(1).text().should.equal('rankbig guy');
    rows.at(2).text().should.equal('2017 salary$50,000');
    rows.at(3).text().should.equal('raceNot Available');
    rows.at(4).text().should.equal('sexmale');
  });

});

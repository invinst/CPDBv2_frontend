import React from 'react';
import { shallow } from 'enzyme';

import Year from 'components/officer-page/tabbed-pane-section/timeline/item/showings/year';


describe('Year component', function () {
  it('should render item correctly', function () {
    const year = {
      date: '1994',
      hasData: true,
      isLastUnit: true,
      kind: 'YEAR',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: '153',
    };

    const wrapper = shallow(<Year item={ year } hasBorderBottom={ false } />);

    const showing = wrapper.find('.year-item-item-content');
    const date = wrapper.find('.year-item-date');

    showing.text().should.equal('1994');
    date.text().should.equal('1994');
  });
});

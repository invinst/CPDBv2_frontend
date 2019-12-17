import React from 'react';
import { shallow } from 'enzyme';

import Award from 'components/officer-page/tabbed-pane-section/timeline/item/showings/award';


describe('Award component', function () {
  it('should render item correctly', function () {
    const awardItem = {
      date: 'Jan 01',
      kind: 'CR',
      unitName: '001',
      rank: 'Police Officer',
      isFirstRank: true,
      isLastRank: true,
      isFirstUnit: true,
      isLastUnit: true,
      category: 'Honorable Mention',
    };

    const wrapper = shallow(<Award item={ awardItem } hasBorderBottom={ true } />);

    const kind = wrapper.find('.award-item-kind');
    const category = wrapper.find('.award-item-category');
    const date = wrapper.find('.award-item-date');

    kind.text().should.equal('Award');
    category.text().should.equal('Honorable Mention');
    date.text().should.equal('Jan 01');
  });
});

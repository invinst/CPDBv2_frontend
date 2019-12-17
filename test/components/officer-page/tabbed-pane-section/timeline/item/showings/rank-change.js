import React from 'react';
import { shallow } from 'enzyme';

import RankChange from 'components/officer-page/tabbed-pane-section/timeline/item/showings/rank-change';


describe('RankChange component', function () {
  it('should render item correctly', function () {
    const rankChange = {
      date: 'APR 28',
      oldRank: 'Officer',
      rank: 'Detective',
    };

    const wrapper = shallow(
      <RankChange item={ rankChange } hasBorderBottom={ false } />
    );

    const content = wrapper.find('.rank-change-info');
    const date = wrapper.find('.rank-change-item-date');

    content.text().should.equal('Officer → Detective');
    date.text().should.equal('APR 28');
  });
});

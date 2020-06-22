import React from 'react';
import { mount } from 'enzyme';

import SummaryWidget from 'components/common/pinboard/widgets/summary-widget';


describe('SummaryWidget component', function () {
  it('should render correctly', function () {
    const summaryItems = [
      { title: 'Operation/Personnel Violations', count: 10 },
      { title: 'False Arrest', count: 8 },
      { title: 'Illegal Search', count: 4 },
      { title: 'Unknown', count: 1 },
    ];
    const wrapper = mount(<SummaryWidget summaryItems={ summaryItems } />);
    const items = wrapper.find('.summary-item');

    items.length.should.equal(4);

    items.at(0).find('.item-title').text().should.equal('Operation/Personnel Violations');
    items.at(0).find('.item-count').text().should.equal('10');

    items.at(1).find('.item-title').text().should.equal('False Arrest');
    items.at(1).find('.item-count').text().should.equal('8');

    items.at(2).find('.item-title').text().should.equal('Illegal Search');
    items.at(2).find('.item-count').text().should.equal('4');

    items.at(3).find('.item-title').text().should.equal('Unknown');
    items.at(3).find('.item-count').text().should.equal('1');
  });
});

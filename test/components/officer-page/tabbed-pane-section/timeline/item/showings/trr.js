import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import Trr from 'components/officer-page/tabbed-pane-section/timeline/item/showings/trr';


describe('Trr component', function () {
  it('should render item correctly', function () {
    const trrItem = {
      trrId: 123,
      date: 'DEC 5',
      kind: 'FORCE',
      category: 'Use of Force Report',
      rank: 'Police Officer',
      unitDescription: 'Recruit Training Section',
      unitName: '153',
    };

    const wrapper = shallow(<Trr item={ trrItem } hasBorderBottom={ false } />);

    const kind = wrapper.find('.trr-item-kind');
    const category = wrapper.find('.trr-item-category');
    const date = wrapper.find('.trr-item-date');

    kind.text().should.equal('Force');
    category.text().should.equal('Use of Force Report');
    date.text().should.equal('DEC 5');

    const link = wrapper.find(Link);

    link.prop('to').should.equal('/trr/123/');
  });
});

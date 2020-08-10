import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import Lawsuit from 'components/officer-page/tabbed-pane-section/timeline/item/showings/lawsuit';


describe('Lawsuit component', function () {
  it('should render item correctly', function () {
    const lawsuitItem = {
      caseNo: 'LL-540-10',
      date: 'DEC 5',
      kind: 'LAWSUIT',
      misconduct: 'Excessive force',
      outcome: 'killed by officer',
    };

    const wrapper = shallow(<Lawsuit item={ lawsuitItem } hasBorderBottom={ false } />);

    const kind = wrapper.find('.lawsuit-item-kind');
    const category = wrapper.find('.lawsuit-item-category');
    const date = wrapper.find('.lawsuit-item-date');

    kind.text().should.equal('Lawsuit');
    category.text().should.equal('Excessive force');
    date.text().should.equal('DEC 5');

    const link = wrapper.find(Link);

    link.prop('to').should.equal('/lawsuit/LL-540-10/');
  });
});

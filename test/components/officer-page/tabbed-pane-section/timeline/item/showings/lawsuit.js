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
      primaryCause: 'Excessive force',
    };

    const wrapper = shallow(<Lawsuit item={ lawsuitItem } hasBorderBottom={ false } />);

    const kind = wrapper.find('.lawsuit-item-kind');
    const title = wrapper.find('.lawsuit-item-title');
    const subtitle = wrapper.find('.lawsuit-item-subtitle');
    const date = wrapper.find('.lawsuit-item-date');

    kind.text().should.equal('Lawsuit');
    title.text().should.equal('Excessive force');
    subtitle.text().should.equal('LL-540-10');
    date.text().should.equal('DEC 5');

    const link = wrapper.find(Link);

    link.prop('to').should.equal('/lawsuit/LL-540-10/');
  });
});

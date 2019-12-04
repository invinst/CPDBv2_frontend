import React from 'react';
import { shallow } from 'enzyme';

import Year from 'components/social-graph-page/network/right-pane-section/timeline/item/year';


describe('Year component', function () {
  it('should render item correctly', function () {
    const year = {
      date: '1994',
      hasData: true,
      kind: 'YEAR',
      key: '123456',
    };

    const wrapper = shallow(<Year item={ year }/>);

    const showing = wrapper.find('.content');
    const date = wrapper.find('.date');

    showing.text().should.equal('1994');
    date.text().should.equal('1994');
  });
});

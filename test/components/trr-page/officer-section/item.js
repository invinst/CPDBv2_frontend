import React from 'react';
import { shallow } from 'enzyme';

import Item from 'components/trr-page/officer-section/item';


describe('Item component', function () {
  it('should render title and value only if subValue and additionalComponent are not passed in', function () {
    const wrapper = shallow(
      <Item title='Some title' value='Some value'/>
    );
    wrapper.find('.item-title').text().should.containEql('Some title');
    wrapper.find('.item-value').text().should.containEql('Some value');
    wrapper.find('.item-sub-value').exists().should.be.false();
  });

  it('should render subValue if they are available', function () {
    const wrapper = shallow(
      <Item
        title='Some title'
        value='Some value'
        subValue='Some subValue'
        hideBorder={ true }
      />
    );
    wrapper.find('.item-sub-value').text().should.containEql('Some subValue');
  });
});

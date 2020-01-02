import React from 'react';
import { shallow } from 'enzyme';

import ComplaintCategory from 'components/cr-page/complaint-category';


describe('ComplaintCategory component', function () {
  it('should render category and subcategory', function () {
    const wrapper = shallow(<ComplaintCategory category='some category' subcategory='some subcategory' />);
    const category = wrapper.find('.cr-category');
    category.text().should.containEql('some category');
    const subCategory = wrapper.find('.cr-subcategory');
    subCategory.text().should.equal('some subcategory');
  });
});

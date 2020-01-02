import React from 'react';
import { shallow } from 'enzyme';

import SearchTags from 'components/search-page/search-tags';


describe('SearchTags component', function () {
  it('should be renderable', function () {
    SearchTags.should.be.renderable();
  });

  it('should capitalize tags', function () {
    const wrapper = shallow(<SearchTags tags={ ['aaa', 'bbb'] } onSelect={ () => {} }/>);
    wrapper.text().should.containEql('AAA');
    wrapper.text().should.containEql('BBB');
  });

  it('should render Data Tool tag when there is no tags', function () {
    const wrapper = shallow(<SearchTags tags={ [] } isRequesting={ false }/>);
    wrapper.text().should.containEql('Data Tool');
  });

  it('should not render Data Tool tag when requesting', function () {
    const wrapper = shallow(<SearchTags tags={ [] } isRequesting={ true }/>);
    wrapper.text().should.not.containEql('Data Tool');
  });
});

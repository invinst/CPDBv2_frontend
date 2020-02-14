import React from 'react';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';

import * as editPathUtils from 'utils/edit-path';
import SearchBox from 'components/headers/slim-header/slim-header-content/search-box';
import MagnifyingGlass from 'components/common/icons/magnifying-glass';
import styles from 'components/headers/slim-header/slim-header-content/search-box.sass';
import { accentColor, boulderColor } from 'utils/styles';


describe('SearchBox component', function () {
  it('should render at top correctly', function () {
    const wrapper = shallow(<SearchBox position='top'/>);

    wrapper.prop('className').should.equal(`${styles.searchBox} top`);
    wrapper.find('.search-box-search-text').text().should.equal('Search');
    wrapper.find('.search-box-term').text().should.equal('What can I search?');

    const magnifyingGlass = wrapper.find(MagnifyingGlass);
    magnifyingGlass.prop('className').should.equal('search-box-magnifying-glass');
    magnifyingGlass.prop('color').should.equal(accentColor);
  });

  it('should render at middle correctly', function () {
    const wrapper = shallow(<SearchBox position='middle'/>);

    wrapper.prop('className').should.equal(`${styles.searchBox} middle`);
    wrapper.find('.search-box-search-text').text().should.equal('Search');
    wrapper.find('.search-box-term').text().should.equal('What can I search?');

    const magnifyingGlass = wrapper.find(MagnifyingGlass);
    magnifyingGlass.prop('className').should.equal('search-box-magnifying-glass');
    magnifyingGlass.prop('color').should.equal(boulderColor);
  });

  it('should render at bottom correctly', function () {
    const wrapper = shallow(<SearchBox position='bottom'/>);

    wrapper.prop('className').should.equal(`${styles.searchBox} bottom`);
    wrapper.find('.search-box-search-text').text().should.equal('Search');
    wrapper.find('.search-box-term').text().should.equal('What can I search?');

    const magnifyingGlass = wrapper.find(MagnifyingGlass);
    magnifyingGlass.prop('className').should.equal('search-box-magnifying-glass');
    magnifyingGlass.prop('color').should.equal('#005EF4');
  });

  it('should go to search page when being clicked', function () {
    const pushPathPreserveEditMode = stub(editPathUtils, 'pushPathPreserveEditMode');
    const stopPropagation = spy();

    const wrapper = shallow(<SearchBox position='top'/>);

    wrapper.simulate('click', { stopPropagation });

    stopPropagation.should.be.calledOnce();

    pushPathPreserveEditMode.should.be.calledOnce();
    pushPathPreserveEditMode.should.be.calledWith('/search/');
  });
});

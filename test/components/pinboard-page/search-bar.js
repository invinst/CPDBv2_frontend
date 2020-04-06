import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';

import SearchBar from 'components/pinboard-page/search-bar';
import * as editPath from 'utils/edit-path';


describe('SearchBar component', function () {
  it('should render correctly', function () {
    const wrapper = shallow(<SearchBar />);

    const searchBoxParent = wrapper.find('.search-box-parent');
    searchBoxParent.hasClass('short').should.be.false();

    wrapper.find('.search-input').text().should.equal('Search');
    wrapper.find('.share-button').exists().should.be.true();
  });

  it('should render share menu if share button is clicked', function () {
    const wrapper = mount(<SearchBar />);

    wrapper.find('.share-menu').exists().should.be.false();

    wrapper.find('.share-button').simulate('click');
    wrapper.find('.share-menu').exists().should.be.true();
  });

  it('should hide share menu if share button is cliked twice', function () {
    const wrapper = mount(<SearchBar />);

    const shareButton = wrapper.find('.share-button');
    shareButton.simulate('click');
    shareButton.simulate('click');
    wrapper.find('.share-menu').exists().should.be.false();
  });

  it('should hide share menu if copy link button is clicked', function () {
    const wrapper = mount(<SearchBar />);

    wrapper.find('.share-button').simulate('click');
    wrapper.find('.copy-link-icon').simulate('click');
    wrapper.find('.share-menu').exists().should.be.false();
  });

  it('should go to search page on clicked', function () {
    const wrapper = mount(<SearchBar />);
    let pushPathStub = stub(editPath, 'pushPathPreserveEditMode');
    wrapper.find('.search-input').simulate('click');
    pushPathStub.should.be.calledWith('/search/');
  });

  it('should not render share button in unsharable mode', function () {
    const wrapper = shallow(<SearchBar shareable={ false }/>);

    wrapper.find('.share-button').exists().should.be.false();
  });

  it('should render custom buttons', function () {
    const wrapper = shallow(<SearchBar headerButtons={ <div className='custom-buttons' /> } />);

    wrapper.find('.custom-buttons').exists().should.be.true();
  });
});

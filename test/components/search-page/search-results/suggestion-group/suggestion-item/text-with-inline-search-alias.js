import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { stub } from 'sinon';

import { mountWithRouter } from 'utils/test';
import * as constants from 'utils/constants';
import TextWithInlineSearchAlias
  from 'components/search-page/search-results/suggestion-group/suggestion-item/text-with-inline-search-alias';


describe('TextWithInlineSearchAlias component', function () {
  it('should render text correctly', function () {
    const wrapper = shallow(
      <TextWithInlineSearchAlias text='text' textClassName='test--text-class-name'/>
    );

    const textContent = wrapper.find('.test--text-class-name');
    textContent.text().should.equal('text');
  });

  it('should render Link if aliasEditModeOn', function () {
    const wrapper = shallow(
      <TextWithInlineSearchAlias text='text' aliasEditModeOn={ true }/>
    );

    const linkElement = wrapper.find(Link);
    linkElement.prop('to').should.equal(`/edit${constants.INLINE_SEARCH_ALIAS_ADMIN_PATH}`);
  });

  it('should trigger setAliasAdminPageContent if we click on inline search alias link', function () {
    const setAliasAdminPageContent = stub();

    const wrapper = mountWithRouter(
      <TextWithInlineSearchAlias
        text='text'
        aliasEditModeOn={ true }
        content={ { someContent: 'content' } }
        setAliasAdminPageContent={ setAliasAdminPageContent } />
    );

    const linkElement = wrapper.find(Link);
    linkElement.simulate('click');

    setAliasAdminPageContent.should.be.calledWith({ someContent: 'content' });
  });
});

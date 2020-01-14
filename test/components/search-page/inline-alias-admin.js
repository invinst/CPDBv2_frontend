import React from 'react';
import { shallow } from 'enzyme';
import TagsInput from 'react-tagsinput';
import { spy } from 'sinon';
import { Link } from 'react-router-dom';

import { SEARCH_ALIAS_EDIT_PATH } from 'utils/constants';
import InlineAliasAdmin from 'components/search-page/inline-alias-admin';


describe('InlineAliasAdmin component', function () {
  it('should render', function () {
    InlineAliasAdmin.should.be.renderable();
  });

  it('should render current item\'s info', function () {
    const wrapper = shallow(
      <InlineAliasAdmin
        text='John Wayne'
        description='Badge #000'
        errorMessage='Something wrong happened'
      />
    );
    wrapper.text().should.containEql('John Wayne');
    wrapper.text().should.containEql('Badge #000');
    wrapper.text().should.containEql('Something wrong happened');
  });

  it('should render "Cancel" button that links to search page\'s edit mode', function () {
    const wrapper = shallow(
      <InlineAliasAdmin />
    );
    const btn = wrapper.find(Link).at(0);
    btn.prop('to').should.eql(`/edit${SEARCH_ALIAS_EDIT_PATH}`);
    btn.prop('children').should.equal('Cancel');
  });

  it('should call updateAliases() when Save button is clicked', function () {
    const updateAliases = spy();

    const wrapper = shallow(
      <InlineAliasAdmin
        updateAliases={ updateAliases }
        existingAliases={ ['skullcap'] }
        id='123'
        type='officer'
      />
    );
    const btn = wrapper.find('.test--save-button');
    btn.text().should.equal('Save');
    btn.simulate('click');
    updateAliases.should.be.calledWith('123', 'officer', ['skullcap']);
  });

  it('should pass appropriate props into TagsInput', function () {
    const wrapper = shallow(
      <InlineAliasAdmin
        existingAliases={ ['skullcap'] }
        id='123'
        type='officer'
      />
    );
    const instance = wrapper.instance();

    const tagsInput = wrapper.find(TagsInput);
    tagsInput.prop('value').should.eql(['skullcap']);
    tagsInput.prop('renderTag').should.equal(instance.renderAlias);
    tagsInput.prop('renderInput').should.equal(instance.renderInput);
    tagsInput.prop('onlyUnique').should.be.true();
    tagsInput.prop('addKeys').should.eql([13, 188]);
  });

  describe('handleAliasesChange', function () {
    it('should set state correctly', function () {
      const wrapper = shallow(
        <InlineAliasAdmin
          existingAliases={ ['skullcap'] }
        />
      );

      wrapper.state('aliases').should.eql(['skullcap']);
      wrapper.instance().handleAliasesChange(['foo', 'bar']);
      wrapper.state('aliases').should.eql(['foo', 'bar']);
    });
  });
});

import React from 'react';
import TagsInput from 'react-tagsinput';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
  Simulate,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import { spy } from 'sinon';
import { Link } from 'react-router';

import { SEARCH_ALIAS_EDIT_PATH } from 'utils/constants';
import InlineAliasAdmin from 'components/search-page/inline-alias-admin';
import { unmountComponentSuppressError } from 'utils/test';


describe('InlineAliasAdmin component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render', function () {
    InlineAliasAdmin.should.be.renderable();
  });

  it('should render current item\'s info', function () {
    instance = renderIntoDocument(
      <InlineAliasAdmin
        text='John Wayne'
        description='Badge #000'
        errorMessage='Something wrong happened'
      />
    );
    findDOMNode(instance).textContent.should.containEql('John Wayne');
    findDOMNode(instance).textContent.should.containEql('Badge #000');
    findDOMNode(instance).textContent.should.containEql('Something wrong happened');
  });

  it('should render "Cancel" button that links to search page\'s edit mode', function () {
    instance = renderIntoDocument(
      <InlineAliasAdmin />
    );
    const btn = scryRenderedComponentsWithType(instance, Link)[0];
    btn.props.to.should.eql(`/edit/${SEARCH_ALIAS_EDIT_PATH}`);
    btn.props.children.should.eql('Cancel');
  });

  it('should call updateAliases() when Save button is clicked', function () {
    const updateAliases = spy();

    instance = renderIntoDocument(
      <InlineAliasAdmin
        updateAliases={ updateAliases }
        existingAliases={ ['skullcap'] }
        id='123'
        type='officer'
      />
    );
    const btn = findRenderedDOMComponentWithClass(instance, 'test--save-button');
    btn.textContent.should.eql('Save');
    Simulate.click(btn);
    updateAliases.calledWith('123', 'officer', ['skullcap']).should.be.true();
  });

  it('should pass appropriate props into TagsInput', function () {
    instance = renderIntoDocument(
      <InlineAliasAdmin
        existingAliases={ ['skullcap'] }
        id='123'
        type='officer'
      />
    );

    const tagsInput = findRenderedComponentWithType(instance, TagsInput);
    tagsInput.props.value.should.eql(['skullcap']);
    tagsInput.props.renderTag.should.equal(instance.renderAlias);
    tagsInput.props.renderInput.should.equal(instance.renderInput);
    tagsInput.props.onlyUnique.should.be.true();
    tagsInput.props.addKeys.should.eql([13, 188]);
  });

  describe('handleAliasesChange', function () {
    it('should set state correctly', function () {
      instance = renderIntoDocument(
        <InlineAliasAdmin
          existingAliases={ ['skullcap'] }
        />
      );

      instance.state.aliases.should.eql(['skullcap']);
      instance.handleAliasesChange(['foo', 'bar']);
      instance.state.aliases.should.eql(['foo', 'bar']);
    });
  });
});

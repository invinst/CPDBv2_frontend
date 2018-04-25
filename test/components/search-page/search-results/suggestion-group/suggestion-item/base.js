import React from 'react';
import { findDOMNode } from 'react-dom';
import { spy, stub } from 'sinon';
import { Link } from 'react-router';
import {
  renderIntoDocument, findRenderedComponentWithType, findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass, Simulate
} from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import SuggestionItemBase from 'components/search-page/search-results/suggestion-group/suggestion-item/base';
import JumpyMotion from 'components/animation/jumpy-motion';

import Mousestrap from 'mousetrap';


describe('SuggestionItemBase component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    SuggestionItemBase.should.be.renderable();
  });

  it('should rerender when hovering change', function () {
    instance = renderIntoDocument(<SuggestionItemBase/>);
    let called = false;

    const oldRender = SuggestionItemBase.prototype.render;
    SuggestionItemBase.prototype.render = (...args) => {
      called = true;
      return oldRender.apply(instance, args);
    };

    instance = reRender(<SuggestionItemBase hovering={ true }/>, instance);
    called.should.be.true();
    SuggestionItemBase.prototype.render = oldRender;
  });

  it('should rerender when isFocused change', function () {
    instance = renderIntoDocument(<SuggestionItemBase/>);
    let called = false;

    const oldRender = SuggestionItemBase.prototype.render;
    SuggestionItemBase.prototype.render = (...args) => {
      called = true;
      return oldRender.apply(instance, args);
    };

    instance = reRender(<SuggestionItemBase isFocused={ true }/>, instance);
    called.should.be.true();
    SuggestionItemBase.prototype.render = oldRender;
  });

  it('should render Link if given to', function () {
    const suggestion = {
      to: '/officer/123'
    };

    instance = renderIntoDocument(<SuggestionItemBase suggestion={ suggestion }/>);
    const suggestionLink = findRenderedComponentWithType(instance, Link);
    suggestionLink.props.to.should.equal('/officer/123');
  });

  it('should render a tag otherwise', function () {
    const suggestion = {
      url: 'https://example.com/'
    };

    instance = renderIntoDocument(<SuggestionItemBase suggestion={ suggestion }/>);
    const suggestionLink = findRenderedDOMComponentWithTag(instance, 'a');
    suggestionLink.href.should.equal('https://example.com/');
  });

  it('should render JumpyMotion', function () {
    instance = renderIntoDocument(<SuggestionItemBase/>);
    findRenderedComponentWithType(instance, JumpyMotion).should.be.ok();
  });

  it('should render second row if subText is given', function () {
    const suggestion = {
      subText: 'Sample'
    };
    instance = renderIntoDocument(<SuggestionItemBase suggestion={ suggestion }/>);
    const element = findRenderedDOMComponentWithClass(instance, 'test--second-row');
    element.textContent.should.containEql('Sample');
  });

  it('should not render second row if subText not given', function () {
    instance = renderIntoDocument(<SuggestionItemBase/>);
    scryRenderedDOMComponentsWithClass(instance, 'test--second-row').length.should.equal(0);
  });

  describe('click action', function () {
    it('should call selectItem if not focused', function () {
      const suggestion = {
        uniqueKey: '123'
      };
      const selectItemSpy = spy();
      instance = renderIntoDocument(
        <SuggestionItemBase
          suggestion={ suggestion }
          selectItem={ selectItemSpy }
          isFocused={ false }/>
      );
      const element = findRenderedDOMComponentWithClass(instance, 'suggestion-item-123');
      Simulate.click(element);
      selectItemSpy.called.should.be.true();
    });

    it('should call trigger if not focused', function () {
      const suggestion = {
        uniqueKey: '123'
      };
      const triggerStub = stub(Mousestrap, 'trigger');
      instance = renderIntoDocument(
        <SuggestionItemBase
          suggestion={ suggestion }
          isFocused={ true }/>
      );
      const element = findRenderedDOMComponentWithClass(instance, 'suggestion-item-123');
      Simulate.click(element);
      triggerStub.withArgs('enter').called.should.be.true();

      triggerStub.restore();
    });
  });


  context('alias edit mode', function () {
    it('should render div as wrapper', function () {
      instance = renderIntoDocument(<SuggestionItemBase aliasEditModeOn={ true }/>);
      findDOMNode(instance).tagName.should.equal('DIV');
    });

    it('should render alias link', function () {
      instance = renderIntoDocument(<SuggestionItemBase aliasEditModeOn={ true }/>);
      findDOMNode(findRenderedComponentWithType(instance, Link)).textContent.should.equal('Alias');
    });

    it('should trigger alias admin page if click on alias link', function () {
      const setAliasAdminPageContent = spy();
      const id = '123';
      const text = 'Jerome Finnigan';
      const subText = 'White, Male';
      const type = 'OFFICER';
      const tags = [];
      const props = {
        setAliasAdminPageContent,
        suggestion: { id, text, type, subText, tags },
        aliasEditModeOn: true
      };

      instance = renderIntoDocument(
        <SuggestionItemBase { ...props }/>
      );
      findRenderedComponentWithType(instance, Link).props.onClick();
      setAliasAdminPageContent.calledWith({
        id, text,
        type: 'officer',
        description: subText,
        existingAliases: tags
      }).should.be.true();
    });
  });
});

import React from 'react';
import { spy, stub } from 'sinon';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
 findRenderedDOMComponentWithTag, renderIntoDocument,
  Simulate
} from 'react-addons-test-utils';
import Mousetrap from 'mousetrap';

import { reRender, unmountComponentSuppressError } from 'utils/test';
import SearchTerms from 'components/search-page/search-terms';
import {
  contentWrapperStyle,
  maximumStyle,
  mediumStyle,
  minimumStyle
} from 'components/search-page/search-terms/search-terms.style';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import PreviewPane from 'components/search-page/search-terms/preview-pane';
import { SearchTermCategory } from 'utils/test/factories/search-terms';
import * as domUtils from 'utils/dom';
import CategoryColumn from 'components/search-page/search-terms/category-column';
import MinimalScrollBars from 'components/search-page/search-terms/minimal-scroll-bar';


describe('SearchTerms component', function () {
  let instance;
  const categories = [
    {
      name: 'Geography',
      items: [
        {
          id: 'community',
          name: 'Communities',
          description: 'Chicago is divided.',
          'call_to_action_type': 'view_all',
          link: 'http://beta.cpdb.co/url-mediator/session-builder?community=<name>'
        }
      ]
    }
  ];
  const navigationKeys = ['category-Geography', 'Geography-Communities'];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    SearchTerms.should.be.renderable();
  });

  it('should be able to render CategoryColumn', function () {
    instance = renderIntoDocument(
      <SearchTerms categories={ SearchTermCategory.buildList(1) } />
    );
    const categoryColumn = findRenderedComponentWithType(instance, CategoryColumn);
    categoryColumn.should.be.ok();
  });

  it('should render MinimalScrollBars', function () {
    instance = renderIntoDocument(
      <SearchTerms categories={ SearchTermCategory.buildList(1) } />
    );
    findRenderedComponentWithType(instance, MinimalScrollBars).should.be.ok();
  });

  it('should fire request when mounted', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <SearchTerms requestSearchTermCategories={ callback } />
    );
    callback.called.should.be.true();
  });

  it('should render ResponsiveFluidWidthComponent with correct props', function () {
    instance = renderIntoDocument(
      <SearchTerms />
    );
    const responsiveComponent = findRenderedComponentWithType(instance, ResponsiveFluidWidthComponent);
    responsiveComponent.props.style.should.eql(contentWrapperStyle);
    responsiveComponent.props.minimumStyle.should.eql(minimumStyle);
    responsiveComponent.props.mediumStyle.should.eql(mediumStyle);
    responsiveComponent.props.maximumStyle.should.eql(maximumStyle);
    responsiveComponent.props.minWidthThreshold.should.eql(1020);
    responsiveComponent.props.maxWidthThreshold.should.eql(1760);
  });

  it('should trigger move when up key pressed', function () {
    const move = spy();
    const totalItemCount = 3;
    const direction = 'up';
    instance = renderIntoDocument(
      <SearchTerms move={ move } totalItemCount={ totalItemCount } />
    );
    Mousetrap.trigger(direction);
    move.calledWith(direction, totalItemCount).should.be.true();
  });

  it('should trigger move when down key pressed', function () {
    const move = spy();
    const totalItemCount = 3;
    const direction = 'down';
    instance = renderIntoDocument(
      <SearchTerms move={ move } totalItemCount={ totalItemCount } />
    );
    Mousetrap.trigger(direction);
    move.calledWith(direction, totalItemCount).should.be.true();
  });

  it('should trigger setNavigation when click on a search term item', function () {
    const setNavigation = spy();

    instance = renderIntoDocument(
      <SearchTerms setNavigation={ setNavigation } categories={ categories } navigationKeys={ navigationKeys }/>
    );

    const searchTerms = findRenderedComponentWithType(instance, SearchTerms);

    Simulate.click(findRenderedDOMComponentWithClass(searchTerms, 'test--category-item'));
    setNavigation.calledWith({ navigationKeys, uniqueKey: 'Geography-community' }).should.be.true();
  });

  it('should be able to setNavigation on a category header', function () {
    const setNavigation = spy();
    instance = renderIntoDocument(
      <SearchTerms setNavigation={ setNavigation } categories={ categories } navigationKeys={ navigationKeys }/>
    );

    Simulate.click(findRenderedDOMComponentWithClass(instance, 'test--category-header'));
    setNavigation.calledWith({ navigationKeys, uniqueKey: 'category-Geography' }).should.be.true();
  });

  it('should resetNavigation to 0 when unmounted', function () {
    const resetNavigation = spy();
    instance = renderIntoDocument(
      <SearchTerms resetNavigation={ resetNavigation }/>
    );
    unmountComponentSuppressError(instance);

    resetNavigation.calledWith(0).should.be.true();
  });

  describe('after keyboard navigation', function () {
    beforeEach(function () {
      this.scrollToElementStub = stub(domUtils, 'scrollToElement');
    });

    afterEach(function () {
      this.scrollToElementStub.restore();
    });

    it('should scroll to focused item', function () {
      instance = renderIntoDocument(<SearchTerms focusedItem={ { uniqueKey: null } } />);
      instance = reRender(<SearchTerms focusedItem={ { uniqueKey: 'OFFICER-RACE' } } />, instance);

      this.scrollToElementStub.calledWith(
        '.term-item.focused', { behavior: 'instant', block: 'center' }
      ).should.be.true();
    });

    it('should not scroll to if scrollTo is false', function () {
      instance = renderIntoDocument(<SearchTerms focusedItem={ { uniqueKey: null } } scrollTo={ true }/>);
      instance = reRender(<SearchTerms focusedItem={ { uniqueKey: 'OFFICER-RACE' } } scrollTo={ false } />, instance);

      this.scrollToElementStub.called.should.be.false();
    });

    it('should render preview pane for the focused item', function () {
      const focusedItem = {
        id: 'category',
        name: 'Some item',
        description: 'This is item for testing'
      };

      instance = renderIntoDocument(<SearchTerms focusedItem={ focusedItem } />);
      const previewPane = findRenderedComponentWithType(instance, PreviewPane);
      previewPane.should.be.ok();
    });

    it('should render preview pane with markdown link', function () {
      const focusedItem = {
        id: 'category',
        name: 'Some item',
        description: 'This is item for testing. [Google](http://www.google.com)'
      };

      instance = renderIntoDocument(<SearchTerms focusedItem={ focusedItem } />);
      const previewPaneDescription = findRenderedComponentWithType(instance, PreviewPane);
      const description = findRenderedDOMComponentWithTag(previewPaneDescription, 'a');
      description.getAttribute('href').should.containEql('http://www.google.com');
    });
  });
});

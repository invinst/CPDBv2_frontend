import React from 'react';
import { findDOMNode, render } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import RouteTransition from 'components/animation/route-transition';
import {
  unmountComponentSuppressError,
  withAnimationDisabled,
  reRender,
} from 'utils/test';


describe('RouteTransition component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  describe('getRouteTransitionKey', function () {
    it('should give the same key for same CR path', function () {
      element = renderIntoDocument(
        <RouteTransition pathname='/complaint/1/2/'>
          complaint for some officer
        </RouteTransition>
      );
      element.getRouteTransitionKey('/complaint/1/2/').should.eql('complaint/1');

      element = reRender(
        <RouteTransition pathname='/complaint/1/3/'>
          complaint for other officer
        </RouteTransition>,
        element
      );
      element.getRouteTransitionKey('/complaint/1/3/').should.eql('complaint/1');

      element = reRender(
        <RouteTransition pathname='/complaint/1/'>
          complaint for other officer
        </RouteTransition>,
        element
      );
      element.getRouteTransitionKey('/complaint/1/').should.eql('complaint/1');
    });

    it('should give the same key for search paths', function () {
      element = renderIntoDocument(
        <RouteTransition pathname='/search/'>
          complaint for some officer
        </RouteTransition>
      );
      element.getRouteTransitionKey('/search/').should.eql('search');

      element = reRender(
        <RouteTransition pathname='/search/terms/'>
          complaint for other officer
        </RouteTransition>,
        element
      );
      element.getRouteTransitionKey('/search/terms/').should.eql('search');
    });
  });

  context('animation disabled', function () {
    it('should render exactly children component', function () {
      withAnimationDisabled(() => {
        const children = <div className='test--sample-div' />;
        element = renderIntoDocument(
          <RouteTransition pathname='/path'>
            { children }
          </RouteTransition>
        );

        scryRenderedDOMComponentsWithClass(element, 'test--sample-div').length.should.equal(1);
      });
    });
  });

  context('animation enabled', function () {
    it('should render child', function () {
      let testText = 'should be rendered';
      element = renderIntoDocument(
        <RouteTransition pathname='/path'><p>{ testText }</p></RouteTransition>
      );
      findDOMNode(element).innerHTML.should.containEql(testText);
    });

    it('should eventually render new child', function (callback) {
      let rootEl = document.createElement('div');
      const testChildren = [
        {
          path: '/path1',
          text: 'a b c',
        },
        {
          path: '/path2',
          text: 'd e f',
        },
      ];

      element = render(
        <RouteTransition pathname={ testChildren[0].path }><p>{ testChildren[0].text }</p></RouteTransition>,
        rootEl);

      render(
        <RouteTransition pathname={ testChildren[1].path }><p>{ testChildren[1].text }</p></RouteTransition>,
        rootEl, () => {
          rootEl.innerHTML.should.containEql(testChildren[0].text);
          setTimeout(() => {
            rootEl.innerHTML.should.containEql(testChildren[1].text);
            callback();
          }, 300);
        });
    });
  });

  it('should change contents state when component loading finish', function () {
    element = renderIntoDocument(
      <RouteTransition pathname='/p' pageLoading={ false }><p>abc</p></RouteTransition>
    );

    element.state.contents.should.have.length(1);
    element.state.contents[0].key.should.eql('/p');

    element = reRender(
      <RouteTransition pathname='/span' pageLoading={ true }><span>abc</span></RouteTransition>,
      element
    );

    element.state.contents.should.have.length(2);
    element.overlayCompletelyCover = true;
    element = reRender(
      <RouteTransition pathname='/span' pageLoading={ false }><span>abc</span></RouteTransition>,
      element
    );

    element.state.contents.should.have.length(1);
    element.state.contents[0].key.should.eql('/span');
  });

  it('should render old children when changing from / to /search/', function () {
    element = renderIntoDocument(
      <RouteTransition pathname='/' pageLoading={ false }>
        <p className='test--root-content'>LandingPage</p>
      </RouteTransition>
    );
    element.state.contents.should.have.length(1);
    element.state.contents[0].key.should.eql('/');
    element.state.contents[0].opacity.should.eql(1);
    findRenderedDOMComponentWithClass(element, 'test--root-content').textContent.should.eql('LandingPage');

    element = reRender(
      <RouteTransition pathname='/search/' pageLoading={ true }>
        <p className='test--search-content'>SearchPage</p>
      </RouteTransition>,
      element
    );
    scryRenderedDOMComponentsWithClass(element, 'test--search-content').should.have.length(0);
    element.state.contents.should.have.length(1);
    findRenderedDOMComponentWithClass(element, 'test--root-content').textContent.should.eql('LandingPage');
  });

  it('should render old children when changing from /search/ to /', function () {
    element = renderIntoDocument(
      <RouteTransition pathname='/search/' pageLoading={ false }>
        <p className='test--search-content'>SearchPage</p>
      </RouteTransition>
    );
    element.state.contents.should.have.length(1);
    element.state.contents[0].key.should.eql('search');
    element.state.contents[0].opacity.should.eql(1);
    findRenderedDOMComponentWithClass(element, 'test--search-content').textContent.should.eql('SearchPage');

    element = reRender(
      <RouteTransition pathname='/' pageLoading={ true }>
        <p className='test--root-content'>LandingPage</p>
      </RouteTransition>,
      element
    );
    scryRenderedDOMComponentsWithClass(element, 'test--root-content').should.have.length(0);
    element.state.contents.should.have.length(1);
    findRenderedDOMComponentWithClass(element, 'test--search-content').textContent.should.eql('SearchPage');
  });

  it('should render old children when changing from / to /', function () {
    element = renderIntoDocument(
      <RouteTransition pathname='/' pageLoading={ false }>
        <p className='test--root-content'>LandingPage</p>
      </RouteTransition>
    );
    element.state.contents.should.have.length(1);
    element.state.contents[0].key.should.eql('/');
    element.state.contents[0].opacity.should.eql(1);
    findRenderedDOMComponentWithClass(element, 'test--root-content').textContent.should.eql('LandingPage');

    element = reRender(
      <RouteTransition pathname='/' pageLoading={ true }>
        <p className='test--second-root-content'>LandingPage 2</p>
      </RouteTransition>,
      element
    );
    scryRenderedDOMComponentsWithClass(element, 'test--second-root-content').should.have.length(0);
    element.state.contents.should.have.length(1);
    findRenderedDOMComponentWithClass(element, 'test--root-content').textContent.should.eql('LandingPage');
  });

  it('should render old children when changing from /search/ to /search/', function () {
    element = renderIntoDocument(
      <RouteTransition pathname='/search/' pageLoading={ false }>
        <p className='test--search-content'>SearchPage</p>
      </RouteTransition>,
    );
    element.state.contents.should.have.length(1);
    findRenderedDOMComponentWithClass(element, 'test--search-content').textContent.should.eql('SearchPage');

    element = reRender(
      <RouteTransition pathname='/search/' pageLoading={ true }>
        <p className='test--second-search-content'>SearchPage 2</p>
      </RouteTransition>,
      element,
    );
    scryRenderedDOMComponentsWithClass(element, 'test--second-search-content').should.have.length(0);
    element.state.contents.should.have.length(1);
    findRenderedDOMComponentWithClass(element, 'test--search-content').textContent.should.eql('SearchPage');
  });

  it('should hide overlay once animation is done if there is no page loading', function (done) {
    element = renderIntoDocument(
      <RouteTransition pathname='/p' pageLoading={ false }><p>abc</p></RouteTransition>
    );
    element = reRender(
      <RouteTransition pathname='/span' pageLoading={ false }><span>abc</span></RouteTransition>,
      element
    );
    element.state.showOverlay.should.be.true();
    element.handleOverlayTransitionEnd();
    setTimeout(() => {
      element.state.showOverlay.should.be.false();
      done();
    }, 50);
  });
});

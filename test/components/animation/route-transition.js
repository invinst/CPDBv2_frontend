import React from 'react';
import { shallow } from 'enzyme';

import RouteTransition from 'components/animation/route-transition';
import { withAnimationDisabled } from 'utils/test';


describe('RouteTransition component', function () {
  describe('getRouteTransitionKey', function () {
    it('should give the same key for same CR path', function () {
      const wrapper = shallow(
        <RouteTransition pathname='/complaint/1/2/'>
          complaint for some officer
        </RouteTransition>
      );
      const instance = wrapper.instance();
      instance.getRouteTransitionKey('/complaint/1/2/').should.equal('complaint/1');

      wrapper.setProps({
        pathname: '/complaint/1/3/',
      });

      instance.getRouteTransitionKey('/complaint/1/3/').should.equal('complaint/1');

      wrapper.setProps({
        pathname: '/complaint/1/',
      });
      instance.getRouteTransitionKey('/complaint/1/').should.equal('complaint/1');
    });

    it('should give the same key for search paths', function () {
      const wrapper = shallow(
        <RouteTransition pathname='/search/'>
          complaint for some officer
        </RouteTransition>
      );
      const instance = wrapper.instance();
      instance.getRouteTransitionKey('/search/').should.equal('search');

      wrapper.setProps({
        pathname: '/search/terms/',
      });
      instance.getRouteTransitionKey('/search/terms/').should.equal('search');
    });
  });

  context('animation disabled', function () {
    it('should render exactly children component', function () {
      withAnimationDisabled(() => {
        const children = <div className='test--sample-div' />;
        const wrapper = shallow(
          <RouteTransition pathname='/path'>
            { children }
          </RouteTransition>
        );

        wrapper.find('.test--sample-div').exists().should.be.true();
      });
    });
  });

  context('animation enabled', function () {
    it('should render child', function () {
      let testText = 'should be rendered';
      const wrapper = shallow(
        <RouteTransition pathname='/path'><p>{ testText }</p></RouteTransition>
      );
      wrapper.text().should.containEql(testText);
    });

    it('should eventually render new child', function (done) {
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

      const wrapper = shallow(
        <RouteTransition pathname={ testChildren[0].path }><p>{ testChildren[0].text }</p></RouteTransition>
      );

      wrapper.setProps({
        pathname: testChildren[1].path,
        children: <p>{ testChildren[1].text }</p>,
      });

      wrapper.text().should.containEql(testChildren[0].text);

      setTimeout(() => {
        wrapper.text().should.containEql(testChildren[1].text);
        done();
      }, 300);
    });
  });

  it('should change contents state when component loading finish', function () {
    const wrapper = shallow(
      <RouteTransition pathname='/p' pageLoading={ false }><p>abc</p></RouteTransition>
    );

    wrapper.state('contents').should.have.length(1);
    wrapper.state('contents')[0].key.should.equal('/p');

    wrapper.setProps({
      pathname: '/span',
      pageLoading: true,
      children: <span>abc</span>,
    });

    wrapper.state('contents').should.have.length(2);
    wrapper.instance().overlayCompletelyCover = true;
    wrapper.setProps({
      pathname: '/span',
      pageLoading: false,
      children: <span>abc</span>,
    });

    wrapper.state('contents').should.have.length(1);
    wrapper.state('contents')[0].key.should.equal('/span');
  });

  it('should render old children when changing from / to /search/', function () {
    const wrapper = shallow(
      <RouteTransition pathname='/' pageLoading={ false }>
        <p className='test--root-content'>LandingPage</p>
      </RouteTransition>
    );
    wrapper.state('contents').should.have.length(1);
    wrapper.state('contents')[0].key.should.equal('/');
    wrapper.state('contents')[0].opacity.should.equal(1);
    wrapper.find('.test--root-content').text().should.equal('LandingPage');

    wrapper.setProps({
      pathname: '/search/',
      pageLoading: true,
      children: <p className='test--search-content'>SearchPage</p>,
    });

    wrapper.find('.test--search-content').exists().should.be.false();
    wrapper.state('contents').should.have.length(1);
    wrapper.find('.test--root-content').text().should.equal('LandingPage');
  });

  it('should render old children when changing from /search/ to /', function () {
    const wrapper = shallow(
      <RouteTransition pathname='/search/' pageLoading={ false }>
        <p className='test--search-content'>SearchPage</p>
      </RouteTransition>
    );
    wrapper.state('contents').should.have.length(1);
    wrapper.state('contents')[0].key.should.equal('search');
    wrapper.state('contents')[0].opacity.should.equal(1);
    wrapper.find('.test--search-content').text().should.equal('SearchPage');

    wrapper.setProps({
      pathname: '/',
      pageLoading: true,
      children: <p className='test--root-content'>LandingPage</p>,
    });

    wrapper.find('.test--root-content').exists().should.be.false();
    wrapper.state('contents').should.have.length(1);
    wrapper.find('.test--search-content').text().should.equal('SearchPage');
  });

  it('should render old children when changing from / to /', function () {
    const wrapper = shallow(
      <RouteTransition pathname='/' pageLoading={ false }>
        <p className='test--root-content'>LandingPage</p>
      </RouteTransition>
    );
    wrapper.state('contents').should.have.length(1);
    wrapper.state('contents')[0].key.should.equal('/');
    wrapper.state('contents')[0].opacity.should.equal(1);
    wrapper.find('.test--root-content').text().should.equal('LandingPage');

    wrapper.setProps({
      pathname: '/',
      pageLoading: true,
      children: <p className='test--second-root-content'>LandingPage 2</p>,
    });

    wrapper.find('.test--second-root-content').exists().should.be.false();
    wrapper.state('contents').should.have.length(1);
    wrapper.find('.test--root-content').text().should.equal('LandingPage');
  });

  it('should render old children when changing from /search/ to /search/', function () {
    const wrapper = shallow(
      <RouteTransition pathname='/search/' pageLoading={ false }>
        <p className='test--search-content'>SearchPage</p>
      </RouteTransition>,
    );
    wrapper.state('contents').should.have.length(1);
    wrapper.find('.test--search-content').text().should.equal('SearchPage');

    wrapper.setProps({
      pathname: '/search/',
      pageLoading: true,
      children: <p className='test--second-search-content'>SearchPage 2</p>,
    });

    wrapper.find('.test--second-search-content').exists().should.be.false();
    wrapper.state('contents').should.have.length(1);
    wrapper.find('.test--search-content').text().should.equal('SearchPage');
  });

  it('should hide overlay once animation is done if there is no page loading', function (done) {
    const wrapper = shallow(
      <RouteTransition pathname='/p' pageLoading={ false }><p>abc</p></RouteTransition>
    );

    wrapper.setProps({
      pathname: '/span',
      pageLoading: false,
      children: <span>abc</span>,
    });
    wrapper.state('showOverlay').should.be.true();
    wrapper.instance().handleOverlayTransitionEnd();
    setTimeout(() => {
      wrapper.state('showOverlay').should.be.false();
      done();
    }, 50);
  });
});

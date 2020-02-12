import React from 'react';
import { shallow, mount } from 'enzyme';

import RouteTransition from 'components/animation/route-transition';
import styles from 'components/animation/route-transition/route-transition.sass';
import { withAnimationDisabled } from 'utils/test';


describe('RouteTransition component', function () {
  describe('getRouteTransitionKey', function () {
    it('should give the same key for search page and landing page', function () {
      RouteTransition.getRouteTransitionKey('/search/').should.equal('/');
    });

    it('should give the same key for search page and search alias page', function () {
      const searchKey = RouteTransition.getRouteTransitionKey('/search/');
      const searchAliasKey = RouteTransition.getRouteTransitionKey('/search/alias/');
      searchKey.should.equal('/');
      searchAliasKey.should.equal('/');
    });

    it('should give the same key for officer page with same officer id', function () {
      const officerKey = RouteTransition.getRouteTransitionKey('/officer/123/');
      const officerWithNameKey = RouteTransition.getRouteTransitionKey('/officer/123/edward-may');
      officerKey.should.equal('/officer/123/');
      officerWithNameKey.should.equal('/officer/123/');
    });

    it('should give the same key for pinboard page with same id', function () {
      const pinboardOldTitleKey = RouteTransition.getRouteTransitionKey('/pinboard/123/old-title');
      const pinboardNewTitleKey = RouteTransition.getRouteTransitionKey('/pinboard/123/new-title');
      pinboardOldTitleKey.should.equal('/pinboard/123/');
      pinboardNewTitleKey.should.equal('/pinboard/123/');
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
      const wrapper = mount(
        <RouteTransition pathname='/path'><p>{ testText }</p></RouteTransition>
      );
      wrapper.text().should.containEql(testText);
    });

    it('should eventually render new child', function (done) {
      const testChildren = [
        {
          path: '/path1',
          text: 'component 1',
        },
        {
          path: '/path2',
          text: 'component 2',
        },
      ];

      const wrapper = mount(
        <RouteTransition pathname={ testChildren[0].path }><p>{ testChildren[0].text }</p></RouteTransition>
      );

      wrapper.setProps({
        pathname: testChildren[1].path,
        children: <p>{ testChildren[1].text }</p>,
        pageLoading: true,
      });

      wrapper.text().should.containEql(testChildren[0].text);
      setTimeout(() => {
        wrapper.setProps({ pageLoading: false });
        wrapper.text().should.containEql(testChildren[1].text);
        done();
      }, 300);
    });

    it('should not render overlay when navigate from /search/ to /', function () {
      const searchPage = {
        path: '/search/',
        text: 'search page',
      };

      const landingPage = {
        path: '/',
        text: 'landing page',
      };

      const wrapper = mount(
        <RouteTransition pathname={ searchPage.path }><p>{ searchPage.text }</p></RouteTransition>
      );

      wrapper.setProps({
        pathname: landingPage.path,
        children: <p>{ landingPage.text }</p>,
      });
      wrapper.find(`.${styles.overlayStyle}`).exists().should.be.false();
    });

    it('should not render overlay when navigate from / to /search', function () {
      const searchPage = {
        path: '/search/',
        text: 'search page',
      };

      const landingPage = {
        path: '/',
        text: 'landing page',
      };

      const wrapper = mount(
        <RouteTransition pathname={ landingPage.path }><p>{ landingPage.text }</p></RouteTransition>
      );

      wrapper.setProps({
        pathname: searchPage.path,
        children: <p>{ searchPage.text }</p>,
      });
      wrapper.find(`.${styles.overlayStyle}`).exists().should.be.false();
    });

    it('should not render overlay when navigate from /search to /search/alias', function () {
      const searchPage = {
        path: '/search/',
        text: 'search page',
      };

      const searchAliasPage = {
        path: '/search/alias/',
        text: 'search alias page',
      };

      const wrapper = mount(
        <RouteTransition pathname={ searchPage.path }><p>{ searchPage.text }</p></RouteTransition>
      );

      wrapper.setProps({
        pathname: searchAliasPage.path,
        children: <p>{ searchAliasPage.text }</p>,
      });
      wrapper.find(`.${styles.overlayStyle}`).exists().should.be.false();
    });

    it('should not render overlay when navigate from /officer/123/j-aeho/ to /officer/123/j-aeho/map/', function () {
      const officerPage = {
        path: '/officer/123/jaeho-jung/',
        text: 'officer page',
      };

      const officerMapPage = {
        path: '/officer/123/jaeho-jung/map/',
        text: 'officer/map page',
      };

      const wrapper = mount(
        <RouteTransition pathname={ officerPage.path }><p>{ officerPage.text }</p></RouteTransition>
      );

      wrapper.setProps({
        pathname: officerMapPage.path,
        children: <p>{ officerMapPage.text }</p>,
      });
      wrapper.find(`.${styles.overlayStyle}`).exists().should.be.false();
    });

    it('should render overlay when navigate from /officer/123/ to /complaint/234/', function () {
      const officerPage = {
        path: '/officer/123/',
        text: 'officer page',
      };

      const complaintPage = {
        path: '/complaint/234/',
        text: 'complaint page',
      };

      const wrapper = mount(
        <RouteTransition pathname={ officerPage.path }><p>{ officerPage.text }</p></RouteTransition>
      );

      wrapper.setProps({
        pathname: complaintPage.path,
        children: <p>{ complaintPage.text }</p>,
        pageLoading: true,
      });
      wrapper.find(`.${styles.overlayStyle}`).exists().should.be.true();
    });
  });
});

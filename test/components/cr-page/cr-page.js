import React from 'react';
import { spy, stub } from 'sinon';
import {
  renderIntoDocument, scryRenderedComponentsWithType, findRenderedComponentWithType
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import CRPage from 'components/cr-page';
import Header from 'components/cr-page/header';
import OfficerRow from 'components/cr-page/officer-row';
import MultiRow from 'components/cr-page/multi-row';
import FindingRow from 'components/cr-page/finding-row';
import Row from 'components/common/row';
import Location from 'components/cr-page/location';
import Attachments from 'components/cr-page/attachments';
import { unmountComponentSuppressError, reRender } from 'utils/test';


describe('CRPage component', function () {
  let instance;
  const mockStore = MockStore();
  const store = mockStore({
    breadcrumb: {
      breadcrumbs: []
    },
    headers: {
      shareableHeader: {
        scrollPosition: 'top'
      }
    }
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render complaint and officer information', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage coaccused={ [{ id: 1, fullName: 'Foo' }] } officerId={ 1 } />
      </Provider>
    );

    scryRenderedComponentsWithType(instance, OfficerRow).should.have.length(1);
    scryRenderedComponentsWithType(instance, MultiRow).should.have.length(1);
    scryRenderedComponentsWithType(instance, FindingRow).should.have.length(1);
    scryRenderedComponentsWithType(instance, Row).should.have.length(2);
    scryRenderedComponentsWithType(instance, Location).should.have.length(1);
    scryRenderedComponentsWithType(instance, Attachments).should.have.length(3);
  });

  it('should not render officer information if there is no officer', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage />
      </Provider>
    );

    scryRenderedComponentsWithType(instance, OfficerRow).should.have.length(0);
    scryRenderedComponentsWithType(instance, MultiRow).should.have.length(1);
    scryRenderedComponentsWithType(instance, FindingRow).should.have.length(1);
    scryRenderedComponentsWithType(instance, Row).should.have.length(2);
    scryRenderedComponentsWithType(instance, Location).should.have.length(1);
    scryRenderedComponentsWithType(instance, Attachments).should.have.length(3);
  });

  it('should trigger fetchCR on initial', function () {
    const fetchCR = spy();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage fetchCR={ fetchCR } crid={ '123' } />
      </Provider>
    );

    fetchCR.calledWith('123').should.be.true();
  });

  it('should reset displayCoaccusedDropdown on rerender', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage officerId={ 1 } />
      </Provider>
    );
    let crPage = findRenderedComponentWithType(instance, CRPage);
    crPage.setState({ displayCoaccusedDropdown: true });

    instance = reRender(
      <Provider store={ store }>
        <CRPage officerId={ 2 } fetchCR={ spy } />
      </Provider>, instance);
    crPage = findRenderedComponentWithType(instance, CRPage);
    crPage.state.displayCoaccusedDropdown.should.be.false();
  });

  it('should handle toggle coaccused dropdown', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage />
      </Provider>
    );
    const crPage = findRenderedComponentWithType(instance, CRPage);
    crPage.state.displayCoaccusedDropdown.should.be.false();

    const header = findRenderedComponentWithType(instance, Header);
    header.props.onDropDownButtonClick();
    crPage.state.displayCoaccusedDropdown.should.be.true();
  });

  it('should trigger fetchCR if crid changed', function () {
    const fetchCR = spy();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage crid={ '123' } />
      </Provider>
    );

    instance = reRender(
      <Provider store={ store }>
        <CRPage crid={ '456' } fetchCR={ fetchCR } />
      </Provider>, instance);
    fetchCR.calledWith('456').should.be.true();
  });

  it('should resetBreadcrumbs after the breadcrumbs is refined', function () {
    const stubResetBreadcrumbs = stub();
    const firstBreadcrumbItem = {
      component: {
        componentCacheKey: 'cr'
      },
      breadcrumbKey: 'complaint/:crid',
      url: '/complaint/1045343/8562/',
      location: {
        pathname: '/complaint/1045343/8562/',
        search: '',
        hash: '',
        action: 'PUSH',
        key: 'ilfuy5',
        query: {}
      },
      params: {
        crid: '1045343',
        officerId: '8562'
      },
      current: false
    };
    const secondBreadcrumbItem = {
      component: {
        componentCacheKey: 'cr'
      },
      breadcrumbKey: 'complaint/:crid',
      url: '/complaint/1045343/21850/',
      location: {
        pathname: '/complaint/1045343/21850/',
        search: '',
        hash: '',
        action: 'PUSH',
        key: 'unrsun',
        query: {}
      },
      params: {
        crid: '1045343',
        officerId: '21850'
      },
      current: true
    };

    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          breadcrumb={ { breadcrumbs: [firstBreadcrumbItem] } }
        />
      </Provider>
    );

    instance = reRender(
      <Provider store={ store }>
        <CRPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          breadcrumb={ { breadcrumbs: [firstBreadcrumbItem, secondBreadcrumbItem] } }
        />
      </Provider>, instance
    );
    stubResetBreadcrumbs.calledWith({ breadcrumbs: [secondBreadcrumbItem] }).should.be.true();
  });

  describe('refineBreadcrumbs', function () {
    beforeEach(function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <CRPage />
        </Provider>
      );

      instance = findRenderedComponentWithType(instance, CRPage);
    });

    it('should deduplicate the breadcrumbs when needed', function () {
      const breadcrumb = {
        breadcrumbs: [
          {
            component: {
              componentCacheKey: 'cr'
            },
            breadcrumbKey: 'complaint/:crid',
            url: '/complaint/1045343/8562/',
            location: {
              pathname: '/complaint/1045343/8562/',
              search: '',
              hash: '',
              action: 'PUSH',
              key: 'ilfuy5',
              query: {}
            },
            params: {
              crid: '1045343',
              officerId: '8562'
            },
            current: false
          },
          {
            component: {
              componentCacheKey: 'cr'
            },
            breadcrumbKey: 'complaint/:crid',
            url: '/complaint/1045343/21850/',
            location: {
              pathname: '/complaint/1045343/21850/',
              search: '',
              hash: '',
              action: 'PUSH',
              key: 'unrsun',
              query: {}
            },
            params: {
              crid: '1045343',
              officerId: '21850'
            },
            current: true
          }
        ]
      };
      const refinedBreadcrumbs = instance.refineBreadcrumb(breadcrumb);

      refinedBreadcrumbs.should.eql({
        breadcrumbs: [
          {
            component: {
              componentCacheKey: 'cr'
            },
            breadcrumbKey: 'complaint/:crid',
            url: '/complaint/1045343/21850/',
            location: {
              pathname: '/complaint/1045343/21850/',
              search: '',
              hash: '',
              action: 'PUSH',
              key: 'unrsun',
              query: {}
            },
            params: {
              crid: '1045343',
              officerId: '21850'
            },
            current: true
          }
        ]
      });
    });

    it('should leave the breadcrumbs unchanged when needed', function () {
      const breadcrumb = {
        breadcrumbs: [
          {
            component: 'Search',
            breadcrumbKey: 'search/',
            url: '/search/',
            location: {
              pathname: '/search/',
              search: '',
              hash: '',
              action: 'PUSH',
              key: '6pvlgn',
              query: {}
            },
            params: {},
            current: false
          },
          {
            component: {
              componentCacheKey: 'cr'
            },
            breadcrumbKey: 'complaint/:crid',
            url: '/complaint/108026/1642/',
            location: {
              pathname: '/complaint/108026/1642/',
              search: '',
              hash: '',
              action: 'PUSH',
              key: '2zsrk1',
              query: {}
            },
            params: {
              crid: '108026',
              officerId: '1642'
            },
            current: true
          }
        ]
      };
      const refinedBreadcrumbs = instance.refineBreadcrumb(breadcrumb);

      refinedBreadcrumbs.should.eql(breadcrumb);
    });
  });
});

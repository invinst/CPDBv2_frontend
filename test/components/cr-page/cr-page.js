import React from 'react';
import { spy, stub } from 'sinon';
import {
  renderIntoDocument, scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import CRPage from 'components/cr-page';
import OfficerRow from 'components/cr-page/officer-row';
import MultiRow from 'components/cr-page/multi-row';
import FindingRow from 'components/cr-page/finding-row';
import Row from 'components/common/row';
import Location from 'components/cr-page/location';
import Attachments from 'components/cr-page/attachments';
import { unmountComponentSuppressError, reRender } from 'utils/test';


describe('CRPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render complaint and officer information', function () {
    instance = renderIntoDocument(<CRPage coaccused={ [{ id: 1, fullName: 'Foo' }] } officerId={ 1 } />);

    scryRenderedComponentsWithType(instance, OfficerRow).should.have.length(1);
    scryRenderedComponentsWithType(instance, MultiRow).should.have.length(1);
    scryRenderedComponentsWithType(instance, FindingRow).should.have.length(1);
    scryRenderedComponentsWithType(instance, Row).should.have.length(2);
    scryRenderedComponentsWithType(instance, Location).should.have.length(1);
    scryRenderedComponentsWithType(instance, Attachments).should.have.length(3);
  });

  it('should not render officer information if there is no officer', function () {
    instance = renderIntoDocument(<CRPage />);

    scryRenderedComponentsWithType(instance, OfficerRow).should.have.length(0);
    scryRenderedComponentsWithType(instance, MultiRow).should.have.length(1);
    scryRenderedComponentsWithType(instance, FindingRow).should.have.length(1);
    scryRenderedComponentsWithType(instance, Row).should.have.length(2);
    scryRenderedComponentsWithType(instance, Location).should.have.length(1);
    scryRenderedComponentsWithType(instance, Attachments).should.have.length(3);
  });

  it('should trigger fetchCR on initial', function () {
    const fetchCR = spy();
    instance = renderIntoDocument(<CRPage fetchCR={ fetchCR } crid={ '123' } />);

    fetchCR.calledWith('123').should.be.true();
  });

  it('should trigger fetchCR if crid changed', function () {
    const fetchCR = spy();
    instance = renderIntoDocument(<CRPage crid={ '123' } />);

    instance = reRender(<CRPage crid={ '456' } fetchCR={ fetchCR } />, instance);
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
      <CRPage
        resetBreadcrumbs={ stubResetBreadcrumbs }
        breadcrumb={ { breadcrumbs: [firstBreadcrumbItem] } }
      />
    );

    instance = reRender(
      <CRPage
        resetBreadcrumbs={ stubResetBreadcrumbs }
        breadcrumb={ { breadcrumbs: [firstBreadcrumbItem, secondBreadcrumbItem] } }
      />, instance
    );
    stubResetBreadcrumbs.calledWith({ breadcrumbs: [secondBreadcrumbItem] }).should.be.true();
  });

  describe('refineBreadcrumbs', function () {
    beforeEach(function () {
      instance = renderIntoDocument(<CRPage />);
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

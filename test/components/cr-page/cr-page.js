import React from 'react';
import { spy } from 'sinon';
import MockStore from 'redux-mock-store';
import { renderIntoDocument } from 'react-addons-test-utils';
import { Provider } from 'react-redux';

import CRPage from 'components/cr-page';
import { unmountComponentSuppressError, reRender } from 'utils/test';


describe('CRPage component', function () {
  let instance;
  const store = MockStore()({
    breadcrumb: {
      breadcrumbs: []
    },
    crPage: {
      relatedComplaints: {
        relatedByCategory: {
          pagination: {},
          cards: {
            cards: []
          }
        },
        relatedByOfficer: {
          pagination: {},
          cards: {
            cards: []
          }
        }
      }
    }
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should trigger fetchCR on initial', function () {
    const fetchCR = spy();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage fetchCR={ fetchCR } crid='123' />
      </Provider>
    );

    fetchCR.calledWith('123').should.be.true();
  });

  it('should trigger fetchCR if crid changed', function () {
    const fetchCR = spy();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage crid='123' />
      </Provider>
    );

    instance = reRender(
      <Provider store={ store }>
        <CRPage crid='456' fetchCR={ fetchCR } />
      </Provider>,
      instance
    );
    fetchCR.calledWith('456').should.be.true();
  });
});

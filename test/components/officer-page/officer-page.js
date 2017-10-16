import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { Provider } from 'react-redux';
import { unmountComponentSuppressError } from 'utils/test';
import OfficerPage from 'components/officer-page';
import Header from 'components/officer-page/header';
import MockStore from 'redux-mock-store';


describe('OfficerPage component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      summary: {},
      timeline: {
        sortDescending: true,
        minimap: {
          pagination: {
            next: null,
            previous: null
          }
        },
        pagination: {
          next: null,
          previous: null
        }
      }
    }
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render header and children', function () {
    const location = { pathname: '' };
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage location={ location }>abc</OfficerPage>
      </Provider>
    );

    scryRenderedComponentsWithType(instance, Header).should.have.length(1);
    const el = findDOMNode(instance);
    el.textContent.should.containEql('abc');
  });
});

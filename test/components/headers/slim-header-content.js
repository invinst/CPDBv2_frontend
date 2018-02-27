import React from 'react';
import { Provider } from 'react-redux';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';

import { unmountComponentSuppressError } from 'utils/test';
import SlimHeaderContent from 'components/headers/slim-header/slim-header-content';


describe('SlimHeaderContent component', function () {
  let element;
  const storeMock = MockStore()({
    authentication: {},
    cms: {
      pages: {}
    },
    headers: {
      slimHeader: {
        logoSectionEditModeOn: false
      }
    }
  });

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should have correct position', function () {
    element = renderIntoDocument(
      <Provider store={ storeMock } >
        <SlimHeaderContent position='bottom'/>
      </Provider>
    );
    const header = findRenderedComponentWithType(element, SlimHeaderContent);
    header.getPosition().should.eql('bottom');
  });

  it('should set position to middle if disabled top', function () {
    element = renderIntoDocument(
      <Provider store={ storeMock } >
        <SlimHeaderContent position='top' disableTop={ true }/>
      </Provider>
    );
    const header = findRenderedComponentWithType(element, SlimHeaderContent);
    header.getPosition().should.eql('middle');
  });
});

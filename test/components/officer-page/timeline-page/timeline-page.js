import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import TimelinePage from 'components/officer-page/timeline-page';
import Timeline from 'components/officer-page/timeline-page/timeline';
import TimelineSideBar from 'components/officer-page/timeline-page/sidebar';
import { unmountComponentSuppressError } from 'utils/test';


describe('TimelinePage component', function () {
  let instance;
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      timeline: {
        items: [],
        minimap: {
          minimap: []
        },
        pagination: {
          next: null,
          previous: null
        }
      }
    }
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render SideBar and Timeline', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TimelinePage officerId={ 1 }/>
      </Provider>
    );

    scryRenderedComponentsWithType(instance, TimelineSideBar).should.have.length(1);
    scryRenderedComponentsWithType(instance, Timeline).should.have.length(1);
  });
});

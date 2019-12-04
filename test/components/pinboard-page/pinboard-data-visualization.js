import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { unmountComponentSuppressError } from 'utils/test';
import PinboardDataVisualization from 'components/pinboard-page/pinboard-data-visualization';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import AllegationsMap from 'components/common/allegations-map';


describe('PinboardDataVisualization component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    pinboardPage: {
      graphData: { requesting: false, data: {} },
      geographicData: {
        crsRequesting: false,
        trrsRequesting: false,
        mapCrsData: [
          {
            'date': '2006-09-26',
            'crid': '1000018',
            'category': 'Operation/Personnel Violations',
            'coaccused_count': 1,
            'kind': 'CR',
          },
        ],
        mapTrrsData: [
          {
            'trr_id': '123456',
            kind: 'FORCE',
            taser: false,
            'firearm_used': true,
            point: {
              lat: 35.3,
              lon: 50.5,
            },
            date: 'MAY 12, 2015',
          },
        ],
      },
    },
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render pinboard visualization correctly', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardDataVisualization
          pinboard={ { id: '1234abcd' } }
          hasMapMarker={ true }
        />
      </Provider>
    );

    findRenderedComponentWithType(instance, AnimatedSocialGraph).should.be.ok();
    findRenderedComponentWithType(instance, AllegationsMap).should.be.ok();

    const expandedModeButton = scryRenderedDOMComponentsWithClass(instance, 'expanded-mode-btn');
    expandedModeButton.should.have.length(2);
    expandedModeButton[0].href.should.containEql('/social-graph/pinboard/1234abcd/');
    expandedModeButton[1].href.should.containEql('/geographic/pinboard/1234abcd/');
  });

  it('should not render AllegationsMap if hasMapMarker is false', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardDataVisualization
          pinboard={ { id: '1234abcd' } }
          hasMapMarker={ false }
        />
      </Provider>
    );

    findRenderedComponentWithType(instance, AnimatedSocialGraph).should.be.ok();
    scryRenderedComponentsWithType(instance, AllegationsMap).should.have.length(0);
  });
});

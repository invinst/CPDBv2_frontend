import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import { unmountComponentSuppressError, reRender } from 'utils/test';

import Map from 'components/officer-page/tabbed-pane-section/map';
import mapStyles from 'components/officer-page/tabbed-pane-section/map/map.sass';
import legendStyles from 'components/officer-page/tabbed-pane-section/map/legend/legend.sass';


describe('Map component', function () {
  let instance;
  const legend = {
    allegationCount: 20,
    sustainedCount: 3,
    useOfForceCount: 1,
  };
  const markers = [{
    point: {
      lat: 42.012567,
      lon: -87.680291,
    },
    kind: 'CR',
    finding: 'Not Sustained',
    id: '123456',
    category: 'False Arrest',
    coaccused: 2,
    victims: [{
      gender: 'male',
      race: 'White',
      age: 32,
    }],
  }, {
    point: {
      lat: 42.112567,
      lon: -87.180291,
    },
    kind: 'CR',
    finding: 'Sustained',
    id: '654321',
    category: 'False Arrest',
    coaccused: 1,
    victims: [{
      gender: 'male',
      race: 'White',
      age: 32,
    }],
  }, {
    point: {
      lat: 42.212567,
      lon: -87.280291,
    },
    kind: 'FORCE',
    id: '1234',
    category: 'Use of Force Report',
  }];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render officer map and legend', function () {
    instance = renderIntoDocument(<Map legend={ legend } markers={ markers } />);
    findRenderedDOMComponentWithClass(instance, mapStyles.map);
    findRenderedDOMComponentWithClass(instance, legendStyles.legend);
  });

  it('should rerender', function () {
    instance = renderIntoDocument(<Map legend={ legend } markers={ markers } />);
    findRenderedDOMComponentWithClass(instance, mapStyles.map);
    findRenderedDOMComponentWithClass(instance, legendStyles.legend);

    instance = reRender(<Map legend={ legend } markers={ markers } />, instance);
    findRenderedDOMComponentWithClass(instance, mapStyles.map);
    findRenderedDOMComponentWithClass(instance, legendStyles.legend);
  });
});

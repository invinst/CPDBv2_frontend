import React from 'react';
import { values, concat, times } from 'lodash';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';
import { mapboxgl } from 'utils/vendors';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import AllegationsMap, { AllegationsMapWithSpinner } from 'components/common/allegations-map';
import Legend from 'components/common/allegations-map/legend';
import mapStyles from 'components/common/allegations-map/allegations-map.sass';
import legendStyles from 'components/common/allegations-map/legend/legend.sass';
import LoadingSpinner from 'components/common/loading-spinner';


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
    }]
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
    instance = renderIntoDocument(<AllegationsMap legend={ legend } markers={ markers } />);

    findRenderedDOMComponentWithClass(instance, mapStyles.map);
    findRenderedDOMComponentWithClass(instance, legendStyles.legend);
  });

  context('WithSpinner', function () {
    it('should render only loading spinner if requesting is true ', function () {
      instance = renderIntoDocument(<AllegationsMapWithSpinner legend={ legend } requesting={ true } />);

      const loadingSpinner = findRenderedComponentWithType(instance, LoadingSpinner);
      loadingSpinner.props.className.should.equal(mapStyles.allegationMapLoading);

      scryRenderedComponentsWithType(instance, AllegationsMap).should.have.length(0);
      scryRenderedComponentsWithType(instance, Legend).should.have.length(0);
      scryRenderedDOMComponentsWithClass(instance, 'map-tab').should.have.length(0);
    });

    it('should not render loading spinner if requesting is false', function () {
      instance = renderIntoDocument(<AllegationsMapWithSpinner legend={ legend } requesting={ false } />);

      scryRenderedComponentsWithType(instance, LoadingSpinner).should.have.length(0);
      findRenderedComponentWithType(instance, AllegationsMap);
    });
  });

  it('should rerender with clearAllMarkers is true', function () {
    const marker = new mapboxgl.Marker();
    marker.remove.resetHistory();
    instance = renderIntoDocument(<AllegationsMap legend={ legend } markers={ markers } />);
    findRenderedDOMComponentWithClass(instance, mapStyles.map);
    findRenderedDOMComponentWithClass(instance, legendStyles.legend);

    values(instance.currentMarkers).should.have.length(3);
    instance = reRender(<AllegationsMap legend={ legend } markers={ markers } />, instance);
    findRenderedDOMComponentWithClass(instance, mapStyles.map);
    findRenderedDOMComponentWithClass(instance, legendStyles.legend);
    marker.remove.callCount.should.equal(3);
  });

  it('should rerender with clearAllMarkers is false', function () {
    const marker = new mapboxgl.Marker();
    marker.remove.resetHistory();
    instance = renderIntoDocument(<AllegationsMap legend={ legend } markers={ markers } />);
    values(instance.currentMarkers).should.have.length(3);

    const newMarkers = [{
      point: {
        lat: 42.012567,
        lon: -87.680291,
      },
      kind: 'CR',
      finding: 'Not Sustained',
      id: '456789',
      category: 'False Arrest',
      coaccused: 1,
      victims: [{
        gender: 'male',
        race: 'White',
        age: 35,
      }]
    }];

    instance = reRender(
      <AllegationsMap legend={ legend } markers={ concat(newMarkers, markers) } clearAllMarkers={ false } />,
      instance
    );

    values(instance.currentMarkers).should.have.length(4);
    marker.remove.callCount.should.equal(0);
  });

  it('should render loadMarkersPerPages when componentDidMount', function (done) {
    const createMarker = (index) => ({
      point: {
        lat: 42.012567,
        lon: -87.680291,
      },
      id: index.toString(),
      kind: 'CR',
    });
    const markers = times(201, createMarker);
    instance = renderIntoDocument(<AllegationsMap legend={ legend } markers={ markers } />);

    setTimeout(() => {
      values(instance.currentMarkers).should.have.length(201);
      done();
    }, 100);
  });
});

import Map from 'components/officer-page/tabbed-pane-section/map';
import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';


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
  }];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render officer map', function () {
    instance = renderIntoDocument(<Map legend={ legend } markers={ markers }/>);
    scryRenderedDOMComponentsWithClass(instance, 'test--officer-map').should.have.length(1);
  });

  it('should render map legend', function () {
    instance = renderIntoDocument(<Map legend={ legend } markers={ markers }/>);
    scryRenderedDOMComponentsWithClass(instance, 'test--legend').should.have.length(1);
  });
});

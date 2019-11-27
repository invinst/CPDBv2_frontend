import React from 'react';
import { shallow, mount } from 'enzyme';
import { values, concat, times } from 'lodash';

import { mapboxgl } from 'utils/vendors';
import AllegationsMap, { AllegationsMapWithSpinner } from 'components/common/allegations-map';
import Legend from 'components/common/allegations-map/legend';
import mapStyles from 'components/common/allegations-map/allegations-map.sass';
import legendStyles from 'components/common/allegations-map/legend/legend.sass';
import LoadingSpinner from 'components/common/loading-spinner';


describe('Map component', function () {
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

  it('should render officer map and legend', function () {
    const wrapper = mount(<AllegationsMap legend={ legend } markers={ markers } />);

    wrapper.find(`.${mapStyles.map}`).exists().should.be.true();
    wrapper.find(`.${legendStyles.legend}`).exists().should.be.true();
  });

  context('WithSpinner', function () {
    it('should render only loading spinner if requesting is true ', function () {
      const wrapper = shallow(<AllegationsMapWithSpinner legend={ legend } requesting={ true } />);

      const loadingSpinner = wrapper.find(LoadingSpinner);
      loadingSpinner.prop('className').should.equal(mapStyles.allegationMapLoading);

      wrapper.find(AllegationsMap).exists().should.be.false();
      wrapper.find(Legend).exists().should.be.false();
      wrapper.find('.map-tab').should.have.length(0);
    });

    it('should not render loading spinner if requesting is false', function () {
      const wrapper = shallow(<AllegationsMapWithSpinner legend={ legend } requesting={ false } />);

      wrapper.find(LoadingSpinner).exists().should.be.false();
      wrapper.find(AllegationsMap).exists().should.be.true();
    });
  });

  it('should rerender with clearAllMarkers is true', function () {
    const marker = new mapboxgl.Marker();
    marker.remove.resetHistory();
    const wrapper = mount(<AllegationsMap legend={ legend } markers={ markers } />);
    wrapper.find(`.${mapStyles.map}`).exists().should.be.true();
    wrapper.find(`.${legendStyles.legend}`).exists().should.be.true();
    values(wrapper.instance().currentMarkers).should.have.length(3);

    wrapper.setProps({ legend, markers });
    wrapper.find(`.${mapStyles.map}`).exists().should.be.true();
    wrapper.find(`.${legendStyles.legend}`).exists().should.be.true();
    marker.remove.should.be.calledThrice();
  });

  it('should rerender with clearAllMarkers is false', function () {
    const marker = new mapboxgl.Marker();
    marker.remove.resetHistory();
    const wrapper = mount(<AllegationsMap legend={ legend } markers={ markers } />);
    values(wrapper.instance().currentMarkers).should.have.length(3);

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
      }],
    }];

    wrapper.setProps({
      legend,
      markers: concat(newMarkers, markers),
      clearAllMarkers: false,
    });

    values(wrapper.instance().currentMarkers).should.have.length(4);
    marker.remove.should.not.be.called();
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
    const wrapper = mount(<AllegationsMap legend={ legend } markers={ markers } />);

    setTimeout(() => {
      values(wrapper.instance().currentMarkers).should.have.length(201);
      done();
    }, 100);
  });
});

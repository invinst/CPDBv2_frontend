import React from 'react';
import { shallow, mount } from 'enzyme';

import CitySummary from 'components/landing-page/heat-map/summary-panel/city-summary';


describe('CitySummary component', function () {
  it('should render most common complaints', function () {
    const mostCommonComplaints = [
      {
        name: 'failure to provide service',
        count: 3,
      },
      {
        name: 'search of premise without warrant',
        count: 2,
      },
      {
        name: 'excessive force',
        count: 1,
      },
    ];
    const citySummary = {
      mostCommonComplaints,
    };

    const wrapper = mount(<CitySummary citySummary={ citySummary } />);

    mostCommonComplaints.forEach(({ name, count }) => {
      wrapper.text().should.containEql(name);
      wrapper.text().should.containEql(`${ count } allegations`);
    });
  });

  describe('city summary header', function () {
    context('start year is present', function () {
      it('should render header with start and end year', function () {
        const citySummary = {
          startYear: 1999,
          endYear: 2017,
        };

        const wrapper = shallow(<CitySummary citySummary={ citySummary } />);

        wrapper.find('.city-summary-header').text().should.equal('CHICAGO 1999 - 2017');
      });
    });

    context('start year is empty', function () {
      it('should render header without period time', function () {
        const wrapper = shallow(<CitySummary />);

        wrapper.find('.city-summary-header').text().should.equal('CHICAGO');
      });
    });
  });
});

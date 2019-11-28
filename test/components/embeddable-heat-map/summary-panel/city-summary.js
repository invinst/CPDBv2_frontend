import React from 'react';
import { mount } from 'enzyme';
import { each } from 'lodash';

import CitySummary from 'components/embeddable-heat-map/summary-panel/city-summary';


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

    const wrapper = mount(<CitySummary citySummary={ citySummary }/>);
    each(mostCommonComplaints, ({ name, count }) => {
      wrapper.text().should.containEql(name);
      wrapper.text().should.containEql(`${ count } allegations`);
    });
  });
});

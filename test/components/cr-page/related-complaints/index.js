import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import RelatedComplaints from 'components/cr-page/related-complaints';
import Dropdown from 'components/common/dropdown';


describe('RelatedComplaints component', function () {
  const store = MockStore()({
    crPage: {
      relatedComplaints: {
        relatedByCategory: {
          pagination: {},
          cards: {
            cards: [],
          },
        },
        relatedByOfficer: {
          pagination: {},
          cards: {
            cards: [],
          },
        },
      },
    },
  });

  it('should set new distance when change dropdown value', function () {
    const wrapper = shallow(
      <Provider store={ store }>
        <RelatedComplaints />
      </Provider>
    );

    const relatedComplaints = wrapper.find(RelatedComplaints).dive();
    relatedComplaints.state('selectedDistance').should.equal('0.5mi');
    const dropdown = relatedComplaints.find(Dropdown);
    dropdown.prop('onChange')('5 MILES');
    relatedComplaints.state('selectedDistance').should.equal('5mi');
  });
});

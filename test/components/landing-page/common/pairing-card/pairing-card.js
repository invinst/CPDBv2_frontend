import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import PairingCard from 'components/landing-page/common/pairing-card';
import PairingChart from 'components/landing-page/common/pairing-card/pairing-chart';
import OfficerInfo from 'components/landing-page/common/pairing-card/officer-info';


describe('PairingCard component', function () {
  let instance;
  const officer1 = {
    id: '123',
    fullName: 'Jerome Finnigan',
    birthYear: 1963,
    race: 'White',
    gender: 'Male',
  };
  const officer2 = {
    id: '456',
    fullName: 'Carl Suchocki',
    birthYear: 1973,
    race: 'White',
    gender: 'Male',
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render pairing card of two officers', function () {
    instance = renderIntoDocument(
      <PairingCard
        officer1={ officer1 }
        officer2={ officer2 }
        coaccusalCount={ 47 }
      />
    );
    findRenderedComponentWithType(instance, PairingChart);
    scryRenderedComponentsWithType(instance, OfficerInfo).should.have.length(2);
  });
});

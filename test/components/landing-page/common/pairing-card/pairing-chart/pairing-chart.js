import React from 'react';

import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import PairingChart from 'components/landing-page/common/pairing-card/pairing-chart';
import Diagram from 'components/landing-page/common/pairing-card/pairing-chart/venn-diagram';


describe('PairingChart component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render VennDiagram component and coaccusal text', function () {
    instance = renderIntoDocument(
      <PairingChart
        coaccusalCount={ 27 }
        background1={ 'black' }
        background2={ 'white' }
      />
    );
    const vennDiagram = scryRenderedComponentsWithType(instance, Diagram);
    const coaccusalText = findRenderedDOMComponentWithClass(instance, 'test--pairing-chart-coaccusal-text');
    vennDiagram.should.have.length(1);
    coaccusalText.textContent.should.eql('Coaccused 27 times');
  });
});

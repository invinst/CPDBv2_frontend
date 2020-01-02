import React from 'react';
import { shallow } from 'enzyme';
import PairingChart from 'components/landing-page/common/pairing-card/pairing-chart';
import Diagram from 'components/landing-page/common/pairing-card/pairing-chart/venn-diagram';


describe('PairingChart component', function () {
  it('should render VennDiagram component and coaccusal text', function () {
    const wrapper = shallow(
      <PairingChart
        coaccusalCount={ 27 }
        background1={ 'black' }
        background2={ 'white' }
      />
    );
    wrapper.find(Diagram).exists().should.be.true();
    const coaccusalText = wrapper.find('.pairing-chart-coaccused-text');
    coaccusalText.text().should.equal('Coaccused 27 times');
  });
});

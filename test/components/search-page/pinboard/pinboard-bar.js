import React from 'react';
import { shallow } from 'enzyme';

import PinboardBar from 'components/search-page/pinboard/pinboard-bar';
import PinboardButtonContainer from 'containers/search-page/pinboard-button-container';


describe('PinboardBar component', function () {
  it('should render correctly', function () {
    const wrapper = shallow(
      <PinboardBar isEmptyPinboard={ false } />
    );

    wrapper.prop('className').should.containEql('pinboard-feature');
    wrapper.prop('className').should.containEql('slide-in');
    wrapper.find('.pinboard-tip').exists().should.be.true();
    wrapper.find(PinboardButtonContainer).exists().should.be.true();

    wrapper.setProps({ isEmptyPinboard: true });
    wrapper.prop('className').should.not.containEql('slide-in');
  });
});

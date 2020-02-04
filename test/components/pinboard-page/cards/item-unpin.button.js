import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';


describe('ItemUnpinButton component', function () {
  it('should call onClick when cliked on', function () {
    const onClick = sinon.stub();
    const wrapper = shallow(
      <ItemUnpinButton onClick={ onClick } />
    );

    wrapper.simulate('click');
    onClick.should.be.calledOnce();
  });
});

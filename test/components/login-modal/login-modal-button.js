import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import LoginModalButton from 'components/login-modal/login-modal-button';


describe('LoginModalButton component', function () {
  it('should handle onClick', function () {
    const onClickSpy = sinon.spy();

    const wrapper = shallow(<LoginModalButton onClick={ onClickSpy }/>);
    wrapper.simulate('click');
    onClickSpy.calledOnce.should.be.true();
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { spy, stub } from 'sinon';

import { mountWithRouter } from 'utils/test';
import PinboardLink, { CONFIRM_MESSAGE } from 'components/pinboard-page/pinboard-link';


describe('PinboardLink component', function () {
  describe('render', function () {
    it('should render correctly', function () {
      const wrapper = mount(
        <PinboardLink
          className='link-classname'
          title='Link title'>
          Click here
        </PinboardLink>
      );

      const link = wrapper.find('a');
      link.prop('className').should.equal('link-classname');
      link.prop('title').should.equal('Link title');
      link.text().should.equal('Click here');
    });

    it('should render correctly with customComponent', function () {
      const wrapper = mount(
        <PinboardLink
          customComponent='div'
          className='link-classname'
          title='Link title'>
          Click here
        </PinboardLink>
      );

      const link = wrapper.find('div');
      link.prop('className').should.equal('link-classname');
      link.prop('title').should.equal('Link title');
      link.text().should.equal('Click here');
    });
  });

  describe('handleClick', function () {
    it('should show confirmation and call onClick if hasPendingChanges is true and user confirm yes', function () {
      const windowConfirmStub = stub(window, 'confirm');
      windowConfirmStub.withArgs(CONFIRM_MESSAGE).returns(true);
      const onClickSpy = spy();

      const wrapper = mountWithRouter(
        <PinboardLink
          hasPendingChanges={ true }
          onClick={ onClickSpy } />
      );

      const link = wrapper.find('a');
      link.simulate('click');
      windowConfirmStub.withArgs(CONFIRM_MESSAGE).should.be.calledOnce();
      onClickSpy.should.be.calledOnce();
    });

    it('should show confirmation and not call onClick if hasPendingChanges is true and user confirm no', function () {
      const windowConfirmStub = stub(window, 'confirm');
      windowConfirmStub.withArgs(CONFIRM_MESSAGE).returns(false);
      const onClickSpy = spy();

      const wrapper = mountWithRouter(
        <PinboardLink
          hasPendingChanges={ true }
          onClick={ onClickSpy } />
      );

      const link = wrapper.find('a');
      link.simulate('click');
      windowConfirmStub.withArgs(CONFIRM_MESSAGE).should.be.calledOnce();
      onClickSpy.should.not.be.called();
    });
  });
});

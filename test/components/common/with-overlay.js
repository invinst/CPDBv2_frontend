import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import withOverlay from 'components/common/with-overlay';
import Children from 'utils/test/components/children';


describe('withOverlay component', function () {
  const WithOverlayComponent = withOverlay(Children);

  it('should render overlay and component if isShown is true', function () {
    const handleCloseSpy = spy();
    const wrapper = shallow(
      <WithOverlayComponent isShown={ true } handleClose={ handleCloseSpy } attr='attr' />
    );

    const content = wrapper.find(Children);
    content.prop('isShown').should.be.true();
    content.prop('attr').should.equal('attr');
    content.prop('handleClose').should.equal(handleCloseSpy);

    const overlay = wrapper.find('.overlay');
    overlay.prop('aria-hidden').should.equal(false);

    overlay.simulate('click');
    handleCloseSpy.should.be.called();
  });

  it('should not render overlay isShown is false', function () {
    const handleCloseSpy = spy();
    const wrapper = shallow(
      <WithOverlayComponent isShown={ false } handleClose={ handleCloseSpy } attr='attr' />
    );

    const content = wrapper.find(Children);
    content.prop('isShown').should.be.false();
    content.prop('attr').should.equal('attr');
    content.prop('handleClose').should.equal(handleCloseSpy);

    const overlay = wrapper.find('.overlay');
    overlay.prop('aria-hidden').should.equal(true);

  });

  it('should add and remove body-not-scrollable to body when isShown changes', function () {
    const addClassListSpy = spy(document.body.classList, 'add');
    const removeClassListSpy = spy(document.body.classList, 'remove');
    const wrapper = shallow(
      <WithOverlayComponent isShown={ false } />,
      { disableLifecycleMethods: false }
    );

    wrapper.setProps({ isShown: true });
    document.body.classList.contains('body-not-scrollable').should.be.true();
    addClassListSpy.should.be.called();
    removeClassListSpy.should.not.be.called();
    addClassListSpy.resetHistory();
    removeClassListSpy.resetHistory();

    wrapper.setProps({ isShown: false });
    document.body.classList.contains('body-not-scrollable').should.be.false();
    addClassListSpy.should.not.be.called();
    removeClassListSpy.should.be.called();
    addClassListSpy.restore();
    removeClassListSpy.restore();
  });

  it('should not modify classList of body if isShown is not changed', function () {
    const addClassListSpy = spy(document.body.classList, 'add');
    const removeClassListSpy = spy(document.body.classList, 'remove');
    let wrapper = shallow(
      <WithOverlayComponent isShown={ false } />,
      { disableLifecycleMethods: false }
    );
    wrapper.setProps({ isShown: false });
    addClassListSpy.should.not.be.called();
    removeClassListSpy.should.not.be.called();
    addClassListSpy.restore();
    removeClassListSpy.restore();
  });


  it('should remove body-not-scrollable from body when unmount component', function () {
    const wrapper = shallow(
      <WithOverlayComponent isShown={ false } />,
      { disableLifecycleMethods: false }
    );

    wrapper.setProps({ isShown: true });
    document.body.classList.contains('body-not-scrollable').should.be.true();

    wrapper.unmount();
    document.body.classList.contains('body-not-scrollable').should.be.false();
  });
});

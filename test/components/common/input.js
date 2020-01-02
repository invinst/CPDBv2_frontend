import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';

import TextInput from 'components/common/input';
import * as inputStyles from 'components/common/input.style';

describe('TextInput component', function () {
  it('should trigger onBlur on blur', function () {
    const onBlurSpy = spy();

    const wrapper = shallow(
      <TextInput onBlur={ onBlurSpy }/>
    );
    const inputElement = wrapper.find('input');
    inputElement.simulate('blur');
    onBlurSpy.should.be.called();
  });

  it('should trigger onFocus on focus', function () {
    const onFocusSpy = spy();

    const wrapper = shallow(
      <TextInput onFocus={ onFocusSpy } autoFocus={ false }/>
    );
    const inputElement = wrapper.find('input');
    inputElement.simulate('focus');
    onFocusSpy.should.be.called();
  });

  it('should trigger onChange on input change', function () {
    const onChangeSpy = spy();

    const wrapper = shallow(
      <TextInput onChange={ onChangeSpy }/>
    );
    const inputElement = wrapper.find('input');
    inputElement.value = 'value';
    inputElement.simulate('change', { target: { value: 'value' } });
    onChangeSpy.should.be.called();
    inputElement.value.should.equal('value');
  });

  it('should trigger internal input focus on focus', function () {
    const onFocusSpy = spy();

    const wrapper = mount(
      <TextInput onFocus={ onFocusSpy } autoFocus={ false }/>
    );
    const instance = wrapper.instance();

    const inputFocusSpy = spy(instance.input, 'focus');

    instance.focus();
    inputFocusSpy.should.be.called();
  });

  it('should have wrapperStyle base on width and height', function () {
    const width = 1;
    const height = 1;
    const wrapperStyleStub = stub(inputStyles, 'wrapperStyle');
    wrapperStyleStub.withArgs(width, height).returns({ fontSize: '1px' });

    const wrapper = shallow(
      <TextInput width={ width } height={ height }/>
    );
    const wrapperElement = wrapper.find('div').at(0);
    wrapperElement.prop('style').fontSize.should.equal('1px');
  });

  it('should have inputStyle base on paddingVertical and paddingHorizontal', function () {
    const paddingVertical = 1;
    const paddingHorizontal = 1;
    const inputStyleStub = stub(inputStyles, 'inputStyle');
    inputStyleStub.withArgs(paddingVertical, paddingHorizontal).returns({ fontSize: '1px' });

    const wrapper = shallow(
      <TextInput paddingVertical={ paddingVertical } paddingHorizontal={ paddingHorizontal }/>
    );
    const inputElement = wrapper.find('input');
    inputElement.prop('style').fontSize.should.equal('1px');
  });

  it('should have placeholderStyle base on height, paddingVertical and paddingHorizontal', function () {
    const height = 1;
    const paddingVertical = 1;
    const paddingHorizontal = 1;
    const placeholderStyleStub = stub(inputStyles, 'placeholderStyle');
    placeholderStyleStub.withArgs(height, paddingVertical, paddingHorizontal).returns({ fontSize: '1px' });

    const wrapper = shallow(
      <TextInput height={ height } paddingVertical={ paddingVertical } paddingHorizontal={ paddingHorizontal }/>
    );
    const placeholderElement = wrapper.find('div').at(1);
    placeholderElement.prop('style').fontSize.should.equal('1px');
  });

  it('should handle keys in keyPressHandlers', function () {
    const keyPressHandlers = {
      esc: spy(),
      enter: spy(),
    };

    const wrapper = mount(
      <TextInput keyPressHandlers={ keyPressHandlers }/>
    );
    const instance = wrapper.instance();

    instance.mousetrap.trigger('esc');
    keyPressHandlers.esc.calledOnce.should.be.true();

    instance.mousetrap.trigger('enter');
    keyPressHandlers.enter.calledOnce.should.be.true();
  });

  it('should focus when receiving new focused props', function () {
    const wrapper = mount(<TextInput/>);
    const instance = wrapper.instance();
    const stubFocus = stub(instance.input, 'focus');
    stubFocus.called.should.be.false();

    stubFocus.resetHistory();
    wrapper.setProps({ focused: true });
    stubFocus.should.be.called();

    stubFocus.resetHistory();
    wrapper.setProps({ focused: true });
    stubFocus.called.should.be.false();
  });

  context('when blurOnKeyPress prop is provided', function () {
    it('should blur when an assigned key is pressed', function () {
      const wrapper = mount(
        <TextInput blurOnKeyPress={ ['down'] }/>
      );
      const instance = wrapper.instance();
      const blur = stub(instance.input, 'blur');

      instance.mousetrap.trigger('down');
      blur.calledOnce.should.be.true();
    });
  });

  context('when keyPressWithBlurHandlers prop is provided', function () {

    it('should call handlers and blur when the keys are pressed', function () {
      const keyDownHandlerStub = stub();
      const keyUpHandlerStub = stub();
      const keyPressWithBlurHandlers = {
        down: keyDownHandlerStub,
        up: keyUpHandlerStub,
      };

      const wrapper = mount(
        <TextInput keyPressWithBlurHandlers={ keyPressWithBlurHandlers }/>
      );
      const instance = wrapper.instance();
      const blur = stub(instance.input, 'blur');

      instance.mousetrap.trigger('down');
      keyDownHandlerStub.calledOnce.should.be.true();
      blur.calledOnce.should.be.true();

      wrapper.find('input').simulate('focus');
      instance.mousetrap.trigger('up');
      keyDownHandlerStub.calledOnce.should.be.true();
      blur.calledTwice.should.be.true();
    });
  });
});

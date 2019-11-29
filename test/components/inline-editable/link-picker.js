import React from 'react';
import { shallow, mount } from 'enzyme';
import should from 'should';
import { spy } from 'sinon';

import LinkPicker from 'components/inline-editable/link-picker';
import HoverableButton from 'components/common/hoverable-button';

describe('LinkPicker component', function () {
  it('should render nothing when not in edit mode', function () {
    const wrapper = shallow(
      <LinkPicker editModeOn={ false }/>,
    );
    should(wrapper.type()).be.null();
  });

  it('should render button when in edit mode', function () {
    const wrapper = shallow(
      <LinkPicker editModeOn={ true }/>,
    );
    wrapper.find(HoverableButton).exists().should.be.true();
  });

  it('should show link input when click on button', function () {
    const wrapper = mount(
      <LinkPicker editModeOn={ true }/>,
    );
    wrapper.find('a').simulate('click');
    wrapper.find('input').exists().should.be.true();
  });

  it('should trigger onChange when link is inputted', function () {
    const callback = spy();
    const wrapper = shallow(
      <LinkPicker editModeOn={ true } onChange={ callback }/>,
    );
    wrapper.setState({ open: true });
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'http://abc.com' } });
    callback.should.be.calledWith('http://abc.com');
  });

  it('should set value on link input', function () {
    const wrapper = shallow(
      <LinkPicker editModeOn={ true } value={ '123' }/>,
    );
    wrapper.setState({ open: true });
    const input = wrapper.find('input');
    input.prop('value').should.equal('123');
  });
});

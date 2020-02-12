import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';

import HoverableButton from 'components/common/hoverable-button-without-inline-style';

describe('HoverableButtonWithoutInlineStyle component', function () {
  it('should render a tag and its children', function () {
    const wrapper = shallow(
      <HoverableButton>
        <span className='test--class-name' />
      </HoverableButton>
    );

    wrapper.find('a').exists().should.be.true();
    wrapper.find('.test--class-name').exists().should.be.true();
  });

  it('should handle onClick', function () {
    const onClickStub = stub();
    const wrapper = mount(
      <HoverableButton onClick={ onClickStub }>
        <span className='test--class-name' />
      </HoverableButton>
    );

    const childComponent = wrapper.find('.test--class-name');
    childComponent.simulate('click');

    onClickStub.should.be.called();
  });

  it('should disable onClick if disabled', function () {
    const onClickStub = stub();
    const wrapper = mount(
      <HoverableButton onClick={ onClickStub } disabled={ true }>
        <span className='test--class-name' />
      </HoverableButton>
    );

    const childComponent = wrapper.find('.test--class-name');
    childComponent.simulate('click');

    onClickStub.should.not.be.called();
  });
});

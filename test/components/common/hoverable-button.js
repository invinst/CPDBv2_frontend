import React from 'react';
import { shallow } from 'enzyme';

import { HoverableButton } from 'components/common/hoverable-button';

describe('HoverableButton component', function () {
  const style = {
    hover: { color: 'red' },
    base: { color: 'blue' },
    disabled: { color: 'yellow' },
  };

  it('should render a tag', function () {
    const wrapper = shallow(<HoverableButton/>);
    wrapper.find('a').exists().should.be.true();
  });

  it('should trigger onClick', function () {
    HoverableButton.should.triggerCallbackWhenClick('onClick', 'link--transition');
  });

  it('should display hover style when hovered', function () {
    const wrapper = shallow(
      <HoverableButton hovering={ true } style={ style }/>
    );
    const aTag = wrapper.find('a');
    aTag.prop('style').color.should.equal('red');
  });

  it('should display base style when not hovered', function () {
    const wrapper = shallow(
      <HoverableButton hovering={ false } style={ style }/>
    );
    const aTag = wrapper.find('a');
    aTag.prop('style').color.should.equal('blue');
  });

  it('should display disabled style when disabled', function () {
    const wrapper = shallow(
      <HoverableButton disabled={ true } style={ style }/>
    );
    const aTag = wrapper.find('a');
    aTag.prop('style').color.should.equal('yellow');
  });

  it('should not trigger onClick when disabled', function () {
    HoverableButton.should.not.triggerCallbackWhenClick('onClick', 'link--transition', { disabled: true });
  });
});

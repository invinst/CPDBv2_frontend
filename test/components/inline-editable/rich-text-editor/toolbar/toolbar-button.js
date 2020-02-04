import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { ToolbarButton } from 'components/inline-editable/rich-text-editor/toolbar/toolbar-button';
import * as toolbarButtonStyle from 'components/inline-editable/rich-text-editor/toolbar/toolbar-button.style';


describe('ToolbarButton component', function () {
  it('should trigger onClick', function () {
    const onClickSpy = sinon.spy();
    const wrapper = shallow(
      <ToolbarButton onClick={ onClickSpy } />
    );
    const divElements = wrapper.find('div');
    divElements.at(0).simulate('click');
    onClickSpy.should.be.called();
  });

  it('should return wrapperStyle base on active and hovering', function () {
    const active = true;
    const hovering = true;
    const wrapperStyleStub = sinon.stub(toolbarButtonStyle, 'wrapperStyle');
    wrapperStyleStub.withArgs({ active, hovering }).returns({ fontSize: '14px' });
    const wrapper = shallow(
      <ToolbarButton active={ active } hovering={ hovering } />
    );
    const divElements = wrapper.find('div');
    divElements.at(0).prop('style').fontSize.should.equal('14px');
  });

  it('should return icon if active is false', function () {
    const active = false;
    const icon = 'icon';

    const iconStyleStub = sinon.stub(toolbarButtonStyle, 'iconStyle');
    iconStyleStub.withArgs(icon).returns({ fontSize: '14px' });
    const wrapper = shallow(
      <ToolbarButton active={ active } icon={ icon } />
    );
    const divElements = wrapper.find('div');
    divElements.at(1).prop('style').fontSize.should.equal('14px');
  });

  it('should return activeIcon if active is true', function () {
    const active = true;
    const activeIcon = 'activeIcon';

    const iconStyleStub = sinon.stub(toolbarButtonStyle, 'iconStyle');
    iconStyleStub.withArgs(activeIcon).returns({ fontSize: '14px' });
    const wrapper = shallow(
      <ToolbarButton active={ active } activeIcon={ activeIcon } />
    );
    const divElements = wrapper.find('div');
    divElements.at(1).prop('style').fontSize.should.equal('14px');
  });
});

import React from 'react';
import { spy, stub } from 'sinon';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { ToolbarButton } from 'components/inline-editable/rich-text-editor/toolbar/toolbar-button';
import * as toolbarButtonStyle from 'components/inline-editable/rich-text-editor/toolbar/toolbar-button.style';


describe('ToolbarButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should trigger onClick', function () {
    const onClickSpy = spy();
    instance = renderIntoDocument(
      <ToolbarButton onClick={ onClickSpy } />
    );
    const divElements = scryRenderedDOMComponentsWithTag(instance, 'div');
    Simulate.click(divElements[0]);
    onClickSpy.called.should.be.true();
  });

  it('should return wrapperStyle base on active and hovering', function () {
    const active = true;
    const hovering = true;
    const wrapperStyleStub = stub(toolbarButtonStyle, 'wrapperStyle');
    wrapperStyleStub.withArgs({ active, hovering }).returns({ fontSize: '14px' });
    instance = renderIntoDocument(
      <ToolbarButton active={ active } hovering={ hovering } />
    );
    const divElements = scryRenderedDOMComponentsWithTag(instance, 'div');
    divElements[0].style.fontSize.should.eql('14px');
    wrapperStyleStub.restore();
  });

  it('should return icon if active is false', function () {
    const active = false;
    const icon = 'icon';

    const iconStyleStub = stub(toolbarButtonStyle, 'iconStyle');
    iconStyleStub.withArgs(icon).returns({ fontSize: '14px' });
    instance = renderIntoDocument(
      <ToolbarButton active={ active } icon={ icon } />
    );
    const divElements = scryRenderedDOMComponentsWithTag(instance, 'div');
    divElements[1].style.fontSize.should.eql('14px');
    iconStyleStub.restore();
  });

  it('should return activeIcon if active is true', function () {
    const active = true;
    const activeIcon = 'activeIcon';

    const iconStyleStub = stub(toolbarButtonStyle, 'iconStyle');
    iconStyleStub.withArgs(activeIcon).returns({ fontSize: '14px' });
    instance = renderIntoDocument(
      <ToolbarButton active={ active } activeIcon={ activeIcon } />
    );
    const divElements = scryRenderedDOMComponentsWithTag(instance, 'div');
    divElements[1].style.fontSize.should.eql('14px');
    iconStyleStub.restore();
  });
});

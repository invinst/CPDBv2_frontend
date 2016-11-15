import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { HoverableButton } from 'components/common/hoverable-button';

describe('HoverableButton component', function () {
  let instance;
  const style = {
    hover: { color: 'red' },
    base: { color: 'blue' },
    disabled: { color: 'yellow' }
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render a tag', function () {
    instance = renderIntoDocument(<HoverableButton/>);
    findRenderedDOMComponentWithTag(instance, 'a');
  });

  it('should trigger onClick', function () {
    HoverableButton.should.triggerCallbackWhenClick('onClick', 'link--transition');
  });

  it('should display hover style when hovered', function () {
    instance = renderIntoDocument(
      <HoverableButton hovering={ true } style={ style }/>
    );
    const aTag = findRenderedDOMComponentWithTag(instance, 'a');
    aTag.style.getPropertyValue('color').should.eql('red');
  });

  it('should display base style when not hovered', function () {
    instance = renderIntoDocument(
      <HoverableButton hovering={ false } style={ style }/>
    );
    const aTag = findRenderedDOMComponentWithTag(instance, 'a');
    aTag.style.getPropertyValue('color').should.eql('blue');
  });

  it('should display disabled style when disabled', function () {
    instance = renderIntoDocument(
      <HoverableButton disabled={ true } style={ style }/>
    );
    const aTag = findRenderedDOMComponentWithTag(instance, 'a');
    aTag.style.getPropertyValue('color').should.eql('yellow');
  });

  it('should not trigger onClick when disabled', function () {
    HoverableButton.should.not.triggerCallbackWhenClick('onClick', 'link--transition', { disabled: true });
  });
});

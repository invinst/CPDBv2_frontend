import React from 'react';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import HoverableButton from 'components/common/hoverable-button-without-inline-style';

describe('HoverableButtonWithoutInlineStyle component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render a tag and its children', function () {
    instance = renderIntoDocument(
      <HoverableButton>
        <span className='test--class-name' />
      </HoverableButton>
    );

    findRenderedDOMComponentWithTag(instance, 'a').should.be.ok();
    findRenderedDOMComponentWithClass(instance, 'test--class-name').should.be.ok();
  });

  it('should handle onClick', function () {
    const onClickStub = stub();
    instance = renderIntoDocument(
      <HoverableButton onClick={ onClickStub }>
        <span className='test--class-name' />
      </HoverableButton>
    );

    const childComponent = findRenderedDOMComponentWithClass(instance, 'test--class-name');
    Simulate.click(childComponent);

    onClickStub.should.be.called();
  });

  it('should disable onClick if disabled', function () {
    const onClickStub = stub();
    instance = renderIntoDocument(
      <HoverableButton onClick={ onClickStub } disabled={ true }>
        <span className='test--class-name' />
      </HoverableButton>
    );

    const childComponent = findRenderedDOMComponentWithClass(instance, 'test--class-name');
    Simulate.click(childComponent);

    onClickStub.should.not.be.called();
  });
});

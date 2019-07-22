import React from 'react';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';


describe('PlusButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough content', function () {
    const onClickStub = stub();
    instance = renderIntoDocument(
      <PlusButton
        className='custom-class-name'
        onClick={ onClickStub }
      />
    );
    const element = findDOMNode(instance);
    element.getAttribute('class').should.containEql('custom-class-name');

    Simulate.click(element);
    onClickStub.should.be.calledOnce();
  });

  it('should have dark mode', function () {
    const onClickStub = stub();
    instance = renderIntoDocument(
      <PlusButton
        onClick={ onClickStub }
        darkMode={ true }
      />
    );
    const element = findDOMNode(instance);
    element.getAttribute('class').should.containEql('dark-mode');
  });
});

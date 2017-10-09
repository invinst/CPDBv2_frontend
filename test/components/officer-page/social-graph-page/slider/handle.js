import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Handle from 'components/officer-page/social-graph-page/slider/handle';


describe('Handle component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    Handle.should.be.renderable();
  });

  it('should populate aria attributes if there is a value', function () {
    instance = renderIntoDocument(
      <Handle value={ 123 } min={ 1 } max={ 200 } disabled={ false }/>
    );
    const el = findDOMNode(instance);
    el.getAttribute('aria-valuenow').should.eql('123');
    el.getAttribute('aria-valuemin').should.eql('1');
    el.getAttribute('aria-valuemax').should.eql('200');
    el.getAttribute('aria-disabled').should.eql('false');
  });

  it('should calculate horizontal position', function () {
    instance = renderIntoDocument(
      <Handle offset={ 10 }/>
    );
    const el = findDOMNode(instance);
    el.style.left.should.eql('10%');
  });

  it('should calculate vertical position', function () {
    instance = renderIntoDocument(
      <Handle offset={ 10 } vertical={ true }/>
    );
    const el = findDOMNode(instance);
    el.style.bottom.should.eql('10%');
  });

  it('should render given value', function () {
    instance = renderIntoDocument(
      <Handle value={ 456 }/>
    );
    const el = findDOMNode(instance);
    el.children[0].textContent.should.eql('456');
  });
});

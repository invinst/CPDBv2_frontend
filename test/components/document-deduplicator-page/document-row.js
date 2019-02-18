import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';

import DocumentRow from 'components/document-deduplicator-page/document-row';
import Toggle from 'components/document-deduplicator-page/document-row/toggle';
import Counter from 'components/document-deduplicator-page/document-row/counter';

describe('Document-row component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should display thumbnail if there is one', function () {
    const thumbnail = 'http://example.com/test.jpg';
    instance = renderIntoDocument(
      <DocumentRow thumbnail={ thumbnail }/>
    );

    let element = findRenderedDOMComponentWithClass(instance, 'document-thumbnail');
    element.style.backgroundImage.should.equal('url("' + thumbnail + '")');
  });

  it('should not display thumbnail if there isnt one', function () {
    instance = renderIntoDocument(
      <DocumentRow/>
    );

    let element = findRenderedDOMComponentWithClass(instance, 'document-thumbnail');
    element.style.backgroundImage.should.eql('');

  });

  it('should become faded when show is False', function () {
    instance = renderIntoDocument(
      <DocumentRow show={ false }/>
    );

    let row = findDOMNode(instance);
    row.classList.contains('document-faded').should.be.true();
    findRenderedDOMComponentWithClass(instance, 'document-title')
      .classList.contains('document-faded').should.be.true();
    findRenderedDOMComponentWithClass(instance, 'document-source')
      .classList.contains('document-faded').should.be.true();
    findRenderedDOMComponentWithClass(instance, 'document-counts')
      .classList.contains('document-faded').should.be.true();
    findRenderedDOMComponentWithClass(instance, 'document-date')
      .classList.contains('document-faded').should.be.true();
  });

  it('should display normally when show is True', function () {
    instance = renderIntoDocument(
      <DocumentRow show={ true }/>
    );

    let row = findDOMNode(instance);
    row.classList.contains('document-faded').should.be.false();
    findRenderedDOMComponentWithClass(instance, 'document-title')
      .classList.contains('document-faded').should.be.false();
    findRenderedDOMComponentWithClass(instance, 'document-source')
      .classList.contains('document-faded').should.be.false();
    findRenderedDOMComponentWithClass(instance, 'document-counts')
      .classList.contains('document-faded').should.be.false();
    findRenderedDOMComponentWithClass(instance, 'document-date')
      .classList.contains('document-faded').should.be.false();
  });

  it('should pass correct prop into Counter', function () {
    instance = renderIntoDocument(
      <DocumentRow viewsCount={ 20 } downloadsCount={ 30 }/>
    );

    let counter = findRenderedComponentWithType(instance, Counter);
    counter.props.should.containEql({
      viewsCount: 20,
      downloadsCount: 30
    });
  });

  it('should pass correct prop into Toggle', function () {
    const setDocumentShow = spy();
    instance = renderIntoDocument(
      <DocumentRow id={ 1 } show={ true } setDocumentShow={ setDocumentShow }/>
    );

    let toggle = findRenderedComponentWithType(instance, Toggle);
    toggle.props.should.containEql({
      on: true,
      children: 'show'
    });
    toggle.props.onChange(false);
    setDocumentShow.calledOnceWith(1, true).should.be.true();
  });
});

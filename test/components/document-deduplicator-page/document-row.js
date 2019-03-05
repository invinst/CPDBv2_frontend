import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  Simulate
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { spy, stub } from 'sinon';
import { browserHistory } from 'react-router';

import { unmountComponentSuppressError, renderWithContext } from 'utils/test';
import DocumentRow from 'components/document-deduplicator-page/document-row';
import Toggle from 'components/document-deduplicator-page/document-row/toggle';
import Counter from 'components/document-deduplicator-page/document-row/counter';

describe('DocumentDeduplicatorPage DocumentRow component', function () {
  let instance;

  beforeEach(function () {
    this.browserHistoryPush = stub(browserHistory, 'push');
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    this.browserHistoryPush.restore();
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
    instance = renderWithContext(
      { editModeOn: true },
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

  it('should not render Toggle component if editModeOn is false', function () {
    instance = renderWithContext(
      { editModeOn: false },
      <DocumentRow id={ 1 } show={ true }/>
    );
    scryRenderedComponentsWithType(instance, Toggle).should.have.length(0);
  });

  it('should call browserHistory.push when clicked on', function () {
    instance = renderIntoDocument(
      <DocumentRow id={ 1 } show={ true }/>
    );
    const div = findDOMNode(instance);
    Simulate.click(div);
    this.browserHistoryPush.calledWith('/document/1/').should.be.true();
  });
});

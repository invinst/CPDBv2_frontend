import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  Simulate
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { browserHistory } from 'react-router';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import DocumentRow from 'components/documents-overview-page/document-row';
import Counter from 'components/documents-overview-page/document-row/counter';
import CRLink from 'components/documents-overview-page/document-row/cr-link';


describe('DocumentsOverviewPage DocumentRow component', function () {
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

  it('should pass correct prop into CRLink', function () {
    instance = renderIntoDocument(
      <DocumentRow crid='1' documentsCount={ 2 }/>
    );

    let crLink = findRenderedComponentWithType(instance, CRLink);
    crLink.props.should.containEql({
      crid: '1',
      documentsCount: 2
    });
  });

  it('should call browserHistory.push when clicked on', function () {
    instance = renderIntoDocument(
      <DocumentRow id={ 1 } show={ true }/>
    );
    const div = findDOMNode(instance);
    Simulate.click(div);
    this.browserHistoryPush.calledWith('/tracker/document/1/').should.be.true();
  });
});

import React from 'react';
import { spy } from 'sinon';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, Simulate, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import HoverableRequestDocumentButton, {
  RequestDocumentButton
} from 'components/cr-page/attachments/request-document-button';


describe('RequestDocumentButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render "Request Documents" if not alreadyRequested', function () {
    instance = renderIntoDocument(<HoverableRequestDocumentButton alreadyRequested={ false }/>);
    findDOMNode(instance).textContent.should.containEql('Request Documents');
  });

  it('should render "Documents Requested" if alreadyRequested', function () {
    instance = renderIntoDocument(<HoverableRequestDocumentButton alreadyRequested={ true }/>);
    findDOMNode(instance).textContent.should.containEql('Documents Requested');
  });

  it('should call openRequestDocumentModal when clicked on', function () {
    const func = spy();
    instance = renderIntoDocument(
      <HoverableRequestDocumentButton alreadyRequested={ false } openRequestDocumentModal={ func }/>
    );
    instance = findRenderedComponentWithType(instance, RequestDocumentButton);
    Simulate.click(findDOMNode(instance));
    func.called.should.be.true();
  });
});

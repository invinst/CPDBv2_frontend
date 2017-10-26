import React from 'react';
import { spy } from 'sinon';
import {
  renderIntoDocument, findRenderedDOMComponentWithClass, Simulate
} from 'react-addons-test-utils';

import { unmountComponentSuppressError, renderWithContext } from 'utils/test';
import { CRItem } from 'components/officer-page/timeline-page/cr-item';


describe('CRItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    CRItem.should.be.renderable();
  });

  it('should trigger onClick and openComplaintPage when clicked on', function () {
    const openComplaintPage = spy();
    const onClick = spy();
    const officerId = 1;
    const crid = 1234;
    instance = renderWithContext({ openComplaintPage },
      <CRItem officerId={ officerId } item={ { crid } } onClick={ onClick }/>
    );
    const crItem = findRenderedDOMComponentWithClass(instance, 'test--cr-item-wrapper');
    Simulate.click(crItem);

    onClick.called.should.be.true();
    openComplaintPage.calledWith({ officerId, crid }).should.be.true();
  });

  it('should render document icon when item has document', function () {
    instance = renderIntoDocument(<CRItem item={ { hasDocument: true } }/>);
    findRenderedDOMComponentWithClass(instance, 'test--document-icon');
  });

  it('should render audio icon when item has document', function () {
    instance = renderIntoDocument(<CRItem item={ { hasAudio: true } }/>);
    findRenderedDOMComponentWithClass(instance, 'test--audio-icon');
  });
});

import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag, Simulate,
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';
import { Router, Route, createMemoryHistory } from 'react-router';

import { unmountComponentSuppressError } from 'utils/test';
import PinboardLink, { CONFIRM_MESSAGE } from 'components/pinboard-page/pinboard-link';


describe('PinboardLink component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  describe('render', function () {
    it('should render correctly', function () {
      instance = renderIntoDocument(
        <PinboardLink
          className='link-classname'
          title='Link title'>
          Click here
        </PinboardLink>
      );

      const link = findRenderedDOMComponentWithTag(instance, 'a');
      link.className.should.eql('link-classname');
      link.title.should.eql('Link title');
      link.textContent.should.eql('Click here');
    });

    it('should render correctly with customComponent', function () {
      instance = renderIntoDocument(
        <PinboardLink
          customComponent='div'
          className='link-classname'
          title='Link title'>
          Click here
        </PinboardLink>
      );

      const link = findRenderedDOMComponentWithTag(instance, 'div');
      link.className.should.eql('link-classname');
      link.title.should.eql('Link title');
      link.textContent.should.eql('Click here');
    });
  });

  describe('handleClick', function () {
    it('should call onClick if saving is false', function () {
      const onClickSpy = spy();
      const pinboardLink = () => (
        <PinboardLink
          saving={ false }
          onClick={ onClickSpy } />
      );

      instance = renderIntoDocument(
        <Router history={ createMemoryHistory() }>
          <Route path='/' component={ pinboardLink } />
        </Router>
      );

      const link = findRenderedDOMComponentWithTag(instance, 'a');
      Simulate.click(link);
      onClickSpy.should.be.calledOnce();
    });

    it('should show confirmation and call onClick if hasPendingChanges is true and user confirm yes', function () {
      const windowConfirmStub = stub(window, 'confirm');
      windowConfirmStub.withArgs(CONFIRM_MESSAGE).returns(true);
      const onClickSpy = spy();
      const pinboardLink = () => (
        <PinboardLink
          hasPendingChanges={ true }
          onClick={ onClickSpy } />
      );

      instance = renderIntoDocument(
        <Router history={ createMemoryHistory() }>
          <Route path='/' component={ pinboardLink } />
        </Router>
      );

      const link = findRenderedDOMComponentWithTag(instance, 'a');
      Simulate.click(link);
      windowConfirmStub.withArgs(CONFIRM_MESSAGE).should.be.calledOnce();
      onClickSpy.should.be.calledOnce();
      windowConfirmStub.restore();
    });

    it('should show confirmation and not call onClick if hasPendingChanges is true and user confirm no', function () {
      const windowConfirmStub = stub(window, 'confirm');
      windowConfirmStub.withArgs(CONFIRM_MESSAGE).returns(false);
      const onClickSpy = spy();
      const pinboardLink = () => (
        <PinboardLink
          hasPendingChanges={ true }
          onClick={ onClickSpy } />
      );

      instance = renderIntoDocument(
        <Router history={ createMemoryHistory() }>
          <Route path='/' component={ pinboardLink } />
        </Router>
      );

      const link = findRenderedDOMComponentWithTag(instance, 'a');
      Simulate.click(link);
      windowConfirmStub.withArgs(CONFIRM_MESSAGE).should.be.calledOnce();
      onClickSpy.should.not.be.called();
      windowConfirmStub.restore();
    });
  });
});

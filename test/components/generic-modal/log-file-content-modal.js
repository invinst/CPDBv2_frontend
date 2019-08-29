import React from 'react';
import { stub } from 'sinon';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';

import LogFileModalContent from 'components/generic-modal/log-file-modal-content';


describe('LogFileModalContent component', function () {
  it('should render log file content', function () {
    const crawler = {
      crawlerName: 'PORTAL_COPA',
      logUrl: 'https://lvh.me/log',
      recentRunAt: '2019-03-04',
    };

    let instance = renderIntoDocument(
      <LogFileModalContent crawler={ crawler } />
    );

    findRenderedDOMComponentWithClass(instance, 'modal-title').textContent.should.eql('PORTAL_COPA - 2019-03-04');
    findRenderedDOMComponentWithClass(instance, 'embed-content').getAttribute('src').should.be.eql(
      'https://lvh.me/log'
    );
  });

  it('should close model when click on close button', function () {
    const closeModalStub = stub();
    const crawler = {
      crawlerName: 'PORTAL_COPA',
      logUrl: 'https://lvh.me/log',
      recentRunAt: '2019-03-04',
    };

    let instance = renderIntoDocument(
      <LogFileModalContent crawler={ crawler } closeModal={ closeModalStub } />
    );

    const closeButton = findRenderedDOMComponentWithClass(instance, 'log-file-close-button');
    Simulate.click(closeButton);
    closeModalStub.called.should.be.true();
  });
});

import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import LogFileModalContent from 'components/generic-modal/log-file-modal-content';


describe('LogFileModalContent component', function () {
  it('should render log file content', function () {
    const crawler = {
      crawlerName: 'PORTAL_COPA',
      logUrl: 'https://lvh.me/log',
      recentRunAt: '2019-03-04'
    };

    let instance = renderIntoDocument(
      <LogFileModalContent crawler={ crawler } />
    );

    findRenderedDOMComponentWithClass(instance, 'modal-title').textContent.should.eql('PORTAL_COPA - 2019-03-04');
    findRenderedDOMComponentWithClass(instance, 'embed-content').getAttribute('src').should.be.eql(
      'https://lvh.me/log'
    );
  });
});

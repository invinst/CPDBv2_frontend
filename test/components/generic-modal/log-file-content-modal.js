import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import LogFileModalContent from 'components/generic-modal/log-file-modal-content';


describe('LogFileModalContent component', function () {
  it('should render log file content', function () {
    const crawler = {
      crawlerName: 'PORTAL_COPA',
      logUrl: 'https://lvh.me/log',
      recentRunAt: '2019-03-04',
    };

    const wrapper = shallow(
      <LogFileModalContent crawler={ crawler } />
    );

    wrapper.find('.modal-title').text().should.equal('PORTAL_COPA - 2019-03-04');
    wrapper.find('.embed-content').prop('src').should.be.eql(
      'https://lvh.me/log'
    );
  });

  it('should close model when click on close button', function () {
    const closeModalStub = sinon.stub();
    const crawler = {
      crawlerName: 'PORTAL_COPA',
      logUrl: 'https://lvh.me/log',
      recentRunAt: '2019-03-04',
    };

    const wrapper = shallow(
      <LogFileModalContent crawler={ crawler } closeModal={ closeModalStub } />
    );

    const closeButton = wrapper.find('.log-file-close-button');
    closeButton.simulate('click');
    closeModalStub.should.be.called();
  });
});

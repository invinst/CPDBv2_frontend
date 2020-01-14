import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';
import browserHistory from 'utils/history';
import { stub } from 'sinon';

import DocumentRow from 'components/documents-overview-page/document-row';
import Counter from 'components/documents-overview-page/document-row/counter';
import CRLink from 'components/documents-overview-page/document-row/cr-link';
import * as tracking from 'utils/tracking';


describe('DocumentsOverviewPage DocumentRow component', function () {
  beforeEach(function () {
    this.browserHistoryPush = stub(browserHistory, 'push');
    this.trackOutboundLink = stub(tracking, 'trackOutboundLink');
  });

  afterEach(function () {
    this.browserHistoryPush.restore();
    this.trackOutboundLink.restore();
  });

  it('should display thumbnail if there is one', function () {
    const wrapper = shallow(
      <DocumentRow thumbnail='http://example.com/test.jpg'/>
    );

    let element = wrapper.find('.document-thumbnail');
    element.prop('style').backgroundImage.should.equal('url(http://example.com/test.jpg)');
  });

  it('should not display thumbnail if there isnt one', function () {
    const wrapper = shallow(
      <DocumentRow/>
    );

    let element = wrapper.find('.document-thumbnail');
    should(element.prop('style')).be.null();

  });

  it('should pass correct prop into Counter', function () {
    const wrapper = shallow(
      <DocumentRow viewsCount={ 20 } downloadsCount={ 30 } editModeOn={ true }/>
    );

    let counter = wrapper.find(Counter);
    counter.props().should.containEql({
      viewsCount: 20,
      downloadsCount: 30,
    });
  });

  it('should pass correct prop into CRLink', function () {
    const wrapper = shallow(
      <DocumentRow crid='1' documentsCount={ 2 }/>
    );

    let crLink = wrapper.find(CRLink);
    crLink.props().should.containEql({
      crid: '1',
      documentsCount: 2,
    });
  });

  it('should call browserHistory.push when clicked on if fileType is document', function () {
    const wrapper = shallow(
      <DocumentRow id={ 1 } show={ true } fileType='document' />
    );
    wrapper.simulate('click');
    this.browserHistoryPush.should.be.calledWith('/document/1/');
    this.trackOutboundLink.called.should.be.false();
  });

  it('should call browserHistory.push when clicked on if fileType is not document', function () {
    const wrapper = shallow(
      <DocumentRow id={ 1 } show={ true } url='http://audio/link/1' fileType='audio' />
    );
    wrapper.simulate('click');
    this.browserHistoryPush.should.not.be.calledWith('http://audio/link/1');
    this.trackOutboundLink.should.be.calledWith('http://audio/link/1', '_blank');
  });

  it('should be assigned "edit-mode" class if editModeOn is true', function () {
    const wrapper = shallow(
      <DocumentRow crid='1' editModeOn={ true }/>
    );
    wrapper.prop('className').should.containEql('edit-mode');
  });
});

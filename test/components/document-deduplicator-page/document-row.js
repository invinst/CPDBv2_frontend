import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';
import { spy, stub } from 'sinon';
import { browserHistory } from 'react-router';

import DocumentRow from 'components/document-deduplicator-page/document-row';
import Toggle from 'components/document-deduplicator-page/document-row/toggle';
import Counter from 'components/document-deduplicator-page/document-row/counter';
import * as GAUtils from 'utils/google_analytics_tracking';

describe('DocumentDeduplicatorPage DocumentRow component', function () {
  beforeEach(function () {
    this.browserHistoryPush = stub(browserHistory, 'push');
    this.trackOutboundLink = stub(GAUtils, 'trackOutboundLink');
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

  it('should become faded when show is False', function () {
    const wrapper = shallow(
      <DocumentRow show={ false }/>
    );

    wrapper.prop('className').should.containEql('document-faded');
    wrapper.find('.document-title').prop('className').should.containEql('document-faded');
    wrapper.find('.document-source').prop('className').should.containEql('document-faded');
    wrapper.find('.document-counts').prop('className').should.containEql('document-faded');
    wrapper.find('.document-date').prop('className').should.containEql('document-faded');
  });

  it('should display normally when show is True', function () {
    const wrapper = shallow(
      <DocumentRow show={ true }/>
    );

    wrapper.prop('className').should.not.containEql('document-faded');
    wrapper.find('.document-title').prop('className').should.not.containEql('document-faded');
    wrapper.find('.document-source').prop('className').should.not.containEql('document-faded');
    wrapper.find('.document-counts').prop('className').should.not.containEql('document-faded');
    wrapper.find('.document-date').prop('className').should.not.containEql('document-faded');
  });

  it('should pass correct prop into Counter', function () {
    const wrapper = shallow(
      <DocumentRow viewsCount={ 20 } downloadsCount={ 30 }/>
    );

    let counter = wrapper.find(Counter);
    counter.props().should.containEql({
      viewsCount: 20,
      downloadsCount: 30,
    });
  });

  it('should pass correct prop into Toggle', function () {
    const setDocumentShow = spy();
    const wrapper = shallow(
      <DocumentRow id={ 1 } show={ true } setDocumentShow={ setDocumentShow }/>,
      { context: { editModeOn: true } }
    );

    const toggle = wrapper.find(Toggle);
    toggle.props().should.containEql({
      on: true,
      children: 'show',
    });
    toggle.prop('onChange')(false);
    setDocumentShow.calledOnceWith(1, true).should.be.true();
  });

  it('should not render Toggle component if editModeOn is false', function () {
    const wrapper = shallow(
      <DocumentRow id={ 1 } show={ true }/>,
      { context: { editModeOn: false } }
    );
    wrapper.find(Toggle).exists().should.be.false();
  });

  it('should call browserHistory.push when clicked on if fileType is document', function () {
    const wrapper = shallow(
      <DocumentRow id={ 1 } show={ true } fileType='document'/>
    );
    wrapper.simulate('click');
    this.browserHistoryPush.should.be.calledWith('/document/1/');
    this.trackOutboundLink.called.should.be.false();
  });

  it('should call browserHistory.push when clicked on if fileType is not document', function () {
    const wrapper = shallow(
      <DocumentRow id={ 1 } show={ true } url='http://audio/link/1' fileType='audio'/>
    );
    wrapper.simulate('click');
    this.browserHistoryPush.should.not.be.calledWith('http://audio/link/1');
    this.trackOutboundLink .should.be.calledWith('http://audio/link/1', '_blank');
  });
});

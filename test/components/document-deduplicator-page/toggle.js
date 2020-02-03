import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Toggle from 'components/document-deduplicator-page/document-row/toggle';


describe('DocumentDeduplicatorPage Toggle component', function () {
  it('should trigger onChange and stop propagation when clicked on', function () {
    const onChange = sinon.spy();

    const wrapper = shallow(
      <Toggle on={ true } onChange={ onChange }/>
    );

    const dummyEvent = {
      stopPropagation: sinon.stub(),
    };
    wrapper.simulate('click', dummyEvent);

    onChange.calledOnce.should.be.true();
    onChange.should.be.calledWith(true);
    dummyEvent.stopPropagation.calledOnce.should.be.true();
  });

  it('should have class toggle-on if is "on"', function () {
    const wrapper = shallow(
      <Toggle on={ true }/>
    );

    wrapper.prop('className').should.containEql('toggle-on');
  });

  it('should not have class toggle-on if is not "on"', function () {
    const wrapper = shallow(
      <Toggle on={ false }/>
    );

    wrapper.prop('className').should.not.containEql('toggle-on');
  });
});

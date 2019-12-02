import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import PinboardInfo from 'components/pinboard-page/pinboard-info';
import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


describe('PinboardInfo component', function () {
  it('should render correctly', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
    };
    const updatePinboardInfoStub = stub();

    const wrapper = shallow(
      <PinboardInfo pinboard={ pinboard } updatePinboardInfo={ updatePinboardInfoStub }/>
    );

    const autosaveTextareaInputs = wrapper.find(AutosaveTextareaInput);
    autosaveTextareaInputs.should.have.length(2);

    const pinboardTitle = autosaveTextareaInputs.at(0);
    pinboardTitle.prop('className').should.equal('pinboard-title');
    pinboardTitle.prop('value').should.equal('This is pinboard title');
    pinboardTitle.prop('placeholder').should.equal('Give your pinboard a title');
    pinboardTitle.prop('fieldType').should.equal('title');
    pinboardTitle.prop('save').should.eql(updatePinboardInfoStub);
    pinboardTitle.prop('textareaLineHeight').should.equal(31);

    const pinboardDescription = autosaveTextareaInputs.at(1);
    pinboardDescription.prop('className').should.equal('pinboard-description');
    pinboardDescription.prop('value').should.equal('This is pinboard description');
    pinboardDescription.prop('placeholder').should.eql(
      'When you’re ready, add a description for your pinboard here'
    );
    pinboardDescription.prop('fieldType').should.equal('description');
    pinboardDescription.prop('save').should.eql(updatePinboardInfoStub);
    pinboardDescription.prop('textareaLineHeight').should.equal(16);

    wrapper.find('.pinboard-title').value.should.eql(
      'This is pinboard title'
    );
    wrapper.find('.pinboard-description').value.should.eql(
      'This is pinboard description'
    );
  });
});

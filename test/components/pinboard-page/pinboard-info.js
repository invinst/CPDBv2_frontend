import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import PinboardInfo from 'components/pinboard-page/pinboard-info';
import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


describe('PinboardInfo component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
    };
    const updatePinboardInfoStub = stub();

    instance = renderIntoDocument(
      <PinboardInfo pinboard={ pinboard } updatePinboardInfo={ updatePinboardInfoStub }/>
    );

    const autosaveTextareaInputs = scryRenderedComponentsWithType(instance, AutosaveTextareaInput);
    autosaveTextareaInputs.should.have.length(2);

    const pinboardTitle = autosaveTextareaInputs[0];
    pinboardTitle.props.className.should.eql('pinboard-title');
    pinboardTitle.props.value.should.eql('This is pinboard title');
    pinboardTitle.props.placeholder.should.eql('Give your pinboard a title');
    pinboardTitle.props.fieldType.should.eql('title');
    pinboardTitle.props.save.should.eql(updatePinboardInfoStub);
    pinboardTitle.props.textareaLineHeight.should.eql(31);

    const pinboardDescription = autosaveTextareaInputs[1];
    pinboardDescription.props.className.should.eql('pinboard-description');
    pinboardDescription.props.value.should.eql('This is pinboard description');
    pinboardDescription.props.placeholder.should.eql(
      'When you’re ready, add a description for your pinboard here.'
    );
    pinboardDescription.props.fieldType.should.eql('description');
    pinboardDescription.props.save.should.eql(updatePinboardInfoStub);
    pinboardDescription.props.textareaLineHeight.should.eql(16);

    findRenderedDOMComponentWithClass(instance, 'pinboard-title').value.should.eql(
      'This is pinboard title'
    );
    findRenderedDOMComponentWithClass(instance, 'pinboard-description').value.should.eql(
      'This is pinboard description'
    );
  });
});

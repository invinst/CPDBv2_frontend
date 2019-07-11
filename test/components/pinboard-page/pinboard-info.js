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

    const autosaveTextareaInput = scryRenderedComponentsWithType(instance, AutosaveTextareaInput);
    autosaveTextareaInput.should.have.length(2);
    autosaveTextareaInput[0].props.save.should.eql(updatePinboardInfoStub);
    autosaveTextareaInput[1].props.save.should.eql(updatePinboardInfoStub);

    findRenderedDOMComponentWithClass(instance, 'pinboard-title').value.should.eql(
      'This is pinboard title'
    );
    findRenderedDOMComponentWithClass(instance, 'pinboard-description').value.should.eql(
      'This is pinboard description'
    );
  });
});

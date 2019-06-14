import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import PinboardInfo from 'components/pinboard-page/pinboard-info';
import AutosaveTextInput from 'components/common/autosave-inputs/autosave-text-input';
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

    const titleTextInput = findRenderedComponentWithType(instance, AutosaveTextInput);
    const descriptionTextareaInput = findRenderedComponentWithType(instance, AutosaveTextareaInput);
    titleTextInput.props.save.should.eql(updatePinboardInfoStub);
    descriptionTextareaInput.props.save.should.eql(updatePinboardInfoStub);

    findRenderedDOMComponentWithClass(instance, 'pinboard-title').value.should.eql(
      'This is pinboard title'
    );
    findRenderedDOMComponentWithClass(instance, 'pinboard-description').value.should.eql(
      'This is pinboard description'
    );
  });
});

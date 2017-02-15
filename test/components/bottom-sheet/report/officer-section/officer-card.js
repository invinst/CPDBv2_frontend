import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType, scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass, Simulate
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerCard from 'components/bottom-sheet/report/officer-section/officer-card';
import HoverableButton from 'components/common/hoverable-button';


describe('OfficerCard', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    instance = renderIntoDocument(<OfficerCard />);
    instance.should.be.ok();
  });

  it('should render remove officer button if edit mode is on', function () {
    instance = renderIntoDocument(<OfficerCard editModeOn={ true }/>);

    findRenderedComponentWithType(instance, HoverableButton);
  });

  it('should render indicator if edit mode off', function () {
    instance = renderIntoDocument(<OfficerCard editModeOn={ false }/>);

    scryRenderedComponentsWithType(instance, HoverableButton).length.should.be.eql(0);
  });

  it('should handle the action when we click on remove officer button', function () {
    const officerId = 1;
    const onRemoveClick = spy();
    instance = renderIntoDocument(
      <OfficerCard editModeOn={ true } officerId={ officerId } onRemoveClick={ onRemoveClick }/>
    );

    const removeButton = findRenderedDOMComponentWithClass(instance, 'test--remove-officer-button');
    Simulate.click(removeButton);
    onRemoveClick.calledWith(officerId).should.be.true();
  });

  it('should select corresponding background color for circle bases on allegationCount', function () {
    const officerId = 1;
    const allegationCount = 1;
    instance = renderIntoDocument(
      <OfficerCard editModeOn={ true } officerId={ officerId } allegationCount={ allegationCount }/>
    );
    instance.should.be.ok();
  });
});

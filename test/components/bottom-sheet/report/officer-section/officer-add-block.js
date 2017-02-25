import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType, findRenderedDOMComponentWithClass, Simulate
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerAddBlock from 'components/bottom-sheet/report/officer-section/officer-add-block';
import OfficerAutoSuggest from 'components/bottom-sheet/report/officer-section/officer-auto-suggest';


describe('OfficerAddBlock component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should save selected officer in state', function () {
    const officer = { id: 1 };
    instance = renderIntoDocument(<OfficerAddBlock/>);
    const suggestComponent = findRenderedComponentWithType(instance, OfficerAutoSuggest);
    suggestComponent.props.onChange(officer);
    instance.state.selectedOfficer.should.eql(officer);
  });

  it('should emit back selected officer', function () {
    const onChange = spy();
    const selectedOfficer = { 'id': 1 };
    instance = renderIntoDocument(<OfficerAddBlock onChange={ onChange }/>);
    instance.setState({ selectedOfficer: selectedOfficer });

    const addButton = findRenderedDOMComponentWithClass(instance, 'test--add-button');
    Simulate.click(addButton);

    onChange.calledWith(selectedOfficer).should.be.true();
  });
});

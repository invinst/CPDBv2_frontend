import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType, findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag, Simulate
} from 'react-addons-test-utils';
import AutoSuggest from 'react-autosuggest';
import { spy, stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerAutoSuggest from 'components/bottom-sheet/report/officer-section/officer-auto-suggest';


describe('OfficerAutoSuggest', function () {
  let instance;
  let officers;

  beforeEach(function () {
    officers = [{ fullName: 'foo' }];
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should return officer name as suggestion value', function () {
    instance = renderIntoDocument(<OfficerAutoSuggest officers={ officers }/>);

    instance.getSuggestionValue(officers[0]).should.be.eql('foo');
  });

  it('should handle suggestion selected', function () {
    const onChange = spy();
    instance = renderIntoDocument(<OfficerAutoSuggest officers={ officers } onChange={ onChange }/>);

    const autoSuggestComponent = findRenderedComponentWithType(instance, AutoSuggest);
    autoSuggestComponent.props.onSuggestionSelected(null, { suggestion: officers[0] });

    onChange.calledWith(officers[0]).should.be.true();
    instance.state.value.should.be.eql('foo');
  });

  it('should handle suggestions fetch request', function () {
    const searchOfficers = stub().returns(officers);

    instance = renderIntoDocument(<OfficerAutoSuggest officers={ officers } searchOfficers={ searchOfficers }/>);

    const autoSuggestComponent = findRenderedComponentWithType(instance, AutoSuggest);
    autoSuggestComponent.props.onSuggestionsFetchRequested({ value: 'bar' });

    searchOfficers.calledWith('bar').should.be.true();
  });

  it('should handle suggestion clear request', function () {
    instance = renderIntoDocument(<OfficerAutoSuggest officers={ officers } />);

    const autoSuggestComponent = findRenderedComponentWithType(instance, AutoSuggest);
    autoSuggestComponent.props.onSuggestionsClearRequested();

    instance.state.officers.should.eql([]);
  });

  it('should handle on input change', function () {
    const onChange = spy();
    const searchOfficers = stub().returns(officers);

    instance = renderIntoDocument(
      <OfficerAutoSuggest officers={ officers } onChange={ onChange } searchOfficers={ searchOfficers }/>
    );

    const inputComponent = findRenderedDOMComponentWithTag(instance, 'input');
    inputComponent.value = 'foo';
    Simulate.change(inputComponent);

    onChange.calledWith(null).should.be.true();
    instance.state.value.should.eql('foo');
    instance.state.inputHasFocus.should.be.true();
  });

  it('should handle on input blur', function () {
    instance = renderIntoDocument(<OfficerAutoSuggest officers={ officers }/>);

    const inputComponent = findRenderedDOMComponentWithTag(instance, 'input');
    Simulate.blur(inputComponent);

    instance.state.inputHasFocus.should.be.false();
  });

  it('should render a div contains officer\'s full name as suggestion', function () {
    instance = renderIntoDocument(<OfficerAutoSuggest officers={ officers } />);

    instance.renderSuggestion(officers[0]).props.children.should.eql('foo');
  });

  describe('renderSuggestionsContainer', function () {
    it('should render all children in suggestion container if children exists', function () {
      const children = <div />;
      instance = renderIntoDocument(<OfficerAutoSuggest officers={ officers } />);

      instance.renderSuggestionsContainer({ children: children }).props.should.eql({ children: children });
    });

    it('should render "No match found" if children doesn\'s exist', function () {
      instance = renderIntoDocument(<OfficerAutoSuggest officers={ officers } />);
      instance.setState({ value: 'Ke', officers: [], inputHasFocus: true });

      findRenderedDOMComponentWithClass(instance, 'test--no-match-found');
    });
  });
});

import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType,
  findRenderedDOMComponentWithClass, Simulate
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerSection from 'components/bottom-sheet/report/officer-section';
import OfficerAddBlock from 'components/bottom-sheet/report/officer-section/officer-add-block';
import OfficerCard from 'components/bottom-sheet/report/officer-section/officer-card';


describe('OfficerSection', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should update state on component receiving props', function () {
    const officers = [{ id: 1, fullName: 'Foo' }];
    const TestParent = React.createFactory(React.createClass({
      getInitialState() {
        return { value: [] };
      },
      render() {
        return (
          <OfficerSection value={ this.state.value }/>
        );
      }
    }));

    instance = renderIntoDocument(TestParent());
    let officerSection = findRenderedComponentWithType(instance, OfficerSection);
    officerSection.state.officers.should.be.empty();

    instance.setState({ value: officers });
    officerSection = findRenderedComponentWithType(instance, OfficerSection);
    officerSection.state.officers.should.eql(officers);
  });

  describe('edit mode off', function () {
    it('should show officer involved if edit mode is off', function () {
      instance = renderIntoDocument(<OfficerSection editModeOn={ false }/>);

      findRenderedDOMComponentWithClass(instance, 'test--officer-involved');
    });
  });

  describe('edit mode on', function () {
    describe('showInput property is true', function () {
      it('should show officer add block', function () {
        instance = renderIntoDocument(<OfficerSection editModeOn={ true } />);
        instance.setState({ showInput: true });

        findRenderedComponentWithType(instance, OfficerAddBlock);
      });
    });

    describe('showInput property is false', function () {
      it('should show officer involved if officers exists', function () {
        const officers = [{ id: 1, fullName: 'Foo' }];
        instance = renderIntoDocument(<OfficerSection editModeOn={ true } />);
        instance.setState({ showInput: false, officers: officers });

        findRenderedDOMComponentWithClass(instance, 'test--officer-involved');
      });

      it('should show add officer button if officers does not exists', function () {
        instance = renderIntoDocument(<OfficerSection editModeOn={ true } />);
        instance.setState({ showInput: false, officers: [] });

        findRenderedDOMComponentWithClass(instance, 'test--add-officer-button');
      });
    });
  });

  it('should handle when we click on add officer button', function () {
    instance = renderIntoDocument(<OfficerSection editModeOn={ true } />);
    instance.setState({ showInput: false, officers: [] });

    const addOfficerButton = findRenderedDOMComponentWithClass(instance, 'test--add-officer-button');
    Simulate.click(addOfficerButton);

    instance.state.showInput.should.be.true();
  });

  it('should handle when we click on cancel adding officer button', function () {
    instance = renderIntoDocument(<OfficerSection editModeOn={ true } />);
    instance.setState({ showInput: true });

    const cancelButton = findRenderedDOMComponentWithClass(instance, 'test--cancel-button');
    Simulate.click(cancelButton);

    instance.state.showInput.should.be.false();
  });

  it('should handle when new officer added', function () {
    const onChange = spy();
    const officers = [{ id: 1, fullName: 'Foo' }];
    const newOfficer = { id: 2, fullName: 'Bar' };

    instance = renderIntoDocument(<OfficerSection editModeOn={ true } value={ officers } onChange={ onChange } />);
    instance.setState({ showInput: true });

    const officerAddBlock = findRenderedComponentWithType(instance, OfficerAddBlock);
    officerAddBlock.props.onChange(newOfficer);

    const newOfficers = [{ id: 1, fullName: 'Foo' }, { id: 2, fullName: 'Bar' }];
    instance.state.officers.should.eql(newOfficers);
    instance.state.showInput.should.be.false();
    onChange.calledWith(newOfficers).should.be.true();
  });

  it('should not add officer if that officer does exists', function () {
    const onChange = spy();
    const officers = [{ id: 1, fullName: 'Foo' }];

    instance = renderIntoDocument(<OfficerSection editModeOn={ true } value={ officers } onChange={ onChange } />);
    instance.setState({ showInput: true });

    const officerAddBlock = findRenderedComponentWithType(instance, OfficerAddBlock);
    officerAddBlock.props.onChange(officers[0]);

    instance.state.officers.should.eql(officers);
  });

  it('should handle when we remove officer', function () {
    const onChange = spy();
    const officers = [{ id: 1, fullName: 'Foo' }];
    instance = renderIntoDocument(<OfficerSection editModeOn={ true } value={ officers } onChange={ onChange }/>);

    const officerCard = findRenderedComponentWithType(instance, OfficerCard);
    officerCard.props.onRemoveClick(1);

    instance.state.officers.should.be.eql([]);
    onChange.calledWith([]).should.be.true();
  });
});

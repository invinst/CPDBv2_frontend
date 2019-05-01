import React from 'react';
import { stub } from 'sinon';
import Slider from 'rc-slider';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  scryRenderedComponentsWithType,
  Simulate,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import NetworkGraph from 'components/social-graph-page/network';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import RightPaneSection from 'components/social-graph-page/network/right-pane-section';
import OfficerPane from 'components/common/preview-pane/officer-pane';
import * as intercomUtils from 'utils/intercom';


describe('NetworkGraph component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render all sections correctly', function () {
    instance = renderIntoDocument(<NetworkGraph unitId='232' title='This is a Social Graph title.'/>);

    findRenderedDOMComponentWithClass(instance, 'social-graph-title').textContent.should.eql(
      'This is a Social Graph title.'
    );
    findRenderedDOMComponentWithClass(instance, 'coaccusals-threshold-text').textContent.should.eql(
      'Minimum Coaccusal Threshold'
    );
    scryRenderedComponentsWithType(instance, AnimatedSocialGraph).should.have.length(1);
    scryRenderedComponentsWithType(instance, RightPaneSection).should.have.length(1);
    const slider = findRenderedComponentWithType(instance, Slider);
    slider.props.step.should.eql(1);
    slider.props.min.should.eql(1);
    slider.props.max.should.eql(4);
    slider.props.defaultValue.should.eql(2);
    slider.props.value.should.eql(2);
  });

  it('should call requestSocialGraphNetwork with correct unitId when componentDidMount', function () {
    const requestSocialGraphNetworkStub = stub();
    instance = renderIntoDocument(
      <NetworkGraph
        requestSocialGraphNetwork={ requestSocialGraphNetworkStub }
        unitId='232'
      />
    );
    requestSocialGraphNetworkStub.calledWith({
      'unit_id': '232',
      'threshold': 2,
      'show_civil_only': true
    }).should.be.true();
  });

  it('should call requestSocialGraphNetwork with correct officerIds when componentDidMount', function () {
    const requestSocialGraphNetworkStub = stub();
    instance = renderIntoDocument(
      <NetworkGraph
        requestSocialGraphNetwork={ requestSocialGraphNetworkStub }
        officerIds='123,456,789'
      />
    );
    requestSocialGraphNetworkStub.calledWith({
      'officer_ids': '123,456,789',
      'threshold': 2,
      'show_civil_only': true
    }).should.be.true();
  });

  it('should not call requestSocialGraphNetwork if both unitId and officerIds are missing', function () {
    const requestSocialGraphNetworkStub = stub();
    instance = renderIntoDocument(
      <NetworkGraph
        requestSocialGraphNetwork={ requestSocialGraphNetworkStub }
      />
    );
    requestSocialGraphNetworkStub.should.not.be.called();
  });

  it('should call requestSocialGraphAllegations with correct unitId when componentDidMount', function () {
    const requestSocialGraphAllegationsStub = stub();
    instance = renderIntoDocument(
      <NetworkGraph
        requestSocialGraphAllegations={ requestSocialGraphAllegationsStub }
        unitId='232'
      />
    );
    requestSocialGraphAllegationsStub.calledWith({
      'unit_id': '232',
      'threshold': 2,
      'show_civil_only': true
    }).should.be.true();
  });

  it('should call requestSocialGraphAllegations with correct officerIds when componentDidMount', function () {
    const requestSocialGraphAllegationsStub = stub();
    instance = renderIntoDocument(
      <NetworkGraph
        requestSocialGraphAllegations={ requestSocialGraphAllegationsStub }
        officerIds='123,456,789'
      />
    );
    requestSocialGraphAllegationsStub.calledWith({
      'officer_ids': '123,456,789',
      'threshold': 2,
      'show_civil_only': true
    }).should.be.true();
  });

  it('should not call requestSocialGraphAllegations if both unitId and officerIds are missing', function () {
    const requestSocialGraphAllegationsStub = stub();
    instance = renderIntoDocument(
      <NetworkGraph
        requestSocialGraphAllegations={ requestSocialGraphAllegationsStub }
      />
    );
    requestSocialGraphAllegationsStub.should.not.be.called();
  });


  it('should call requestSocialGraphOfficer with correct officerIds when componentDidMount', function () {
    const requestSocialGraphOfficersStub = stub();
    instance = renderIntoDocument(
      <NetworkGraph
        requestSocialGraphOfficers={ requestSocialGraphOfficersStub }
        officerIds='123,456,789'
      />
    );
    requestSocialGraphOfficersStub.calledWith({
      'officer_ids': '123,456,789',
      'threshold': 2,
      'show_civil_only': true
    }).should.be.true();
  });

  it('should call requestSocialGraphOfficer with correct unitId when componentDidMount', function () {
    const requestSocialGraphOfficersStub = stub();
    instance = renderIntoDocument(
      <NetworkGraph
        requestSocialGraphOfficers={ requestSocialGraphOfficersStub }
        unitId='232'
      />
    );
    requestSocialGraphOfficersStub.calledWith({
      'unit_id': '232',
      'threshold': 2,
      'show_civil_only': true
    }).should.be.true();
  });

  it('should not call requestSocialGraphOfficer if both unitId and officerIds are missing', function () {
    const requestSocialGraphOfficersStub = stub();
    instance = renderIntoDocument(
      <NetworkGraph
        requestSocialGraphOfficers={ requestSocialGraphOfficersStub }
      />
    );
    requestSocialGraphOfficersStub.should.not.be.called();
  });

  it('should hide Intercom launcher when componentDidMounted', function () {
    stub(intercomUtils, 'showIntercomLauncher');

    instance = renderIntoDocument(<NetworkGraph/>);
    intercomUtils.showIntercomLauncher.calledWith(false).should.be.true();

    intercomUtils.showIntercomLauncher.restore();
  });

  it('should add mousedown event when componentDidMounted', function () {
    stub(window, 'addEventListener');
    instance = renderIntoDocument(<NetworkGraph/>);
    window.addEventListener.should.be.calledWith('mousedown', instance.handleClickOutside);
    window.addEventListener.restore();
  });

  it('should show Intercom launcher again when componentWillUnmount', function () {
    stub(intercomUtils, 'showIntercomLauncher');

    instance = renderIntoDocument(<NetworkGraph/>);
    intercomUtils.showIntercomLauncher.resetHistory();
    unmountComponentSuppressError(instance);
    intercomUtils.showIntercomLauncher.calledWith(true).should.be.true();

    intercomUtils.showIntercomLauncher.restore();
  });

  it('should remove mousedown event when componentWillUnmount', function () {
    stub(window, 'removeEventListener');
    instance = renderIntoDocument(<NetworkGraph/>);
    unmountComponentSuppressError(instance);
    window.removeEventListener.should.be.calledWith('mousedown', instance.handleClickOutside);
    window.removeEventListener.restore();
  });

  it('should fetch data again when componentDidUpdate', function () {
    const requestSocialGraphNetworkStub = stub();
    instance = renderIntoDocument(
      <NetworkGraph
        requestSocialGraphNetwork={ requestSocialGraphNetworkStub }
        officerIds='123,456,789'
      />
    );

    requestSocialGraphNetworkStub.calledWith({
      'officer_ids': '123,456,789',
      'threshold': 2,
      'show_civil_only': true
    }).should.be.true();

    instance.setState({ 'showCivilComplaintOnly': false, thresholdValue: 3 });

    requestSocialGraphNetworkStub.calledWith({
      'officer_ids': '123,456,789',
      'threshold': 3,
      'show_civil_only': false
    }).should.be.true();
  });

  it('should update value when click on show civil only checkbox', function () {
    instance = renderIntoDocument(<NetworkGraph officerIds='123,456,789'/>);
    const showCivilOnlyCheckBox = findRenderedDOMComponentWithClass(instance, 'test--show-civil-complaint-checkbox');
    instance.state.showCivilComplaintOnly.should.be.true();

    Simulate.change(showCivilOnlyCheckBox, { target: { checked: false } });
    instance.state.showCivilComplaintOnly.should.be.false();
  });

  it('should update value when click on coaccusals threshold slider', function () {
    instance = renderIntoDocument(<NetworkGraph officerIds='123,456,789'/>);
    instance.state.thresholdValue.should.equal(2);

    const coaccusalsThresholdSlider = findRenderedComponentWithType(instance, Slider);
    coaccusalsThresholdSlider.props.onChange(3);
    instance.state.thresholdValue.should.equal(3);
  });

  it('should render officer preview-pane if there is officer', function () {
    const officer = {
      id: '123',
      fullName: 'Jerome Finnigan',
      badge: '123456',
      race: 'White',
      gender: 'Male'
    };
    instance = renderIntoDocument(<NetworkGraph officer={ officer }/>);
    scryRenderedComponentsWithType(instance, OfficerPane).should.have.length(1);
    scryRenderedComponentsWithType(instance, RightPaneSection).should.have.length(0);
  });

  it('should call updateOfficerId when clicking outside of preview-pane or officer nodes', function () {
    const updateOfficerIdStub = stub();
    instance = renderIntoDocument(<NetworkGraph updateOfficerId={ updateOfficerIdStub }/>);
    const leftSection = findRenderedDOMComponentWithClass(instance, 'left-section');
    instance.handleClickOutside({ target: findDOMNode(leftSection) });
    updateOfficerIdStub.should.be.calledWith(null);
  });

  it('should not call updateOfficerId when clicking on preview-pane or officer nodes', function () {
    const updateOfficerIdStub = stub();
    const officer = {
      id: '123',
      fullName: 'Jerome Finnigan',
      badge: '123456',
      race: 'White',
      gender: 'Male'
    };
    instance = renderIntoDocument(
      <NetworkGraph
        updateOfficerId={ updateOfficerIdStub }
        officer={ officer }
      />
    );
    const officerPane = findRenderedComponentWithType(instance, OfficerPane);
    instance.handleClickOutside({ target: findDOMNode(officerPane) });
    updateOfficerIdStub.should.not.be.called();
  });
});

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

import { unmountComponentSuppressError } from 'utils/test';
import SocialGraphPage from 'components/social-graph-page';
import AnimatedSocialGraph from 'components/social-graph-page/animated-social-graph';
import * as intercomUtils from 'utils/intercom';


describe('SocialGraphPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render all sections correctly', function () {
    instance = renderIntoDocument(<SocialGraphPage unitId='232' title='This is a Social Graph title.'/>);

    findRenderedDOMComponentWithClass(instance, 'sidenav-title').textContent.should.eql(
      'This is a Social Graph title.'
    );
    findRenderedDOMComponentWithClass(instance, 'coaccusals-threshold-text').textContent.should.eql(
      'Minimum Coaccusal Threshold'
    );
    scryRenderedComponentsWithType(instance, AnimatedSocialGraph).should.have.length(1);
    const slider = findRenderedComponentWithType(instance, Slider);
    slider.props.step.should.eql(1);
    slider.props.min.should.eql(1);
    slider.props.max.should.eql(4);
    slider.props.defaultValue.should.eql(2);
    slider.props.value.should.eql(2);
  });

  it('should call requestSocialGraph with correct unitId when componentDidMount', function () {
    const requestSocialGraphStub = stub();
    instance = renderIntoDocument(
      <SocialGraphPage
        requestSocialGraph={ requestSocialGraphStub }
        unitId='232'
      />
    );
    requestSocialGraphStub.calledWith({
      'unit_id': '232',
      'threshold': 2,
      'show_civil_only': true
    }).should.be.true();
  });

  it('should call requestSocialGraph with correct officerIds when componentDidMount', function () {
    const requestSocialGraphStub = stub();
    instance = renderIntoDocument(
      <SocialGraphPage
        requestSocialGraph={ requestSocialGraphStub }
        officerIds='123,456,789'
      />
    );
    requestSocialGraphStub.calledWith({
      'officer_ids': '123,456,789',
      'threshold': 2,
      'show_civil_only': true
    }).should.be.true();
  });

  it('should not call requestSocialGraph if both unitId and officerIds are missing', function () {
    const requestSocialGraphStub = stub();
    instance = renderIntoDocument(
      <SocialGraphPage
        requestSocialGraph={ requestSocialGraphStub }
      />
    );
    requestSocialGraphStub.should.not.be.called();
  });

  it('should hide Intercom launcher when componentDidMounted', function () {
    stub(intercomUtils, 'showIntercomLauncher');

    instance = renderIntoDocument(<SocialGraphPage/>);
    intercomUtils.showIntercomLauncher.calledWith(false).should.be.true();

    intercomUtils.showIntercomLauncher.restore();
  });

  it('should show Intercom launcher again when componentWillUnmount', function () {
    stub(intercomUtils, 'showIntercomLauncher');

    instance = renderIntoDocument(<SocialGraphPage/>);
    intercomUtils.showIntercomLauncher.resetHistory();
    unmountComponentSuppressError(instance);
    intercomUtils.showIntercomLauncher.calledWith(true).should.be.true();

    intercomUtils.showIntercomLauncher.restore();
  });

  it('should fetch data again when componentDidUpdate', function () {
    const requestSocialGraphStub = stub();
    instance = renderIntoDocument(
      <SocialGraphPage
        requestSocialGraph={ requestSocialGraphStub }
        officerIds='123,456,789'
      />
    );

    requestSocialGraphStub.calledWith({
      'officer_ids': '123,456,789',
      'threshold': 2,
      'show_civil_only': true
    }).should.be.true();

    instance.setState({ 'showCivilComplaintOnly': false, thresholdValue: 3 });

    requestSocialGraphStub.calledWith({
      'officer_ids': '123,456,789',
      'threshold': 3,
      'show_civil_only': false
    }).should.be.true();
  });

  it('should update value when click on show civil only checkbox', function () {
    instance = renderIntoDocument(<SocialGraphPage officerIds='123,456,789'/>);
    const showCivilOnlyCheckBox = findRenderedDOMComponentWithClass(instance, 'test--show-civil-complaint-checkbox');
    instance.state.showCivilComplaintOnly.should.be.true();

    Simulate.change(showCivilOnlyCheckBox, { target: { checked: false } });
    instance.state.showCivilComplaintOnly.should.be.false();
  });

  it('should update value when click on coaccusals threshold slider', function () {
    instance = renderIntoDocument(<SocialGraphPage officerIds='123,456,789'/>);
    instance.state.thresholdValue.should.equal(2);

    const coaccusalsThresholdSlider = findRenderedComponentWithType(instance, Slider);
    coaccusalsThresholdSlider.props.onChange(3);
    instance.state.thresholdValue.should.equal(3);
  });
});

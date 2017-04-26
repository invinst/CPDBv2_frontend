import React from 'react';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import IncidentAndBeginCloseSVG from 'components/cr-page/timeline/incident-beginclose-svg';


describe('IncidentAndBeginCloseSVG component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render 3 event texts', function () {
    instance = renderIntoDocument(<IncidentAndBeginCloseSVG/>);
    const texts = scryRenderedDOMComponentsWithTag(instance, 'text');
    texts.length.should.eql(3);
    texts[0].textContent.should.eql('Incident Occurs');
    texts[1].textContent.should.eql('Investigation Begins');
    texts[2].textContent.should.eql('Investigation Closed');
    scryRenderedDOMComponentsWithClass(instance, 'date').length.should.eql(0);
  });

  it('should render startDate if that is available', function () {
    instance = renderIntoDocument(<IncidentAndBeginCloseSVG startDate='2013-12-12'/>);
    const texts = scryRenderedDOMComponentsWithClass(instance, 'date');
    texts.length.should.eql(1);
    texts[0].textContent.should.eql('Dec 12, 2013');
  });

  it('should render incidentDate if that is available', function () {
    instance = renderIntoDocument(<IncidentAndBeginCloseSVG incidentDate='2013-12-12'/>
    );
    const texts = scryRenderedDOMComponentsWithClass(instance, 'date');
    texts.length.should.eql(1);
    texts[0].textContent.should.eql('Dec 12, 2013');
  });

  it('should render both dates if both dates are available', function () {
    instance = renderIntoDocument(<IncidentAndBeginCloseSVG incidentDate='2011-12-12' startDate='2013-12-12'/>);
    scryRenderedDOMComponentsWithClass(instance, 'date').length.should.eql(2);
  });
});

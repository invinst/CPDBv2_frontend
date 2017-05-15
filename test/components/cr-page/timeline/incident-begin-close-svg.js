import React from 'react';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import IncidentAndBeginAndClose from 'components/cr-page/timeline/incident-begin-close-svg';


describe('IncidentAndBeginAndCloseSVG component', function () {
  let instance;

  afterEach(function () {

    unmountComponentSuppressError(instance);
  });

  it('should render 3 event texts', function () {
    instance = renderIntoDocument(<IncidentAndBeginAndClose/>);
    const texts = scryRenderedDOMComponentsWithTag(instance, 'text');
    texts.length.should.eql(3);
    texts[0].textContent.should.eql('Incident Occurs');
    texts[1].textContent.should.eql('Investigation Begins');
    texts[2].textContent.should.eql('Investigation Closed');
  });

  it('should render 3 date if given 3 different dates', function () {
    instance = renderIntoDocument(<IncidentAndBeginAndClose startDate='2012-12-12' endDate='2013-12-12'
      incidentDate='2011-12-12'/>
    );
    const texts = scryRenderedDOMComponentsWithClass(instance, 'date');
    texts.length.should.eql(3);
    texts[0].textContent.should.eql('Dec 12, 2011');
    texts[1].textContent.should.eql('Dec 12, 2012');
    texts[2].textContent.should.eql('Dec 12, 2013');
  });

  it('should render 2 dates if missing startDate', function () {
    instance = renderIntoDocument(<IncidentAndBeginAndClose endDate='2013-12-12'
      incidentDate='2011-12-12'/>
    );
    const texts = scryRenderedDOMComponentsWithClass(instance, 'date');
    texts.length.should.eql(2);
    texts[0].textContent.should.eql('Dec 12, 2011');
    texts[1].textContent.should.eql('Dec 12, 2013');
  });

  it('should render 2 dates if missing endDate', function () {
    instance = renderIntoDocument(<IncidentAndBeginAndClose startDate='2013-12-12'
      incidentDate='2011-12-12'/>
    );
    const texts = scryRenderedDOMComponentsWithClass(instance, 'date');
    texts.length.should.eql(2);
    texts[0].textContent.should.eql('Dec 12, 2011');
    texts[1].textContent.should.eql('Dec 12, 2013');
  });

  it('should render 2 dates if missing endDate', function () {
    instance = renderIntoDocument(<IncidentAndBeginAndClose startDate='2013-12-12'
      endDate='2011-12-12'/>
    );
    const texts = scryRenderedDOMComponentsWithClass(instance, 'date');
    texts.length.should.eql(2);
    texts[0].textContent.should.eql('Dec 12, 2013');
    texts[1].textContent.should.eql('Dec 12, 2011');
  });
});

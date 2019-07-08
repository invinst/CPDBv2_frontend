import React from 'react';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithTag,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';
import { browserHistory } from 'react-router';

import { NewOfficerInfoWidget as OfficerInfoWidget } from 'components/common/preview-pane/widgets';
import { unmountComponentSuppressError } from 'utils/test';


describe('OfficerInfoWidget component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should display officer info', () => {
    instance = renderIntoDocument(
      <OfficerInfoWidget
        fullName='Timothy Parker'
        race='white'
        gender='male'
        age={ 37 }
        badge='23'
        rank='Police Officer'
        unit={ { id: 1, unitName: '018', description: 'District 018' } }
        appointedDate='JAN 7, 2017'
      />
    );
    findRenderedDOMComponentWithTag(instance, 'h1').textContent.should.eql('Timothy Parker');
    const listItem = scryRenderedDOMComponentsWithTag(instance, 'li');
    listItem.should.have.length(5);
    listItem[0].textContent.should.eql('37 year old, white, male.');
    listItem[1].textContent.should.containEql('23');
    listItem[2].textContent.should.containEql('Police Officer');
    listItem[3].textContent.should.containEql('District 018');
    listItem[4].textContent.should.containEql('JAN 7, 2017 — Present');
  });

  it('should contain resignation date when resignationDate is not null', () => {
    instance = renderIntoDocument(
      <OfficerInfoWidget
        fullName='Timothy Parker'
        race='white'
        gender='male'
        age={ 37 }
        badge='23'
        rank='Police Officer'
        unit={ { id: 1, description: 'District 003' } }
        appointedDate='JAN 7, 2017'
        resignationDate='JAN 8, 2018'
      />
    );
    const listItem = scryRenderedDOMComponentsWithTag(instance, 'li');
    listItem[4].textContent.should.containEql('JAN 7, 2017 — JAN 8, 2018');
  });

  it('should hide rank if it is null', function () {
    instance = renderIntoDocument(
      <OfficerInfoWidget
        fullName='Timothy Parker'
        age={ 37 }
        gender='Male'
        badge='23'
        unit={ { id: 1, unitName: '018', description: 'District 018' } }
        appointedDate='JAN 7, 2017'
      />
    );
    const listItem = scryRenderedDOMComponentsWithTag(instance, 'li');
    listItem.should.have.length(4);
    listItem[0].textContent.should.eql('37 year old, male.');
    listItem[1].textContent.should.containEql('23');
    listItem[2].textContent.should.containEql('District 018');
  });

  it('should hide demographic row if all age, gender, race is empty', function () {
    instance = renderIntoDocument(
      <OfficerInfoWidget
        fullName='Timothy Parker'
        badge='23'
        unit={ { id: 1, unitName: '018', description: 'District 018' } }
        appointedDate='JAN 7, 2017'
      />
    );
    const listItem = scryRenderedDOMComponentsWithTag(instance, 'li');
    listItem.should.have.length(3);
    listItem[0].textContent.should.containEql('23');
    findDOMNode(instance).textContent.should.not.containEql('year old');
  });

  it('should redirect when click on unit item', function () {
    const browserHistoryPush = stub(browserHistory, 'push');

    instance = renderIntoDocument(
      <OfficerInfoWidget
        fullName='Timothy Parker'
        badge='23'
        rank='Police Officer'
        unit={ { id: 1, unitName: '018', description: 'District 018' } }
        appointedDate='JAN 7, 2017'
      />
    );

    const unitItem = findRenderedDOMComponentWithClass(instance, 'has-link');
    Simulate.click(unitItem);
    browserHistoryPush.calledWith('/unit/018/').should.be.true();

    browserHistoryPush.restore();
  });
});

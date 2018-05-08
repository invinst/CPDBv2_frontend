import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithTag,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';


import { Link } from 'react-router';

import { OfficerInfoWidget } from 'components/search-page/preview-pane/widgets';


describe('OfficerInfoWidget component', () => {
  let instance;

  it('should display officer info', () => {
    instance = renderIntoDocument(
      <OfficerInfoWidget
        fullName='Timothy Parker'
        race='white'
        gender='male'
        age={ 37 }
        badge={ 23 }
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
    findRenderedComponentWithType(instance, Link).props.to.should.be.eql('/unit/018/');
  });

  it('should contain resignation date when resignationDate is not null', () => {
    instance = renderIntoDocument(
      <OfficerInfoWidget
        fullName='Timothy Parker'
        race='white'
        gender='male'
        age={ 37 }
        badge={ 23 }
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
        badge={ 23 }
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
        badge={ 23 }
        unit={ { id: 1, unitName: '018', description: 'District 018' } }
        appointedDate='JAN 7, 2017'
      />
    );
    const listItem = scryRenderedDOMComponentsWithTag(instance, 'li');
    listItem.should.have.length(3);
    listItem[0].textContent.should.containEql('23');
    findDOMNode(instance).textContent.should.not.containEql('year old');
  });
});

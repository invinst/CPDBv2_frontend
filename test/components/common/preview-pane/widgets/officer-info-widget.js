import React from 'react';
import { shallow } from 'enzyme';

import { OfficerInfoWidget } from 'components/common/preview-pane/widgets';


describe('OfficerInfoWidget component', function () {
  it('should display officer info', function () {
    const wrapper = shallow(
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
    wrapper.find('h1').text().should.equal('Timothy Parker');
    const listItem = wrapper.find('li');
    listItem.should.have.length(5);
    listItem.at(0).text().should.equal('37 year old, white, male.');
    listItem.at(1).text().should.containEql('23');
    listItem.at(2).text().should.containEql('Police Officer');
    listItem.at(3).text().should.containEql('District 018');
    listItem.at(4).text().should.containEql('JAN 7, 2017 — Present');
  });

  it('should contain resignation date when resignationDate is not null', function () {
    const wrapper = shallow(
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
    const listItem = wrapper.find('li');
    listItem.at(4).text().should.containEql('JAN 7, 2017 — JAN 8, 2018');
  });

  it('should hide rank if it is null', function () {
    const wrapper = shallow(
      <OfficerInfoWidget
        fullName='Timothy Parker'
        age={ 37 }
        gender='Male'
        badge='23'
        unit={ { id: 1, unitName: '018', description: 'District 018' } }
        appointedDate='JAN 7, 2017'
      />
    );
    const listItem = wrapper.find('li');
    listItem.should.have.length(4);
    listItem.at(0).text().should.equal('37 year old, male.');
    listItem.at(1).text().should.containEql('23');
    listItem.at(2).text().should.containEql('District 018');
  });

  it('should hide demographic row if all age, gender, race is empty', function () {
    const wrapper = shallow(
      <OfficerInfoWidget
        fullName='Timothy Parker'
        badge='23'
        unit={ { id: 1, unitName: '018', description: 'District 018' } }
        appointedDate='JAN 7, 2017'
      />
    );
    const listItem = wrapper.find('li');
    listItem.should.have.length(3);
    listItem.at(0).text().should.containEql('23');
    wrapper.text().should.not.containEql('year old');
  });
});

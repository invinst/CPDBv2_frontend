import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import should from 'should';

import { mountWithRouter } from 'utils/test';
import OfficerSection from 'components/trr-page/officer-section';
import StaticRadarChart from 'components/common/radar-chart';
import NavigationButton from 'components/trr-page/officer-section/navigation-button';
import Item from 'components/trr-page/officer-section/item';
import LinkItem from 'components/trr-page/officer-section/link-item';
import OfficerRow from 'components/trr-page/officer-section/officer-row';


describe('OfficerSection component', function () {
  const officer = {
    officerId: 123,
    rank: 'Police Officer',
    fullName: 'Ronald Watts',
    unitName: '001',
    unitDescription: 'Unit 001',
    birthYear: 1960,
    yearOld: 57,
    race: 'White',
    gender: 'Male',
    careerDuration: 'DEC 13, 1999 — DEC 23, 2015',
    percentile: {
      year: undefined,
      items: [
        { axis: 'Use of Force Reports', value: 99.9 },
        { axis: 'Officer Allegations', value: 11.1 },
        { axis: 'Civilian Allegations', value: 22.2 },
      ],
      visualTokenBackground: '#ed6154',
      textColor: '#231F20',
    },
    assignedBeat: 'Beat 1',
    onDuty: true,
    inUniform: true,
  };

  it('should render officer title correctly', function () {
    const wrapper = mountWithRouter(
      <OfficerSection officer={ officer }/>
    );
    const radarChart = wrapper.find(StaticRadarChart);
    radarChart.prop('data').should.eql([
      { axis: 'Use of Force Reports', value: 99.9 },
      { axis: 'Officer Allegations', value: 11.1 },
      { axis: 'Civilian Allegations', value: 22.2 },
    ]);

    wrapper.find('.trr-officer-full-name').text().should.equal('Ronald Watts');

    const navigationButtons = wrapper.find(NavigationButton);
    navigationButtons.should.have.length(2);

    const officerProfileButton = navigationButtons.at(0);
    officerProfileButton.prop('text').should.equal('View Profile');

    const officerRow = wrapper.find(OfficerRow);
    officerRow.prop('rank').should.equal('Police Officer');
    officerRow.find(Link).prop('to').should.equal('/officer/123/ronald-watts/');
  });

  it('should render officer info correctly', function () {
    const wrapper = mountWithRouter(
      <OfficerSection officer={ officer }/>
    );

    const items = wrapper.find(Item);
    items.should.have.length(7);
    const yearOfBirth = items.at(0);
    const race = items.at(1);
    const assignedBeat = items.at(2);
    const sex = items.at(3);
    const onDuty = items.at(4);
    const career = items.at(5);
    const inUniform = items.at(6);

    yearOfBirth.prop('title').should.equal('year of birth');
    race.prop('title').should.equal('race');
    assignedBeat.prop('title').should.equal('assigned beat');
    sex.prop('title').should.equal('sex');
    onDuty.prop('title').should.equal('on duty');
    career.prop('title').should.equal('career');
    inUniform.prop('title').should.equal('in uniform');

    yearOfBirth.prop('value').should.equal(1960);
    race.prop('value').should.equal('White');
    assignedBeat.prop('value').should.equal('Beat 1');
    sex.prop('value').should.equal('Male');
    onDuty.prop('value').should.equal('Yes');
    career.prop('value').should.equal('DEC 13, 1999 — DEC 23, 2015');
    inUniform.prop('value').should.equal('Yes');

    yearOfBirth.prop('subValue').should.equal('57 years old');
    should(race.props.subValue).be.undefined();
    should(assignedBeat.props.subValue).be.undefined();
    should(sex.props.subValue).be.undefined();
    should(onDuty.props.subValue).be.undefined();
    should(career.props.subValue).be.undefined();
    should(inUniform.props.subValue).be.undefined();

    const unit = wrapper.find(LinkItem);
    unit.prop('title').should.equal('unit');
    unit.prop('value').should.equal('Unit 001');
    unit.prop('to').should.equal('/unit/001/');
    const unitProfileButton = unit.find(NavigationButton);
    unitProfileButton.prop('text').should.equal('View Unit');
  });

  it('should render officer correctly in missing data case', function () {
    const missingDataOfficer = {
      officerId: 123,
      fullName: 'Ronald Watts',
      unitName: '001',
      unitDescription: null,
      birthYear: undefined,
      yearOld: undefined,
      race: 'White',
      gender: 'Male',
      careerDuration: 'DEC 13, 1999 — DEC 23, 2015',
      percentile: {
        year: undefined,
        items: [
          { axis: 'Use of Force Reports', value: 99.9 },
          { axis: 'Officer Allegations', value: 11.1 },
          { axis: 'Civilian Allegations', value: 22.2 },
        ],
        visualTokenBackground: '#ed6154',
        textColor: '#231F20',
      },
      assignedBeat: 'Beat 1',
      onDuty: false,
      inUniform: false,
    };
    const wrapper = shallow(
      <OfficerSection officer={ missingDataOfficer }/>
    );
    const items = wrapper.find(Item);

    items.should.have.length(7);

    const yearOfBirth = items.at(0);
    const onDuty = items.at(4);
    const inUniform = items.at(6);

    yearOfBirth.prop('value').should.equal('');
    yearOfBirth.prop('subValue').should.equal('');

    onDuty.prop('value').should.equal('No');
    inUniform.prop('value').should.equal('No');

    const unit = wrapper.find(LinkItem);
    unit.prop('value').should.equal('001');
  });
});

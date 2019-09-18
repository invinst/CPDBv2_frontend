import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { Link } from 'react-router';
import should from 'should';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerSection from 'components/trr-page/officer-section';
import StaticRadarChart from 'components/common/radar-chart';
import NavigationButton from 'components/trr-page/officer-section/navigation-button';
import Item from 'components/trr-page/officer-section/item';
import LinkItem from 'components/trr-page/officer-section/link-item';
import OfficerRow from 'components/trr-page/officer-section/officer-row';


describe('OfficerSection component', function () {
  let instance;
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

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render officer title correctly', function () {
    instance = renderIntoDocument(<OfficerSection officer={ officer }/>);
    const radarChart = findRenderedComponentWithType(instance, StaticRadarChart);
    radarChart.props.data.should.eql([
      { axis: 'Use of Force Reports', value: 99.9 },
      { axis: 'Officer Allegations', value: 11.1 },
      { axis: 'Civilian Allegations', value: 22.2 },
    ]);

    findRenderedDOMComponentWithClass(instance, 'trr-officer-full-name').textContent.should.eql('Ronald Watts');

    const navigationButtons = scryRenderedComponentsWithType(instance, NavigationButton);
    navigationButtons.should.have.length(2);

    const officerProfileButton = navigationButtons[0];
    officerProfileButton.props.text.should.eql('View Profile');

    const officerRow = findRenderedComponentWithType(instance, OfficerRow);
    officerRow.props.rank.should.eql('Police Officer');
    findRenderedComponentWithType(officerRow, Link).props.to.should.eql('/officer/123/ronald-watts/');
  });

  it('should render officer info correctly', function () {
    instance = renderIntoDocument(<OfficerSection officer={ officer }/>);

    const items = scryRenderedComponentsWithType(instance, Item);
    items.should.have.length(7);
    const yearOfBirth = items[0];
    const race = items[1];
    const assignedBeat = items[2];
    const sex = items[3];
    const onDuty = items[4];
    const career = items[5];
    const inUniform = items[6];

    yearOfBirth.props.title.should.eql('year of birth');
    race.props.title.should.eql('race');
    assignedBeat.props.title.should.eql('assigned beat');
    sex.props.title.should.eql('sex');
    onDuty.props.title.should.eql('on duty');
    career.props.title.should.eql('career');
    inUniform.props.title.should.eql('in uniform');

    yearOfBirth.props.value.should.eql(1960);
    race.props.value.should.eql('White');
    assignedBeat.props.value.should.eql('Beat 1');
    sex.props.value.should.eql('Male');
    onDuty.props.value.should.eql('Yes');
    career.props.value.should.eql('DEC 13, 1999 — DEC 23, 2015');
    inUniform.props.value.should.eql('Yes');

    yearOfBirth.props.subValue.should.eql('57 years old');
    should(race.props.subValue).be.undefined();
    should(assignedBeat.props.subValue).be.undefined();
    should(sex.props.subValue).be.undefined();
    should(onDuty.props.subValue).be.undefined();
    should(career.props.subValue).be.undefined();
    should(inUniform.props.subValue).be.undefined();

    const unit = findRenderedComponentWithType(instance, LinkItem);
    unit.props.title.should.eql('unit');
    unit.props.value.should.eql('Unit 001');
    unit.props.to.should.eql('/unit/001/');
    const unitProfileButton = findRenderedComponentWithType(unit, NavigationButton);
    unitProfileButton.props.text.should.eql('View Unit');
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
    instance = renderIntoDocument(<OfficerSection officer={ missingDataOfficer }/>);
    const items = scryRenderedComponentsWithType(instance, Item);

    items.should.have.length(7);

    const yearOfBirth = items[0];
    const onDuty = items[4];
    const inUniform = items[6];

    yearOfBirth.props.value.should.eql('');
    yearOfBirth.props.subValue.should.eql('');

    onDuty.props.value.should.eql('No');
    inUniform.props.value.should.eql('No');

    const unit = findRenderedComponentWithType(instance, LinkItem);
    unit.props.value.should.eql('001');
  });
});

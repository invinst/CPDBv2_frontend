import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import should from 'should';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerSection from 'components/trr-page/officer-section';
import StaticRadarChart from 'components/common/radar-chart';
import NavigationButton from 'components/trr-page/officer-section/navigation-button';
import Item from 'components/trr-page/officer-section/item';


describe('OfficerSection component', function () {
  let instance;
  const officer = {
    officerId: 123,
    fullName: 'Ronald Watts',
    unitName: '001',
    unitDescription: 'Unit 001',
    birthYear: 1960,
    yearOld: 57,
    race: 'White',
    gender: 'Male',
    careerDuration: 'DEC 13, 1999—DEC 23, 2015',
    percentile: {
      officerId: undefined,
      year: undefined,
      items: [
        { axis: 'Use of Force Reports', value: 99.9 },
        { axis: 'Internal Allegations', value: 11.1 },
        { axis: 'Civilian Allegations', value: 22.2 }
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
      { axis: 'Internal Allegations', value: 11.1 },
      { axis: 'Civilian Allegations', value: 22.2 }
    ]);

    findRenderedDOMComponentWithClass(instance, 'test--officer-full-name').textContent.should.eql('Ronald Watts');

    const navigationButtons = scryRenderedComponentsWithType(instance, NavigationButton);
    navigationButtons.should.have.length(2);

    const officerProfileButton = navigationButtons[0];
    officerProfileButton.props.text.should.eql('View Profile');
    officerProfileButton.props.to.should.eql('/officer/123/');
  });

  it('should render officer info correctly', function () {
    instance = renderIntoDocument(<OfficerSection officer={ officer }/>);
    const items = scryRenderedComponentsWithType(instance, Item);
    items.should.have.length(8);

    const yearOfBirth = items[0];
    const unit = items[1];
    const race = items[2];
    const assignedBeat = items[3];
    const sex = items[4];
    const onDuty = items[5];
    const career = items[6];
    const inUniform = items[7];

    yearOfBirth.props.title.should.eql('YEAR OF BIRTH');
    unit.props.title.should.eql('UNIT');
    race.props.title.should.eql('RACE');
    assignedBeat.props.title.should.eql('ASSIGNED BEAT');
    sex.props.title.should.eql('SEX');
    onDuty.props.title.should.eql('ON DUTY');
    career.props.title.should.eql('CAREER');
    inUniform.props.title.should.eql('IN UNIFORM');

    yearOfBirth.props.value.should.eql(1960);
    unit.props.value.should.eql('Unit 001');
    race.props.value.should.eql('White');
    assignedBeat.props.value.should.eql('Beat 1');
    sex.props.value.should.eql('Male');
    onDuty.props.value.should.eql('Yes');
    career.props.value.should.eql('DEC 13, 1999—DEC 23, 2015');
    inUniform.props.value.should.eql('Yes');

    const unitProfileButton = findRenderedComponentWithType(unit, NavigationButton);
    unitProfileButton.props.text.should.eql('View Unit');
    unitProfileButton.props.to.should.eql('/unit/001/');

    should(yearOfBirth.props.extraComponent).be.undefined();
    should(race.props.extraComponent).be.undefined();
    should(assignedBeat.props.extraComponent).be.undefined();
    should(sex.props.extraComponent).be.undefined();
    should(onDuty.props.extraComponent).be.undefined();
    should(career.props.extraComponent).be.undefined();
    should(inUniform.props.extraComponent).be.undefined();

    yearOfBirth.props.subValue.should.eql('57 years old');

    should(unit.props.subValue).be.undefined();
    should(race.props.subValue).be.undefined();
    should(assignedBeat.props.subValue).be.undefined();
    should(sex.props.subValue).be.undefined();
    should(onDuty.props.subValue).be.undefined();
    should(career.props.subValue).be.undefined();
    should(inUniform.props.subValue).be.undefined();
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
      careerDuration: 'DEC 13, 1999—DEC 23, 2015',
      percentile: {
        officerId: undefined,
        year: undefined,
        items: [
          { axis: 'Use of Force Reports', value: 99.9 },
          { axis: 'Internal Allegations', value: 11.1 },
          { axis: 'Civilian Allegations', value: 22.2 }
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

    items.should.have.length(8);

    const yearOfBirth = items[0];
    const unit = items[1];
    const onDuty = items[5];
    const inUniform = items[7];

    yearOfBirth.props.value.should.eql('');
    yearOfBirth.props.subValue.should.eql('');

    unit.props.value.should.eql('001');

    onDuty.props.value.should.eql('No');
    inUniform.props.value.should.eql('No');
  });
});

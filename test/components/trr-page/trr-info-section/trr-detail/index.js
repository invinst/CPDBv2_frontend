import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import TRRDetail from 'components/trr-page/trr-info-section/trr-detail';
import Row from 'components/trr-page/trr-info-section/trr-detail/row';
import Demographics from 'components/common/demographics';


describe('TRRDetail component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render 3 Rows with correct order', function () {
    const trrDetail = {
      subjectDemographic: 'Black, Male, 21 years old',
      category: 'Other',
      forceTypes: ['Stiffened (Dead Weight)', 'Did Not Follow Verbal Direction', 'Imminent Threat Of Battery'],
    };

    instance = renderIntoDocument(<TRRDetail{ ...trrDetail }/>);

    const rows = scryRenderedComponentsWithType(instance, Row);
    const subjectRow = rows[0];
    const categoryRow = rows[1];
    const forceTypeRow = rows[2];

    subjectRow.props.title.should.eql('SUBJECT');
    subjectRow.props.drawBorder.should.be.true();
    subjectRow.props.borderValue.should.be.true();
    findRenderedComponentWithType(subjectRow, Demographics).props.persons.should.eql(['Black, Male, 21 years old']);

    categoryRow.props.title.should.eql('FORCE CATEGORY');
    categoryRow.props.drawBorder.should.be.true();
    categoryRow.props.borderValue.should.be.false();
    categoryRow.props.children.should.eql('Other');

    forceTypeRow.props.title.should.eql('TYPES OF FORCE');
    forceTypeRow.props.drawBorder.should.be.false();
    forceTypeRow.props.borderValue.should.be.false();
    forceTypeRow.props.children.should.eql(
      'Stiffened (Dead Weight) ← Did Not Follow Verbal Direction ← Imminent Threat Of Battery'
    );
  });

  it('should handle if the forceTypes is undefined', function () {
    const trrDetail = {
      subjectDemographic: 'Black, Male, 21 years old',
      category: 'Other',
    };

    instance = renderIntoDocument(<TRRDetail{ ...trrDetail }/>);
    const rows = scryRenderedComponentsWithType(instance, Row);
    const forceTypeRow = rows[2];

    forceTypeRow.props.children.should.eql('');
  });

  it('should handle if the subjectDemographic is undefined', function () {
    const trrDetail = {
      category: 'Other',
      forceTypes: ['Stiffened (Dead Weight)'],
    };
    instance = renderIntoDocument(<TRRDetail{ ...trrDetail }/>);
    const rows = scryRenderedComponentsWithType(instance, Row);
    const subjectRow = rows[0];

    subjectRow.props.borderValue.should.be.false();
    scryRenderedComponentsWithType(subjectRow, Demographics).should.have.length(0);
  });
});

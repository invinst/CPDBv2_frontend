import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError, renderWithContext } from 'utils/test';
import { TRRPage } from 'components/trr-page';
import OfficerSection from 'components/trr-page/officer-section';
import TRRInfoSection from 'components/trr-page/trr-info-section';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import FooterContainer from 'containers/footer-container';
import TRRPageContainer from 'containers/trr-page';
import PrintNotes from 'components/common/print-notes';
import MarkdownLink from 'components/common/markdown-renderers/markdown-link';


describe('TRRPage component', function () {
  let instance;
  const popups = [{
    name: 'force_category',
    page: 'trr',
    title: 'Force Category',
    text: 'See CPD\'s official [Use of Force Model]' +
      '(http://directives.chicagopolice.org/directives/data/a7a57be2-128ff3f0-ae912-8fff-cec11383d806e05f.html)',
  }, {
    name: 'type_of_force',
    page: 'trr',
    title: 'Type of Force',
    text: 'See CPD\'s official [Use of Force Model]' +
      '(http://directives.chicagopolice.org/directives/data/a7a57be2-128ff3f0-ae912-8fff-cec11383d806e05f.html)',
  }];

  const store = MockStore()({
    popups,
    breadcrumb: {
      breadcrumbs: [],
    },
    trrPage: {
      editModeOn: false,
      trrId: 123,
      data: {
        officer: {
          id: 456,
          'full_name': 'Ronald Watts',
          'rank': 'Police Officer',
          unit: {
            'unit_name': '001',
            'description': 'Unit 001',
          },
          'birth_year': 1960,
          race: 'White',
          gender: 'Male',
          'appointed_date': '1999-12-13',
          'date_of_resignation': '2015-12-23',
          'percentile_allegation_internal': 11.1,
          'percentile_allegation_civilian': 22.2,
          'percentile_trr': 99.9,
        },
        'officer_assigned_beat': 'some beat',
        'officer_on_duty': true,
        'officer_in_uniform': true,
        'subject_race': 'White',
        'subject_gender': 'Male',
        'subject_age': 37,
        'force_category': 'Other',
        'force_types': ['Verbal Commands'],
      },
    },
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render trr title, OfficerSection and TRRInfoSection', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TRRPageContainer/>
      </Provider>
    );
    findRenderedDOMComponentWithClass(instance, 'trr-title').textContent.should.eql('TRR 123');
    findRenderedComponentWithType(instance, OfficerSection).props.officer.should.eql({
      officerId: 456,
      rank: 'Police Officer',
      assignedBeat: 'some beat',
      birthYear: 1960,
      careerDuration: 'DEC 13, 1999 — DEC 23, 2015',
      fullName: 'Ronald Watts',
      gender: 'Male',
      inUniform: true,
      onDuty: true,
      percentile: {
        items: [
          { axis: 'Use of Force Reports', value: 99.9 },
          { axis: 'Officer Allegations', value: 11.1 },
          { axis: 'Civilian Allegations', value: 22.2 },
        ],
        textColor: '#231F20',
        visualTokenBackground: '#e85050',
        year: undefined,
      },
      race: 'White',
      unitDescription: 'Unit 001',
      unitName: '001',
      yearOld: 57,
    });
    findRenderedComponentWithType(instance, TRRInfoSection);
    findRenderedComponentWithType(instance, ShareableHeaderContainer);
    findRenderedComponentWithType(instance, FooterContainer);
  });

  it('should render category header, incident date and notes header when printing', function () {
    instance = renderWithContext(
      { printMode: true },
      <Provider store={ store }>
        <TRRPage
          trrId={ 123 }
          officer={ { officerId: 456 } }
          trrDetail={ { category: 'Firearm' } }
          trrLocation={ { incidentDate: 'Sep 23, 2003' } }
          notes={ popups }
        />
      </Provider>
    );
    findRenderedDOMComponentWithClass(instance, 'trr-category-print').textContent.should.eql('Firearm');
    findRenderedDOMComponentWithClass(instance, 'incident-date-print');
    findRenderedDOMComponentWithClass(instance, 'incident-date-title-print').textContent.should.eql('DATE OF INCIDENT');
    findRenderedDOMComponentWithClass(instance, 'incident-date-value-print').textContent.should.eql('Sep 23, 2003');

    findRenderedComponentWithType(instance, PrintNotes);
    findRenderedDOMComponentWithClass(instance, 'notes-title').textContent.should.eql('Notes');

    const noteContents = scryRenderedDOMComponentsWithClass(instance, 'notes-content');
    noteContents.should.have.length(2);
    noteContents[0].textContent.should.eql('Force Category: See CPD\'s official Use of Force Model');
    noteContents[1].textContent.should.eql('Type of Force: See CPD\'s official Use of Force Model');

    const noteContentMarkdownLinks = scryRenderedComponentsWithType(instance, MarkdownLink).map(findDOMNode);
    noteContentMarkdownLinks.should.have.length(2);
    noteContentMarkdownLinks[0].textContent.should.eql('Use of Force Model');
    noteContentMarkdownLinks[0].href.should.eql(
      'http://directives.chicagopolice.org/directives/data/a7a57be2-128ff3f0-ae912-8fff-cec11383d806e05f.html'
    );
    noteContentMarkdownLinks[1].textContent.should.eql('Use of Force Model');
    noteContentMarkdownLinks[1].href.should.eql(
      'http://directives.chicagopolice.org/directives/data/a7a57be2-128ff3f0-ae912-8fff-cec11383d806e05f.html'
    );
  });

  it('should not render category header and incident date header when is not printing', function () {
    instance = renderWithContext(
      { printMode: false },
      <Provider store={ store }>
        <TRRPage
          trrId={ 123 }
          officer={ { officerId: 456 } }
          trrDetail={ { category: 'Firearm' } }
          trrLocation={ { incidentDate: 'Sep 23, 2003' } }
        />
      </Provider>
    );
    scryRenderedDOMComponentsWithClass(instance, 'trr-category-print').should.have.length(0);
    scryRenderedDOMComponentsWithClass(instance, 'incident-date-print').should.have.length(0);
  });
});

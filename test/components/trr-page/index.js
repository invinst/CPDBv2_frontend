import React from 'react';
import { shallow, mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router';

import { TRRPage } from 'components/trr-page';
import OfficerSection from 'components/trr-page/officer-section';
import TRRInfoSection from 'components/trr-page/trr-info-section';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import FooterContainer from 'containers/footer-container';
import TRRPageContainer from 'containers/trr-page';
import PrintNotes from 'components/common/print-notes';
import MarkdownLink from 'components/common/markdown-renderers/markdown-link';
import { PrintModeContext } from 'contexts';


describe('TRRPage component', function () {
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
      breadcrumbItems: [],
    },
    trrPage: {
      editModeOn: false,
      trrId: '123',
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

  it('should render trr title, OfficerSection and TRRInfoSection', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <HelmetProvider>
            <TRRPageContainer/>
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('.trr-title').text().should.equal('TRR 123');
    wrapper.find(OfficerSection).prop('officer').should.eql({
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
    wrapper.find(TRRInfoSection).exists().should.be.true();
    wrapper.find(ShareableHeaderContainer).exists().should.be.true();
    wrapper.find(FooterContainer).exists().should.be.true();
  });

  it('should render category header, incident date and notes header when printing', function () {
    const wrapper = mount(
      <PrintModeContext.Provider value={ { printMode: true } }>
        <Provider store={ store }>
          <MemoryRouter>
            <HelmetProvider>
              <TRRPage
                trrId='123'
                officer={ { officerId: 456 } }
                trrDetail={ { category: 'Firearm' } }
                trrLocation={ { incidentDate: 'Sep 23, 2003' } }
                notes={ popups }
              />
            </HelmetProvider>
          </MemoryRouter>
        </Provider>
      </PrintModeContext.Provider>
    );

    wrapper.find('.trr-category-print').text().should.equal('Firearm');
    wrapper.find('.incident-date-print').exists().should.be.true();
    wrapper.find('.incident-date-title-print').text().should.equal('DATE OF INCIDENT');
    wrapper.find('.incident-date-value-print').text().should.equal('Sep 23, 2003');

    const printNotes = wrapper.find(PrintNotes);
    printNotes.find('.notes-title').text().should.equal('Notes');

    const noteContents = printNotes.find('ReactMarkdown');
    noteContents.should.have.length(2);
    noteContents.at(0).text().should.equal('Force Category: See CPD\'s official Use of Force Model');
    noteContents.at(1).text().should.equal('Type of Force: See CPD\'s official Use of Force Model');

    const firstMarkdownLink = noteContents.at(0).find(MarkdownLink);
    firstMarkdownLink.text().should.equal('Use of Force Model');
    firstMarkdownLink.prop('href').should.equal(
      'http://directives.chicagopolice.org/directives/data/a7a57be2-128ff3f0-ae912-8fff-cec11383d806e05f.html'
    );

    const secondMarkdownLink = noteContents.at(1).find(MarkdownLink);
    secondMarkdownLink.text().should.equal('Use of Force Model');
    secondMarkdownLink.prop('href').should.equal(
      'http://directives.chicagopolice.org/directives/data/a7a57be2-128ff3f0-ae912-8fff-cec11383d806e05f.html'
    );
  });

  it('should not render category header and incident date header when is not printing', function () {
    const wrapper = shallow(
      <TRRPage
        trrId='123'
        officer={ { officerId: 456 } }
        trrDetail={ { category: 'Firearm' } }
        trrLocation={ { incidentDate: 'Sep 23, 2003' } }
      />,
      { context: { printMode: false } }
    );
    wrapper.find('.trr-category-print').exists().should.be.false();
    wrapper.find('.incident-date-print').exists().should.be.false();
  });
});

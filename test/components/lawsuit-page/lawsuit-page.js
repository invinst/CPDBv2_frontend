import React from 'react';
import { mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { spy } from 'sinon';

import LawsuitPage from 'components/lawsuit-page';
import SmallRadarChartOfficerCard from 'components/lawsuit-page/involved-officer-card';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';

describe('LawsuitPage component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    lawsuitPage: {
      caseNo: '',
      summary: '',
      address: '',
      interactions: [],
      services: [],
      misconducts: [],
      violences: [],
      outcomes: '',
      incidentDate: '',
      plaintiffs: [],
      officers: [],
      payments: [],
      totalPaymentsDisplayShort: '',
      totalPayments: {
        total: '',
        totalSettlement: '',
        totalLegalFees: '',
      },
    },
  });

  const officers = [
    {
      complaintCount: 12,
      fullName: 'Joseph Nega',
      id: 32218,
      officerId: 32218,
      percentile: {
        items: [
          {
            axis: 'Use of Force Reports',
            value: 49.1036,
          },
          {
            axis: 'Officer Allegations',
            value: 0,
          },
          {
            axis: 'Civilian Allegations',
            value: 47.638,
          },
        ],
        textColor: '#231F20',
        visualTokenBackground: '#FF6453',
      },
      url: '/officer/32218/joseph-nega/',
      allegationPercentile: 59.543,
      sustainedCount: 0,
      age: '53-year-old',
      isPinned: false,
      race: 'White',
      gender: 'm',
      rank: 'Detective',
      lawsuitCount: 3,
      lawsuitPayment: '7.5b',
    },
    {
      complaintCount: 4,
      fullName: 'Robert Rose',
      id: 32300,
      officerId: 32300,
      percentile: {
        items: [
          {
            axis: 'Use of Force Reports',
            value: 67.911,
          },
          {
            axis: 'Officer Allegations',
            value: 0,
          },
          {
            axis: 'Civilian Allegations',
            value: 43.9207,
          },
        ],
        textColor: '#231F20',
        visualTokenBackground: '#F4A298',
      },
      url: '/officer/32300/robert-rose/',
      allegationPercentile: 34.6987,
      sustainedCount: 0,
      age: '53-year-old',
      isPinned: false,
      race: 'White',
      gender: 'm',
      rank: 'Detective',
      lawsuitCount: 3,
      lawsuitPayment: '7.5b',
    },
  ];

  it('should render enough sections', function () {
    const addOrRemoveItemInPinboardSpy = spy();
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <HelmetProvider>
            <LawsuitPage
              caseNo='00-L-5230'
              summary='Hutchinson was shot and killed outside a bar near the Addison Red Line stop.'
              address='200 E. Chicago Ave., Chicago IL'
              interactions={ ['Protest'] }
              services={ ['On Duty'] }
              misconducts={ ['Killed by officer'] }
              violences={ ['Physical Force'] }
              outcomes={ ['Killed by officer'] }
              incidentDate='2000-03-16'
              plaintiffs={ [{ 'name': 'Sharon Ambielli' }, { 'name': 'Kevin Vodak' }] }
              point={ { lat: 10, lon: 10 } }
              officers={ officers }
              payments={ [
                { payee: 'Genre Wilson', settlement: '-', legalFees: '2500000000.00' },
                { payee: 'Lucy Bells', settlement: '7500.00', legalFees: '-' },
              ] }
              totalPaymentsDisplayShort={ '2.5B' }
              totalPayments={ {
                total: '2,500,200,000.00',
                totalSettlement: '200,000.00',
                totalLegalFees: '2500,000,000.00',
                mustBeAcceptedByCouncilCity: true,
              } }
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardSpy }
            />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    const officerCard = wrapper.find(SmallRadarChartOfficerCard);
    officerCard.exists().should.be.true();
    officerCard.should.have.length(2);
    officerCard.at(0).props().should.eql({
      addOrRemoveItemInPinboard: addOrRemoveItemInPinboardSpy,
      officer: officers[0],
    });
    officerCard.at(1).props().should.eql({
      addOrRemoveItemInPinboard: addOrRemoveItemInPinboardSpy,
      officer: officers[1],
    });

    const shareableHeader = wrapper.find(ShareableHeaderContainer);
    shareableHeader.exists().should.be.true();

    const mustBeAcceptedByCouncilCityNote = wrapper.find('.must-be-accepted-by-council-city-description');
    mustBeAcceptedByCouncilCityNote.exists().should.be.true();
  });

  it('should not render mustBeAcceptedByCouncilCityNote when total settlment under 100K', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <HelmetProvider>
            <LawsuitPage
              caseNo='00-L-5230'
              totalPayments={ {
                total: '2,500,090,000.00',
                totalSettlement: '90,000.00',
                totalLegalFees: '2500,000,000.00',
                mustBeAcceptedByCouncilCity: false,
              } }
            />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    const mustBeAcceptedByCouncilCityNote = wrapper.find('.must-be-accepted-by-council-city-description');
    mustBeAcceptedByCouncilCityNote.exists().should.be.false();
  });
});

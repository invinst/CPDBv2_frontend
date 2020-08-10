import React from 'react';
import { mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import LawsuitPage from 'components/lawsuit-page';
import OfficerRow from 'components/lawsuit-page/officer-row';
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

  it('should render enough sections', function () {
    const officers = [
      {
        id: 32218,
        fullName: 'Joseph Nega',
        allegationCount: 12,
        radarAxes: [
          { axis: 'Use of Force Reports', value: 99.9 },
          { axis: 'Officer Allegations', value: 11.1 },
          { axis: 'Civilian Allegations', value: 22.2 },
        ],
        radarColor: '#ed6154',
        url: '#',
      },
      {
        id: 32300,
        fullName: 'Robert Rose',
        allegationCount: 4,
        radarAxes: [
          { axis: 'Use of Force Reports', value: 99.9 },
          { axis: 'Officer Allegations', value: 11.1 },
          { axis: 'Civilian Allegations', value: 22.2 },
        ],
        radarColor: '#ed6154',
        url: '#',
      },
    ];

    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <HelmetProvider>
            <LawsuitPage
              caseNo={ '00-L-5230' }
              summary={ 'Hutchinson was shot and killed outside a bar near the Addison Red Line stop. ' }
              address={ '200 E. Chicago Ave., Chicago IL' }
              interactions={ ['Protest'] }
              services={ ['On Duty'] }
              misconducts={ ['Excessive force', 'Racial epithets'] }
              violences={ ['Physical Force'] }
              outcomes={ ['Killed by officer'] }
              incidentDate={ '2000-03-16' }
              plaintiffs={ [{ 'name': 'Sharon Ambielli' }, { 'name': 'Kevin Vodak' }] }
              officers={ officers }
              payments={ [
                { payee: 'Genre Wilson', settlement: '-', legalFees: '2500000000.00' },
                { payee: 'Lucy Bells', settlement: '7500.00', legalFees: '-' },
              ] }
              totalPaymentsDisplayShort={ '2.5B' }
              totalPayments={ {
                total: '2500007500.00',
                totalSettlement: '7500.00',
                totalLegalFees: '2500000000.00',
              } }
            />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    const officerRow = wrapper.find(OfficerRow);
    officerRow.exists().should.be.true();
    officerRow.should.have.length(2);
    officerRow.at(0).props().should.eql(officers[0]);
    officerRow.at(1).props().should.eql(officers[1]);
    const shareableHeader = wrapper.find(ShareableHeaderContainer);
    shareableHeader.exists().should.be.true();
  });
});

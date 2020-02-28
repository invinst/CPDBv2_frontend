import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import CRPage from 'components/cr-page';
import SummaryRow from 'components/cr-page/summary-row';
import ComplaintCategory from 'components/cr-page/complaint-category';
import ComplaintIncidentDate from 'components/cr-page/complaint-incident-date';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import RelatedComplaints from 'components/cr-page/related-complaints';
import PrintNotes from 'components/common/print-notes';
import { HelmetProvider } from 'react-helmet-async';
import { PrintModeContext } from 'contexts';
import { PINNED_ITEM_TYPES } from 'utils/constants';


describe('CRPage component', function () {
  it('should render correctly', function () {
    const addOrRemoveItemInPinboardSpy = spy();
    const wrapper = shallow(
      <CRPage
        crid={ '123456' }
        category='Some category'
        subcategory='Some subcategory'
        incidentDate='2012-12-05'
        address='3000 Michigan Ave, Chicago IL'
        victims={ ['Black, Male, Age 51'] }
        complainants={ ['Black, Male, Age 51'] }
        summary='abc'
        isPinned={ true }
        location={ { pathname: '/cr/123456/' } }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardSpy }
      />
    );
    const crPage = shallow(wrapper.find('CRPage').get(0), { context: { printMode: false } });

    const complaintCategory = crPage.find(ComplaintCategory);
    complaintCategory.prop('category').should.eql('Some category');
    complaintCategory.prop('subcategory').should.eql('Some subcategory');

    const complaintIncidentDate = crPage.find(ComplaintIncidentDate);
    complaintIncidentDate.prop('incidentDate').should.eql('2012-12-05');

    const relatedComplaints = crPage.find(RelatedComplaints);
    relatedComplaints.prop('crid').should.eql('123456');

    const rowLabels = crPage.find(SummaryRow).map(element => element.prop('label'));
    rowLabels.should.containEql('VICTIM').and.containEql('COMPLAINANT').and.containEql('SUMMARY');

    const attachments = crPage.find('Attachments');
    attachments.prop('pathname').should.eql('/cr/123456/');

    const accusedOfficers = crPage.find('AccusedOfficers');
    accusedOfficers.prop('pathName').should.eql('/cr/123456/');

    const shareableHeader = crPage.find(ShareableHeaderContainer);
    shareableHeader.exists().should.be.true();
    const itemPinButton = shareableHeader.prop('headerButtons');
    itemPinButton.props.item.should.be.eql({
      type: PINNED_ITEM_TYPES.CR,
      id: '123456',
      isPinned: true,
      incidentDate: '2012-12-05',
      category: 'Some category',
    });
    itemPinButton.props.addOrRemoveItemInPinboard.should.eql(addOrRemoveItemInPinboardSpy);
  });

  it('should not render some parts when missing information', function () {
    const wrapper = shallow(<CRPage />);
    const crPage = shallow(wrapper.find('CRPage').get(0), { context: { printMode: false } });
    const rowLabels = crPage.find(SummaryRow).map(element => element.prop('label'));
    rowLabels.should.not.containEql('VICTIM').and.not.containEql('COMPLAINANT').and.not.containEql('SUMMARY');
    crPage.find(RelatedComplaints).exists().should.be.false();
  });

  it('should render PrintNotes component when printMode is true', function () {
    const state = {
      headers: {
        shareableHeader: {
          scrollPosition: null,
        },
      },
      breadcrumb: {
        breadcrumbItems: [],
      },
    };
    const store = MockStore()(state);

    const wrapper = mount(
      <PrintModeContext.Provider value={ { printMode: true } }>
        <Provider store={ store }>
          <MemoryRouter>
            <HelmetProvider>
              <CRPage />
            </HelmetProvider>
          </MemoryRouter>
        </Provider>
      </PrintModeContext.Provider>
    );
    wrapper.find(CRPage).setState({ printMode: false });
    wrapper.find(PrintNotes).exists().should.be.false();

    wrapper.find(CRPage).setState({ printMode: true });
    wrapper.find(PrintNotes).exists().should.be.true();
  });
});

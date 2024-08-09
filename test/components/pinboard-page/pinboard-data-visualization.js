// import React from 'react';
// import { mount } from 'enzyme';
// import MockStore from 'redux-mock-store';
// import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router-dom';

// import PinboardDataVisualization from 'components/pinboard-page/pinboard-data-visualization';
// import AnimatedSocialGraph from 'components/common/animated-social-graph';
// import AllegationsMap from 'components/common/allegations-map';


describe('PinboardDataVisualization component', function () {
  // const mockStore = MockStore();
  // const store = mockStore({
  //   pinboardPage: {
  //     graphData: { requesting: false, data: {} },
  //     geographicData: {
  //       crsRequesting: false,
  //       trrsRequesting: false,
  //       mapCrsData: [
  //         {
  //           'date': '2006-09-26',
  //           'crid': '1000018',
  //           'category': 'Operation/Personnel Violations',
  //           'coaccused_count': 1,
  //           'kind': 'CR',
  //         },
  //       ],
  //       mapTrrsData: [
  //         {
  //           'trr_id': '123456',
  //           kind: 'FORCE',
  //           taser: false,
  //           'firearm_used': true,
  //           point: {
  //             lat: 35.3,
  //             lon: 50.5,
  //           },
  //           date: 'MAY 12, 2015',
  //         },
  //       ],
  //     },
  //     widgets: {
  //       complaintSummary: [
  //         { category: 'Operation/Personnel Violations', count: 10 },
  //         { category: 'Illegal Search', count: 4 },
  //       ],
  //       trrSummary: [
  //         { 'force_type': 'Unknown', count: 141 },
  //         { 'force_type': 'Taser', count: 13 },
  //       ],
  //       officersSummary: {
  //         race: [
  //           { race: 'Black', percentage: 0.67 },
  //           { race: 'Other', percentage: 0.14 },
  //         ],
  //         gender: [
  //           { gender: '', percentage: 0.49 },
  //           { gender: 'M', percentage: 0.47 },
  //         ],
  //       },
  //       complainantsSummary: {
  //         race: [
  //           { race: 'Black', percentage: 0.77 },
  //           { race: 'White', percentage: 0.12 },
  //           { race: 'Other', percentage: 0.11 },
  //         ],
  //         gender: [
  //           { gender: 'F', percentage: 0.81 },
  //           { gender: 'M', percentage: 0.19 },
  //         ],
  //       },
  //     },
  //   },
  // });

  // it('should render social graph', function () {
  //   const wrapper = mount(
  //     <Provider store={ store }>
  //       <MemoryRouter>
  //         <PinboardDataVisualization
  //           pinboardId='1234abcd'
  //         />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const carousel = wrapper.find('Carousel');
  //   carousel.exists().should.be.true();

  //   const socialGraphWidget = carousel.find('Widget').at(0);
  //   socialGraphWidget.prop('widgetTitle').should.equal('SOCIAL GRAPH');

  //   socialGraphWidget.find(AnimatedSocialGraph).exists().should.be.true();
  //   socialGraphWidget.find('.expanded-mode-btn').hostNodes().at(0).prop('href').should.containEql(
  //     '/social-graph/pinboard/1234abcd/'
  //   );
  // });

  // context('hasMapMarker is true', function () {
  //   it('should render geographic map', function () {
  //     const wrapper = mount(
  //       <Provider store={ store }>
  //         <MemoryRouter>
  //           <PinboardDataVisualization
  //             pinboardId='1234abcd'
  //             hasMapMarker={ true }
  //           />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     const carousel = wrapper.find('Carousel');
  //     carousel.exists().should.be.true();

  //     const geographicMapWidget = carousel.find('Widget').at(1);
  //     geographicMapWidget.prop('widgetTitle').should.equal('GEOGRAPHIC MAP');

  //     carousel.find(AllegationsMap).exists().should.be.true();
  //     carousel.find('.expanded-mode-btn').hostNodes().at(1).prop('href').should.containEql(
  //       '/geographic/pinboard/1234abcd/'
  //     );
  //   });
  // });

  // context('hasMapMarker is false', function () {
  //   it('should not render geographic map', function () {
  //     const wrapper = mount(
  //       <Provider store={ store }>
  //         <MemoryRouter>
  //           <PinboardDataVisualization
  //             pinboardId='1234abcd'
  //             hasMapMarker={ false }
  //           />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     const carousel = wrapper.find('Carousel');
  //     carousel.exists().should.be.true();

  //     carousel.find(AllegationsMap).exists().should.be.false();
  //   });
  // });

  // context('hasComplaintSummary is true', function () {
  //   it('should render ComplaintSummaryContainer', function () {
  //     const wrapper = mount(
  //       <Provider store={ store }>
  //         <MemoryRouter>
  //           <PinboardDataVisualization
  //             pinboardId='1234abcd'
  //             hasComplaintSummary={ true }
  //           />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     const carousel = wrapper.find('Carousel');
  //     carousel.exists().should.be.true();

  //     const complaintSummaryWidget = carousel.find('Widget').at(1);
  //     complaintSummaryWidget.prop('widgetTitle').should.equal('COMPLAINT SUMMARY');
  //     const complaintSummary = complaintSummaryWidget.find('SummaryWidget');
  //     complaintSummary.prop('summaryItems').should.deepEqual([
  //       { title: 'Operation/Personnel Violations', count: 10 },
  //       { title: 'Illegal Search', count: 4 },
  //     ]);
  //   });
  // });

  // context('hasComplaintSummary is false', function () {
  //   it('should not render ComplaintSummaryContainer', function () {
  //     const wrapper = mount(
  //       <Provider store={ store }>
  //         <MemoryRouter>
  //           <PinboardDataVisualization
  //             pinboardId='1234abcd'
  //             hasComplaintSummary={ false }
  //           />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     const carousel = wrapper.find('Carousel');
  //     carousel.exists().should.be.true();

  //     carousel.find('SummaryWidget').exists().should.be.false();
  //   });
  // });

  // context('hasTRRSummary is true', function () {
  //   it('should render TRRSummaryContainer', function () {
  //     const wrapper = mount(
  //       <Provider store={ store }>
  //         <MemoryRouter>
  //           <PinboardDataVisualization
  //             pinboardId='1234abcd'
  //             hasTRRSummary={ true }
  //           />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     const carousel = wrapper.find('Carousel');
  //     carousel.exists().should.be.true();

  //     const trrSummaryWidget = carousel.find('Widget').last();
  //     trrSummaryWidget.prop('widgetTitle').should.equal('TACTICAL RESPONSE REPORT SUMMARY');
  //     const trrSummary = trrSummaryWidget.find('SummaryWidget');
  //     trrSummary.prop('summaryItems').should.deepEqual([
  //       { title: 'Unknown', count: 141 },
  //       { title: 'Taser', count: 13 },
  //     ]);
  //   });
  // });

  // context('hasTRRSummary is false', function () {
  //   it('should not render TRRSummaryContainer', function () {
  //     const wrapper = mount(
  //       <Provider store={ store }>
  //         <MemoryRouter>
  //           <PinboardDataVisualization
  //             pinboardId='1234abcd'
  //             hasTRRSummary={ false }
  //           />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     const carousel = wrapper.find('Carousel');
  //     carousel.exists().should.be.true();

  //     carousel.find('SummaryWidget').exists().should.be.false();
  //   });
  // });

  // context('hasOfficersSummary is true', function () {
  //   it('should render OfficersSummaryContainer', function () {
  //     const wrapper = mount(
  //       <Provider store={ store }>
  //         <MemoryRouter>
  //           <PinboardDataVisualization
  //             pinboardId='1234abcd'
  //             hasOfficersSummary={ true }
  //           />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     const carousel = wrapper.find('Carousel');
  //     carousel.exists().should.be.true();

  //     const officersSummaryWidget = carousel.find('Widget').last();
  //     officersSummaryWidget.prop('widgetTitle').should.equal('OFFICERS');
  //     const officersSummary = officersSummaryWidget.find('DemographicWidget');
  //     officersSummary.prop('demographicData').should.deepEqual({
  //       race: [
  //         { name: 'Black', percentage: 0.67 },
  //         { name: 'Other', percentage: 0.14 },
  //       ],
  //       gender: [
  //         { name: 'Unknown', percentage: 0.49 },
  //         { name: 'M', percentage: 0.47 },
  //       ],
  //     });
  //   });
  // });

  // context('hasOfficersSummary is false', function () {
  //   it('should not render TRRSummaryContainer', function () {
  //     const wrapper = mount(
  //       <Provider store={ store }>
  //         <MemoryRouter>
  //           <PinboardDataVisualization
  //             pinboardId='1234abcd'
  //             hasOfficersSummary={ false }
  //           />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     const carousel = wrapper.find('Carousel');
  //     carousel.exists().should.be.true();

  //     carousel.find('DemographicWidget').exists().should.be.false();
  //   });
  // });

  // context('hasComplainantsSummary is true', function () {
  //   it('should render OfficersSummaryContainer', function () {
  //     const wrapper = mount(
  //       <Provider store={ store }>
  //         <MemoryRouter>
  //           <PinboardDataVisualization
  //             pinboardId='1234abcd'
  //             hasComplainantsSummary={ true }
  //           />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     const carousel = wrapper.find('Carousel');
  //     carousel.exists().should.be.true();

  //     const complainantsSummaryWidget = carousel.find('Widget').last();
  //     complainantsSummaryWidget.prop('widgetTitle').should.equal('COMPLAINANTS');
  //     const complainantsSummary = complainantsSummaryWidget.find('DemographicWidget');
  //     complainantsSummary.prop('demographicData').should.deepEqual({
  //       race: [
  //         { name: 'Black', percentage: 0.77 },
  //         { name: 'White', percentage: 0.12 },
  //         { name: 'Other', percentage: 0.11 },
  //       ],
  //       gender: [
  //         { name: 'F', percentage: 0.81 },
  //         { name: 'M', percentage: 0.19 },
  //       ],
  //     });
  //   });
  // });

  // context('hasComplainantsSummary is false', function () {
  //   it('should not render TRRSummaryContainer', function () {
  //     const wrapper = mount(
  //       <Provider store={ store }>
  //         <MemoryRouter>
  //           <PinboardDataVisualization
  //             pinboardId='1234abcd'
  //             hasComplainantsSummary={ false }
  //           />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     const carousel = wrapper.find('Carousel');
  //     carousel.exists().should.be.true();

  //     carousel.find('DemographicWidget').exists().should.be.false();
  //   });
  // });
});

// import React from 'react';
// import { mount } from 'enzyme';
// import { Provider } from 'react-redux';
// import MockStore from 'redux-mock-store';
// import { spy, stub } from 'sinon';
// import { MemoryRouter } from 'react-router-dom';

// import { PinboardPane } from 'components/common/preview-pane/panes';
// import StaticSocialGraphContainer from 'containers/pinboard-admin-page/static-social-graph-container';
// import SocialGraph from 'components/common/animated-social-graph/social-graph';
// import {
//   ListWidget,
//   OneLineListWidget,
//   TitleWidget,
//   NewWidgetWrapper,
// } from 'components/common/preview-pane/widgets';
// import styles from 'components/common/preview-pane/panes/pinboard-pane.sass';


describe('PinboardPane component', function () {
  // it('should render correctly', function () {
  //   const store = MockStore()({
  //     pinboardAdminPage: {
  //       graphData: {
  //         data: {},
  //         requesting: false,
  //       },
  //     },
  //   });

  //   const recentOfficers = [
  //     {
  //       count: 2,
  //       id: 5200,
  //       name: 'Thomas Connor',
  //       radarAxes: [
  //         {
  //           axis: 'Use of Force Reports',
  //           value: 64.3694,
  //         },
  //         {
  //           axis: 'Officer Allegations',
  //           value: 99.8056,
  //         },
  //         {
  //           axis: 'Civilian Allegations',
  //           value: 99.9778,
  //         },

  //       ],
  //       radarColor: '#f0201e',
  //       url: '/officer/5200/thomas-connor/',
  //     },
  //   ];
  //   const recentAllegations = [
  //     {
  //       id: 'C201453',
  //       name: 'Use Of Force',
  //       subText: 'May 19, 1993',
  //       url: '/complaint/C201453/',
  //     },
  //     {
  //       id: '1016583',
  //       name: 'Illegal Search',
  //       subText: 'May 14, 2008',
  //       url: '/complaint/1016583/',
  //     },
  //   ];
  //   const recentTrrs = [
  //     {
  //       id: 121,
  //       name: 'Other Force',
  //       subText: 'Feb 23, 2004',
  //       url: '/trr/121/',
  //     },
  //     {
  //       id: 122,
  //       name: 'Physical Force - Holding',
  //       subText: 'Feb 24, 2004',
  //       url: '/trr/122/',
  //     },
  //     {
  //       id: 123,
  //       name: 'Physical Force - Holding',
  //       subText: 'Feb 24, 2004',
  //       url: '/trr/123/',
  //     },
  //   ];

  //   const wrapper = mount(
  //     <Provider store={ store }>
  //       <MemoryRouter>
  //         <PinboardPane
  //           id='18a5b091'
  //           title='My Pinboard'
  //           fullCreatedAt='Nov 4, 2019 4:12 PM'
  //           description='Some description'
  //           officersCount={ 1 }
  //           allegationsCount={ 2 }
  //           trrsCount={ 3 }
  //           childCount={ 5 }
  //           recentOfficers={ recentOfficers }
  //           recentAllegations={ recentAllegations }
  //           recentTrrs={ recentTrrs }
  //         />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const widgetWrapper = wrapper.find(NewWidgetWrapper);
  //   widgetWrapper.prop('className').should.equal(styles.pinboardPane);
  //   widgetWrapper.prop('callToAction').should.eql({ to: '/pinboard/18a5b091/my-pinboard/', text: 'View Pinboard' });
  //   widgetWrapper.prop('yScrollable').should.be.true();
  //   widgetWrapper.prop('isClickable').should.be.false();

  //   const titleWidget = widgetWrapper.find(TitleWidget);
  //   titleWidget.prop('title').should.equal('My Pinboard');
  //   titleWidget.prop('subtitle').should.equal('Some description');

  //   const oneLineListWidget = widgetWrapper.find(OneLineListWidget);
  //   oneLineListWidget.prop('items').should.eql([
  //     { title: 'Created at', text: 'Nov 4, 2019 4:12 PM' },
  //     { title: 'Children', text: '5' },
  //   ]);

  //   const staticSocialGraph = widgetWrapper.find(StaticSocialGraphContainer);
  //   staticSocialGraph.prop('pinboardId').should.equal('18a5b091');
  //   staticSocialGraph.prop('className').should.equal('social-graph');

  //   const listWidgets = widgetWrapper.find(ListWidget);
  //   listWidgets.should.have.length(3);

  //   listWidgets.at(0).prop('title').should.equal('1 Pinned officer');
  //   listWidgets.at(0).prop('items').should.eql(recentOfficers);
  //   listWidgets.at(0).prop('collapsible').should.be.true();

  //   listWidgets.at(1).prop('title').should.equal('2 Pinned allegations');
  //   listWidgets.at(1).prop('items').should.eql(recentAllegations);
  //   listWidgets.at(1).prop('collapsible').should.be.true();

  //   listWidgets.at(2).prop('title').should.equal('3 Pinned TRRS');
  //   listWidgets.at(2).prop('items').should.eql(recentTrrs);
  //   listWidgets.at(2).prop('collapsible').should.be.true();
  // });

  // it('should fetchPinboardStaticSocialGraph when mounted with no cache data', function () {
  //   const store = MockStore()({
  //     pinboardAdminPage: {
  //       graphData: {
  //         cachedData: {},
  //         requesting: false,
  //       },
  //     },
  //   });
  //   const stubFetchPinboardStaticSocialGraph = stub();

  //   mount(
  //     <Provider store={ store }>
  //       <MemoryRouter>
  //         <PinboardPane
  //           cachedDataIDs={ ['abcd1234'] }
  //           id='dbca4321'
  //           fetchPinboardStaticSocialGraph={ stubFetchPinboardStaticSocialGraph }
  //         />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   stubFetchPinboardStaticSocialGraph.should.be.calledOnce();
  //   stubFetchPinboardStaticSocialGraph.should.be.calledWith('dbca4321');
  // });

  // it('should not fetchPinboardStaticSocialGraph when mounted with cache data', function () {
  //   const store = MockStore()({
  //     pinboardAdminPage: {
  //       graphData: {
  //         cachedData: {},
  //         requesting: false,
  //       },
  //     },
  //   });
  //   const stubFetchPinboardStaticSocialGraph = stub();

  //   mount(
  //     <Provider store={ store }>
  //       <MemoryRouter>
  //         <PinboardPane
  //           cachedDataIDs={ ['abcd1234'] }
  //           id='abcd1234'
  //           fetchPinboardStaticSocialGraph={ stubFetchPinboardStaticSocialGraph }
  //         />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   stubFetchPinboardStaticSocialGraph.should.not.be.called();
  // });

  // it('should not fetchPinboardStaticSocialGraph when mounted if no pinboard id', function () {
  //   const store = MockStore()({
  //     pinboardAdminPage: {
  //       graphData: {
  //         cachedData: {},
  //         requesting: false,
  //       },
  //     },
  //   });
  //   const stubFetchPinboardStaticSocialGraph = stub();

  //   mount(
  //     <Provider store={ store }>
  //       <MemoryRouter>
  //         <PinboardPane
  //           cachedDataIDs={ ['abcd1234'] }
  //           id={ undefined }
  //           fetchPinboardStaticSocialGraph={ stubFetchPinboardStaticSocialGraph }
  //         />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   stubFetchPinboardStaticSocialGraph.should.not.be.called();
  // });

  // it('should not fetchPinboardStaticSocialGraph when changing to no pinboard id', function () {
  //   const store = MockStore()({
  //     pinboardAdminPage: {
  //       graphData: {
  //         cachedData: {},
  //         requesting: false,
  //       },
  //     },
  //   });
  //   const stubFetchPinboardStaticSocialGraph = stub();

  //   const wrapper = mount(
  //     <Provider store={ store }>
  //       <MemoryRouter>
  //         <PinboardPane
  //           cachedDataIDs={ ['abcd1234'] }
  //           id='dbca4321'
  //           fetchPinboardStaticSocialGraph={ stubFetchPinboardStaticSocialGraph }
  //         />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   stubFetchPinboardStaticSocialGraph.should.be.calledOnce();
  //   stubFetchPinboardStaticSocialGraph.should.be.calledWith('dbca4321');
  //   stubFetchPinboardStaticSocialGraph.resetHistory();

  //   wrapper.setProps({
  //     children: (
  //       <MemoryRouter>
  //         <PinboardPane
  //           cachedDataIDs={ ['abcd1234'] }
  //           id={ undefined }
  //           fetchPinboardStaticSocialGraph={ stubFetchPinboardStaticSocialGraph }
  //         />
  //       </MemoryRouter>
  //     ),
  //   });

  //   stubFetchPinboardStaticSocialGraph.should.not.be.called();
  // });

  // it('should fetchPinboardStaticSocialGraph when receiving props', function () {
  //   const store = MockStore()({
  //     pinboardAdminPage: {
  //       graphData: {
  //         cachedData: {},
  //         requesting: false,
  //       },
  //     },
  //   });

  //   const stubFetchPinboardStaticSocialGraph = stub();

  //   const wrapper = mount(
  //     <Provider store={ store }>
  //       <MemoryRouter>
  //         <PinboardPane
  //           cachedDataIDs={ ['abcd1234'] }
  //           id='abcd1234'
  //           fetchPinboardStaticSocialGraph={ stubFetchPinboardStaticSocialGraph }
  //         />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   stubFetchPinboardStaticSocialGraph.should.not.be.called();

  //   wrapper.setProps({
  //     children: (
  //       <MemoryRouter>
  //         <PinboardPane
  //           cachedDataIDs={ ['abcd1234'] }
  //           id='dbca4321'
  //           fetchPinboardStaticSocialGraph={ stubFetchPinboardStaticSocialGraph }
  //         />
  //       </MemoryRouter>
  //     ),
  //   });

  //   stubFetchPinboardStaticSocialGraph.should.be.calledOnce();
  //   stubFetchPinboardStaticSocialGraph.should.be.calledWith('dbca4321');
  // });

  // it('should mount a new StaticSocialGraphContainer when change pinboard id', function () {
  //   const store = MockStore()({
  //     pinboardAdminPage: {
  //       graphData: {
  //         cachedData: {},
  //         requesting: false,
  //       },
  //     },
  //   });
  //   const componentWillUnmountSpy = spy(SocialGraph.prototype, 'componentWillUnmount');

  //   const wrapper = mount(
  //     <Provider store={ store }>
  //       <MemoryRouter>
  //         <PinboardPane
  //           cachedDataIDs={ ['abcd1234'] }
  //           id='abcd1234'
  //         />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   wrapper.setProps({
  //     children: (
  //       <MemoryRouter>
  //         <PinboardPane
  //           cachedDataIDs={ ['abcd1234'] }
  //           id='dbca4321'
  //         />
  //       </MemoryRouter>
  //     ),
  //   });

  //   componentWillUnmountSpy.should.be.calledOnce();
  // });
});

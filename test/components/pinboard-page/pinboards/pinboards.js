// import React from 'react';
// import { mount } from 'enzyme';
// import { MemoryRouter } from 'react-router-dom';
// import MockStore from 'redux-mock-store';
// import { Provider } from 'react-redux';
// import { Promise } from 'es6-promise';
// import { spy, stub } from 'sinon';
// import should from 'should';

// import browserHistory from 'utils/history';
// import Pinboards from 'components/pinboard-page/pinboards';


describe('Pinboards component', function () {
  // const store = MockStore()({
  //   pinboardPage: {
  //     pinboard: {
  //       saving: false,
  //     },
  //   },
  // });

  // const pinboards = [
  //   {
  //     id: '1',
  //     key: '1',
  //     title: 'Pinboard Title',
  //     createdAt: '12/12/2019',
  //     lastViewedAt: '13/12/2019 at 10:20 AM',
  //     url: '/pinboard/1/pinboard-title/',
  //     isCurrent: false,
  //   },
  //   {
  //     id: '2',
  //     key: '2',
  //     title: '',
  //     createdAt: '15/10/2019',
  //     lastViewedAt: '18/12/2019 at 10:20 AM',
  //     url: '/pinboard/2/untitled-pinboard/',
  //     isCurrent: true,
  //   },
  // ];

  // it('should render pinboard items', function () {
  //   const removePinboardSpy = spy();
  //   const handleCloseSpy = spy();
  //   const wrapper = mount(
  //     <Provider store={ store }>
  //       <Pinboards
  //         pinboards={ pinboards }
  //         isShown={ true }
  //         removePinboard={ removePinboardSpy }
  //         handleClose={ handleCloseSpy }
  //       />
  //     </Provider>
  //   );

  //   wrapper.find('.pinboards-title').text().should.equal('Pinboards');

  //   let pinboardItems = wrapper.find('PinboardItem');
  //   pinboardItems.should.have.length(2);

  //   const pinboardTitles = wrapper.find('.pinboard-title');
  //   const pinboardViewedAts = wrapper.find('.pinboard-viewed-at');
  //   const handleSetShowActionsPinboardId = wrapper.find('Pinboards').instance().handleSetShowActionsPinboardId;

  //   pinboardTitles.at(0).text().should.equal('Pinboard Title');
  //   pinboardViewedAts.at(0).text().should.equal('Viewed 13/12/2019 at 10:20 AM');
  //   pinboardItems.at(0).prop('removePinboard').should.equal(removePinboardSpy);
  //   pinboardItems.at(0).prop('handleSetShowActionsPinboardId').should.equal(handleSetShowActionsPinboardId);
  //   pinboardItems.at(0).prop('shouldShowActions').should.be.false();
  //   pinboardItems.at(0).prop('handleClose').should.equal(handleCloseSpy);

  //   pinboardTitles.at(1).text().should.equal('Created 15/10/2019');
  //   pinboardViewedAts.at(1).text().should.equal('Viewed 18/12/2019 at 10:20 AM');
  //   pinboardItems.at(1).prop('removePinboard').should.equal(removePinboardSpy);
  //   pinboardItems.at(1).prop('handleSetShowActionsPinboardId').should.equal(handleSetShowActionsPinboardId);
  //   pinboardItems.at(1).prop('shouldShowActions').should.be.false();
  //   pinboardItems.at(1).prop('handleClose').should.equal(handleCloseSpy);

  //   wrapper.find('Pinboards').instance().handleSetShowActionsPinboardId('1');
  //   wrapper.update();
  //   pinboardItems = wrapper.find('PinboardItem');

  //   pinboardItems.at(0).prop('shouldShowActions').should.be.true();
  //   pinboardItems.at(1).prop('shouldShowActions').should.be.false();
  // });

  // it('should not render pinboard list if isShown is false', function () {
  //   const wrapper = mount(
  //     <Pinboards pinboards={ pinboards } isShown={ false } />
  //   );

  //   wrapper.find('.pinboards-title').exists().should.be.false();
  //   wrapper.find('.pinboard-item').exists().should.be.false();
  // });

  // it('should render new-pinboard-btn', function (done) {
  //   const handleCloseSpy = spy();
  //   const createNewEmptyPinboardStub = stub().usingPromise(Promise).resolves({
  //     payload: {
  //       id: '5cd06f2b',
  //       title: 'Pinboard title',
  //     },
  //   });

  //   const wrapper = mount(
  //     <Provider store={ store }>
  //       <MemoryRouter>
  //         <Pinboards
  //           isShown={ true }
  //           pinboards={ pinboards }
  //           createNewEmptyPinboard={ createNewEmptyPinboardStub }
  //           handleClose={ handleCloseSpy }
  //         />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const newPinboardLink = wrapper.find('.new-pinboard-btn').first();
  //   newPinboardLink.simulate('click');
  //   createNewEmptyPinboardStub.should.be.called();
  //   setTimeout(() => {
  //     handleCloseSpy.should.be.calledOnce();
  //     browserHistory.location.pathname.should.equal('/pinboard/5cd06f2b/pinboard-title/');
  //     done();
  //   }, 50);
  // });

  // describe('handleSetShowActionsPinboardId', function () {
  //   let wrapper;
  //   beforeEach(function () {
  //     wrapper = mount(
  //       <Provider store={ store }>
  //         <Pinboards
  //           pinboards={ pinboards }
  //           pinboard={ { id: '2', saving: false } }
  //           isShown={ true } />
  //       </Provider>
  //     );
  //   });

  //   context('pinboardId is not null', function () {
  //     context('current actionsPaneSpace larger than PINBOARD_ACTIONS_PANE_SPACE', function () {
  //       it('should set actionsPanePosition to bottom', function () {
  //         let instance = wrapper.find('Pinboards').instance();
  //         instance.pinboards = { getBoundingClientRect: () => ({ bottom: 250 }) };
  //         instance.handleSetShowActionsPinboardId('1', 150);
  //         instance.state.should.eql({
  //           showActionsPinboardId: '1',
  //           actionsPanePosition: 'bottom',
  //         });

  //         wrapper.update();
  //         const pinboardItems = wrapper.find('PinboardItem');
  //         pinboardItems.at(0).prop('shouldShowActions').should.be.true();
  //         pinboardItems.at(0).prop('actionsPanePosition').should.equal('bottom');

  //         pinboardItems.at(1).prop('shouldShowActions').should.be.false();
  //         pinboardItems.at(1).prop('actionsPanePosition').should.equal('bottom');
  //       });
  //     });

  //     context('current actionsPaneSpace smaller than PINBOARD_ACTIONS_PANE_SPACE', function () {
  //       it('should set actionsPanePosition to top', function () {
  //         let instance = wrapper.find('Pinboards').instance();
  //         stub(instance.pinboards, 'getBoundingClientRect').returns({ bottom: 250 });
  //         instance.handleSetShowActionsPinboardId('2', 200);
  //         instance.state.should.eql({
  //           showActionsPinboardId: '2',
  //           actionsPanePosition: 'top',
  //         });
  //         wrapper.update();
  //         const pinboardItems = wrapper.find('PinboardItem');
  //         pinboardItems.at(0).prop('shouldShowActions').should.be.false();
  //         pinboardItems.at(0).prop('actionsPanePosition').should.equal('top');

  //         pinboardItems.at(1).prop('shouldShowActions').should.be.true();
  //         pinboardItems.at(1).prop('actionsPanePosition').should.equal('top');
  //       });
  //     });
  //   });

  //   context('pinboardId is null', function () {
  //     context('current actionsPaneSpace smaller than PINBOARD_ACTIONS_PANE_SPACE', function () {
  //       it('should set showActionsPinboardId to null', function () {
  //         wrapper.find('Pinboards').setState({ showActionsPinboardId: '1' });
  //         const instance = wrapper.find('Pinboards').instance();
  //         instance.handleSetShowActionsPinboardId(null);
  //         should(instance.state.showActionsPinboardId).be.null();
  //       });
  //     });
  //   });
  // });
});

// import React from 'react';
// import { mount } from 'enzyme';
// import { spy, stub } from 'sinon';
// import { Provider } from 'react-redux';
// import { Promise } from 'es6-promise';
// import MockStore from 'redux-mock-store';

// import PinboardsMenu from 'components/common/pinboard/pinboards-menu';
// import { PINNED_ITEM_TYPES } from 'utils/constants';
// import * as pinboardUtils from 'utils/pinboard';


describe('PinboardsMenu component', function () {
  // it('should render correctly', function () {
  //   const pinboards = [
  //     {
  //       id: 1,
  //       title: 'Pinboard 1',
  //       isPinned: false,
  //     },
  //     {
  //       id: 2,
  //       title: 'Pinboard 2',
  //       isPinned: true,
  //     },
  //   ];
  //   const wrapper = mount(
  //     <Provider store={ MockStore()({}) }>
  //       <PinboardsMenu pinboards={ pinboards } />
  //     </Provider>);
  //   const menuItems = wrapper.find('PinboardMenuItem');

  //   menuItems.length.should.equal(2);
  //   menuItems.at(0).prop('pinboard').should.eql({
  //     id: 1,
  //     title: 'Pinboard 1',
  //     isPinned: false,
  //   });
  //   menuItems.at(1).prop('pinboard').should.eql({
  //     id: 2,
  //     title: 'Pinboard 2',
  //     isPinned: true,
  //   });

  //   const createEmptyPinboardButton = wrapper.find('.add-to-new-pinboard');
  //   createEmptyPinboardButton.exists().should.be.true();
  // });

  // it('should call handleAddToNewPinboard when user click on Create pinboard', function (done) {
  //   const closeMenuSpy = spy();
  //   const redirectToCreatedPinboardSpy = spy(pinboardUtils, 'redirectToCreatedPinboard');
  //   const emptyPinboardResponse = { payload: { id: '72jfhg' } };
  //   const createPinboardStub = stub().returns(new Promise(resolve => resolve(emptyPinboardResponse)));
  //   const pinboards = [
  //     {
  //       id: 1,
  //       title: 'Pinboard 1',
  //       isPinned: false,
  //     },
  //     {
  //       id: 2,
  //       title: 'Pinboard 2',
  //       isPinned: true,
  //     },
  //   ];
  //   const wrapper = mount(
  //     <Provider store={ MockStore()({}) }>
  //       <PinboardsMenu
  //         pinboards={ pinboards }
  //         item={ { type: PINNED_ITEM_TYPES.OFFICER, id: 835 } }
  //         closeMenu={ closeMenuSpy }
  //         createPinboard={ createPinboardStub }/>
  //     </Provider>
  //   );
  //   wrapper.find('.add-to-new-pinboard').simulate('click');
  //   createPinboardStub.should.be.calledWith({ officerIds: [835] });
  //   setTimeout(function () {
  //     closeMenuSpy.should.be.calledOnce();
  //     redirectToCreatedPinboardSpy.should.be.calledWith(emptyPinboardResponse);
  //     done();
  //   }, 100);
});

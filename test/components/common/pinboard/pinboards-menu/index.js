import React from 'react';
import { mount } from 'enzyme';
import { spy, stub } from 'sinon';
import { Provider } from 'react-redux';
import { Promise } from 'es6-promise';
import MockStore from 'redux-mock-store';

import PinboardsMenu from 'components/common/pinboard/pinboards-menu';
import { PINNED_ITEM_TYPES } from 'utils/constants';
import * as pinboardUtils from 'utils/pinboard';


describe('PinboardsMenu component', function () {
  it('should render correctly', function () {
    const fetchPinboardsMenuSpy = spy();
    const pinboards = [
      {
        id: 1,
        title: 'Pinboard 1',
        isPinned: false,
      },
      {
        id: 2,
        title: 'Pinboard 2',
        isPinned: true,
      },
    ];
    const wrapper = mount(
      <Provider store={ MockStore()({}) }>
        <PinboardsMenu pinboards={ pinboards } fetchPinboardsMenu={ fetchPinboardsMenuSpy }/>
      </Provider>);
    const menuItems = wrapper.find('PinboardMenuItem');

    menuItems.length.should.equal(2);
    menuItems.at(0).prop('pinboard').should.eql({
      id: 1,
      title: 'Pinboard 1',
      isPinned: false,
    });
    menuItems.at(1).prop('pinboard').should.eql({
      id: 2,
      title: 'Pinboard 2',
      isPinned: true,
    });

    const createEmptyPinboardButton = wrapper.find('.create-pinboard-with-selection');
    createEmptyPinboardButton.exists().should.be.true();

    fetchPinboardsMenuSpy.should.be.calledOnce();
  });

  it('should call handleCreatePinboardWithSelection when user click on Create pinboard', function (done) {
    const fetchPinboardsMenuSpy = spy();
    const closeMenuSpy = spy();
    const redirectToCreatedPinboardSpy = spy(pinboardUtils, 'redirectToCreatedPinboard');
    const emptyPinboardResponse = { payload: { id: '72jfhg' } };
    const createPinboardStub = stub().returns(new Promise(resolve => resolve(emptyPinboardResponse)));
    const pinboards = [
      {
        id: 1,
        title: 'Pinboard 1',
        isPinned: false,
      },
      {
        id: 2,
        title: 'Pinboard 2',
        isPinned: true,
      },
    ];
    const wrapper = mount(
      <Provider store={ MockStore()({}) }>
        <PinboardsMenu
          pinboards={ pinboards }
          fetchPinboardsMenu={ fetchPinboardsMenuSpy }
          item={ { type: PINNED_ITEM_TYPES.OFFICER, id: 835 } }
          closeMenu={ closeMenuSpy }
          createPinboard={ createPinboardStub }/>
      </Provider>
    );
    wrapper.find('.create-pinboard-with-selection').simulate('click');
    createPinboardStub.should.be.calledWith({ officerIds: [835] });
    setTimeout(function () {
      closeMenuSpy.should.be.calledOnce();
      redirectToCreatedPinboardSpy.should.be.calledWith(emptyPinboardResponse);
      done();
    }, 100);
  });

  describe('PinButton click', function () {
    let fetchPinboardsMenuSpy;
    let fetchPinboardStub;
    let addOrRemoveItemInPinboardSpy;
    let closeMenuSpy;
    let wrapper;

    beforeEach(function () {
      addOrRemoveItemInPinboardSpy = spy();
      fetchPinboardsMenuSpy = spy();
      closeMenuSpy = spy();
      fetchPinboardStub = stub().returns(new Promise(resolve => resolve()));
      const pinboards = [
        {
          id: 1,
          title: 'Pinboard 1',
          isPinned: false,
          isCurrent: false,
        },
        {
          id: 2,
          title: 'Pinboard 2',
          isPinned: true,
          isCurrent: true,
        },
      ];
      wrapper = mount(
        <Provider store={ MockStore()({}) }>
          <PinboardsMenu
            pinboards={ pinboards }
            fetchPinboardsMenu={ fetchPinboardsMenuSpy }
            addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardSpy }
            item={ { type: 'OFFICER' } }
            closeMenu={ closeMenuSpy }
            fetchPinboard={ fetchPinboardStub }/>
        </Provider>
      );
    });

    it('should call fetchPinboard if isCurrent is false', function (done) {
      const firstPinButton = wrapper.find('PinboardMenuItem').first();
      const firstLink = firstPinButton.find('PinboardLink').childAt(0);
      firstLink.simulate('click');

      fetchPinboardStub.should.be.calledOnce();
      closeMenuSpy.should.be.calledOnce();
      setTimeout(function () {
        addOrRemoveItemInPinboardSpy.should.be.calledOnce();
        done();
      }, 100);
    });

    it('should not call fetchPinboard if isCurrent is true', function () {
      const secondPinButton = wrapper.find('PinboardMenuItem').last();
      const secondLink = secondPinButton.find('PinboardLink').childAt(0);
      secondLink.simulate('click');

      addOrRemoveItemInPinboardSpy.should.be.calledOnce();
      fetchPinboardStub.should.not.be.called();
      closeMenuSpy.should.be.calledOnce();
    });
  });

});

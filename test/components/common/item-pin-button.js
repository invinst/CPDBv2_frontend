// import React from 'react';
// import { mount } from 'enzyme';
// import { stub, spy } from 'sinon';

// import ItemPinButton from 'components/common/item-pin-button';
// import browserHistory from 'utils/history';


describe('<ItemPinButton />', function () {
  // it('should call addItemInPinboardPage action when clicked on', function () {
  //   const addOrRemoveItemInPinboard = stub();
  //   const wrapper = mount(
  //     <ItemPinButton
  //       addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
  //       item={ {
  //         isPinned: false,
  //         type: 'CR',
  //         id: '1',
  //       } }
  //     />
  //   );
  //   wrapper.simulate('click');
  //   addOrRemoveItemInPinboard.calledWith({
  //     type: 'CR',
  //     id: '1',
  //     isPinned: false,
  //   }).should.be.true();
  // });

  // it('should redirect to pinboardUrl on hint click', function () {
  //   const browserHistoryPush = stub(browserHistory, 'push');
  //   const pinboardUrl = '/pinboard/12f453/untitled-title';
  //   const preventDefaultSpy = spy();
  //   const stopPropagationSpy = spy();
  //   const wrapper = mount(<ItemPinButton showHint={ true } pinboardUrl={ pinboardUrl } />);
  //   wrapper.find('.pin-action-hint').simulate(
  //     'click',
  //     { preventDefault: preventDefaultSpy, stopPropagation: stopPropagationSpy }
  //   );
  //   browserHistoryPush.should.be.calledWith(pinboardUrl);
  //   preventDefaultSpy.should.be.called();
  //   stopPropagationSpy.should.be.called();
  // });

  // describe('render', function () {
  //   it('should have class pinboard-feature', function () {
  //     const wrapper = mount(<ItemPinButton item={ { isPinned: true } } />);
  //     wrapper.find('ItemPinButton').childAt(0).hasClass('pinboard-feature').should.be.true();
  //   });

  //   it('should have class is-pinned if item.isPinned is true', function () {
  //     const wrapper = mount(<ItemPinButton item={ { isPinned: true } } />);
  //     wrapper.find('.is-pinned').exists().should.be.true();
  //   });

  //   it('should not have class is-pinned if item.isPinned is false', function () {
  //     const wrapper = mount(<ItemPinButton item={ { isPinned: false } } />);
  //     wrapper.find('.is-pinned').exists().should.be.false();
  //   });

  //   it('should render pin action hint if showHint is true', function () {
  //     const wrapper = mount(<ItemPinButton />);

  //     wrapper.find('.pin-action-hint').exists().should.be.true();
  //   });

  //   it('should not render pin action hint if showHint is false', function () {
  //     const wrapper = mount(<ItemPinButton showHint={ false }/>);

  //     wrapper.find('.pin-action-hint').exists().should.be.false();
  //   });

  //   it('should have class show-introduction if showIntroduction is true', function () {
  //     const wrapper = mount(<ItemPinButton showIntroduction={ true }/>);

  //     wrapper.find('.show-introduction').exists().should.be.true();
  //   });

  //   it('should not have class show-introduction if showIntroduction is false', function () {
  //     const wrapper = mount(<ItemPinButton showIntroduction={ false }/>);

  //     wrapper.find('.show-introduction').exists().should.be.false();
  //   });
  // });
});

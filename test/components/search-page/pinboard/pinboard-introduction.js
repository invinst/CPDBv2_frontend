// import React from 'react';
// import { mount } from 'enzyme';
// import { spy } from 'sinon';
// import should from 'should';

// import PinboardIntroduction from 'components/search-page/pinboard/pinboard-introduction';
// import browserHistory from 'utils/history';
// import styles from 'components/search-page/pinboard/pinboard-introduction.sass';


describe('PinboardIntroduction component', function () {
  // let wrapper;
  // context('isPinboardIntroductionVisited is false', function () {
  //   context('pinboardFeatureUsed is true', function () {
  //     it('should render nothing', function () {
  //       const wrapper = mount(
  //         <PinboardIntroduction
  //           pinboardFeatureUsed={ true }
  //           isPinboardIntroductionVisited={ false }
  //         />
  //       );
  //       should(wrapper.html()).be.null();
  //     });
  //   });

  //   context('pinboardFeatureUsed is false', function () {
  //     let visitPinboardIntroductionSpy;
  //     let browserHistoryPushSpy;
  //     beforeEach(function () {
  //       visitPinboardIntroductionSpy = spy();
  //       wrapper = mount(
  //         <PinboardIntroduction
  //           pinboardFeatureUsed={ false }
  //           isPinboardIntroductionVisited={ false }
  //           visitPinboardIntroduction={ visitPinboardIntroductionSpy }
  //         />
  //       );
  //       browserHistoryPushSpy = spy(browserHistory, 'push');
  //     });

  //     it('should render pinboard introduction', function () {
  //       wrapper.find(`.${styles.pinboardIntroduction}`).exists().should.be.true();
  //     });

  //     it('should call setPinboardIntroductionVisited on close button clicked', function () {
  //       wrapper.find('.introduction-close-btn').simulate('click');
  //       visitPinboardIntroductionSpy.should.be.calledOnce();
  //     });

  //     it('should call setPinboardIntroductionVisited and redirect to /pinboard/ on Get Started clicked', function () {
  //       wrapper.find('.get-started-btn').simulate('click');
  //       visitPinboardIntroductionSpy.should.be.calledOnce();
  //       browserHistoryPushSpy.should.be.calledWith('/pinboard/');
  //     });
  //   });
  // });

  // context('isPinboardIntroductionVisited is true', function () {
  //   it('should render nothing', function () {
  //     const wrapper = mount(<PinboardIntroduction isPinboardIntroductionVisited={ true } />);
  //     should(wrapper.html()).be.null();
  //   });
  // });
});

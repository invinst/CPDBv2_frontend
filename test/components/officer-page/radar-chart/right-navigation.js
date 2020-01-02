import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import RightNavigation from 'components/officer-page/radar-chart/explainer/right-navigation';
import styles from 'components/officer-page/radar-chart/explainer/right-navigation.sass';


describe('RightNavigation components', function () {
  it('should render correct content', function () {
    const wrapper = shallow(<RightNavigation text='Some text'/>);
    wrapper.text().should.equal('Some text');
  });

  it('should invoke onClickHandler when being clicked', function () {
    const onClickHandlerStub = stub();

    const wrapper = shallow(
      <RightNavigation onClickHandler={ onClickHandlerStub } text='Some text'/>
    );

    const rightNavigationElm = wrapper.find(`.${styles.rightNavigation}`);
    rightNavigationElm.simulate('click');

    onClickHandlerStub.calledOnce.should.be.true();
  });
});

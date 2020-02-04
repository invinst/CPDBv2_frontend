import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import LeftNavigation from 'components/officer-page/radar-chart/explainer/left-navigation';
import styles from 'components/officer-page/radar-chart/explainer/left-navigation.sass';


describe('LeftNavigation components', function () {
  it('should render correct content', function () {
    const wrapper = shallow(<LeftNavigation text='Some text'/>);

    wrapper.text().should.equal('Some text');
  });

  it('should invoke onClickHandler when being clicked', function () {
    const onClickHandlerStub = sinon.stub();

    const wrapper = shallow(
      <LeftNavigation onClickHandler={ onClickHandlerStub } text='Some text'/>
    );

    const leftNavigationElm = wrapper.find(`.${styles.leftNavigation}`);
    leftNavigationElm.simulate('click');

    onClickHandlerStub.calledOnce.should.be.true();
  });
});

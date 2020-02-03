import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router-dom';
import sinon from 'sinon';
import config from 'config';

import Header from 'components/pinboard-page/header';
import * as editPathUtils from 'utils/edit-path';
import * as tracking from 'utils/tracking';


describe('Pinboard Header component', function () {

  it('should render correctly', function () {
    const wrapper = shallow(<Header />);

    const headerTitle = wrapper.find(Link);
    headerTitle.prop('to').should.equal('/');

    const menuItems = wrapper.find('.menu-item');
    menuItems.should.have.length(4);
    menuItems.at(0).text().should.equal('Data');
    menuItems.at(1).text().should.equal('Q&A');
    menuItems.at(2).text().should.equal('Documents');
    menuItems.at(3).text().should.equal('Pinboards');
  });

  it('should highlight Pinboards link', function () {
    const wrapper = shallow(<Header />);

    const highlightedMenuItems = wrapper.find('.highlight');
    highlightedMenuItems.text().should.equal('Pinboards');
  });

  context('clicking on a menu item', function () {
    beforeEach(function () {
      this.stubPushPathPreserveEditMode = sinon.stub(editPathUtils, 'pushPathPreserveEditMode');
      this.stubTrackOutboundLink = sinon.stub(tracking, 'trackOutboundLink');
      const wrapper = mount(<Header />);
      this.menuItems = wrapper.find('.menu-item');
    });

    it('should call correct function when clicking on Data link', function () {
      const link = this.menuItems.at(0);
      link.simulate('click');

      this.stubTrackOutboundLink.should.be.calledOnce();
      this.stubTrackOutboundLink.should.be.calledWith(config.v1Url);
      this.stubPushPathPreserveEditMode.should.not.be.called();
    });

    it('should call correct function when clicking on Q&A link', function () {
      const link = this.menuItems.at(1);
      link.simulate('click');

      this.stubTrackOutboundLink.should.be.calledOnce();
      this.stubTrackOutboundLink.should.be.calledWith('http://how.cpdp.works/');
      this.stubPushPathPreserveEditMode.should.not.be.called();
    });

    it('should call correct function when clicking on Documents link', function () {
      const link = this.menuItems.at(2);
      link.simulate('click');

      this.stubPushPathPreserveEditMode.should.be.calledOnce();
      this.stubPushPathPreserveEditMode.should.be.calledWith('/documents/');
      this.stubTrackOutboundLink.should.not.be.called();
    });

    it('should not call anything when clicking on Pinboard link', function () {
      const link = this.menuItems.at(3);
      link.simulate('click');

      this.stubPushPathPreserveEditMode.should.not.be.called();
      this.stubTrackOutboundLink.should.not.be.called();
    });
  });
});

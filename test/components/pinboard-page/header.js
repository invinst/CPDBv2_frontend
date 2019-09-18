import React from 'react';
import { Link } from 'react-router';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import config from 'config';

import { unmountComponentSuppressError } from 'utils/test';
import Header from 'components/pinboard-page/header';
import * as editPathUtils from 'utils/edit-path';
import * as GAUtils from 'utils/google_analytics_tracking';


describe('Pinboard Header component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(<Header />);

    const headerTitle = findRenderedComponentWithType(instance, Link);
    headerTitle.props.to.should.eql('/');

    const menuItems = scryRenderedDOMComponentsWithClass(instance, 'menu-item');
    menuItems.should.have.length(4);
    menuItems[0].textContent.should.eql('Data');
    menuItems[1].textContent.should.eql('Q&A');
    menuItems[2].textContent.should.eql('Documents');
    menuItems[3].textContent.should.eql('Pinboard');
  });

  it('should highlight Pinboard link', function () {
    instance = renderIntoDocument(<Header />);

    const highlightedMenuItems = findRenderedDOMComponentWithClass(instance, 'highlight');
    highlightedMenuItems.textContent.should.eql('Pinboard');
  });

  context('clicking on a menu item', function () {
    beforeEach(function () {
      this.stubPushPathPreserveEditMode = stub(editPathUtils, 'pushPathPreserveEditMode');
      this.stubTrackOutboundLink = stub(GAUtils, 'trackOutboundLink');
      instance = renderIntoDocument(<Header />);
      this.menuItems = scryRenderedDOMComponentsWithClass(instance, 'menu-item');
    });

    afterEach(function () {
      this.stubPushPathPreserveEditMode.restore();
      this.stubTrackOutboundLink.restore();
    });

    it('should call correct function when clicking on Data link', function () {
      const link = this.menuItems[0];
      Simulate.click(link);

      this.stubTrackOutboundLink.should.be.calledOnce();
      this.stubTrackOutboundLink.should.be.calledWith(config.v1Url);
      this.stubPushPathPreserveEditMode.should.not.be.called();
    });

    it('should call correct function when clicking on Q&A link', function () {
      const link = this.menuItems[1];
      Simulate.click(link);

      this.stubTrackOutboundLink.should.be.calledOnce();
      this.stubTrackOutboundLink.should.be.calledWith('http://how.cpdp.works/');
      this.stubPushPathPreserveEditMode.should.not.be.called();
    });

    it('should call correct function when clicking on Documents link', function () {
      const link = this.menuItems[2];
      Simulate.click(link);

      this.stubPushPathPreserveEditMode.should.be.calledOnce();
      this.stubPushPathPreserveEditMode.should.be.calledWith('/documents/');
      this.stubTrackOutboundLink.should.not.be.called();
    });

    it('should not call anything when clicking on Pinboard link', function () {
      const link = this.menuItems[3];
      Simulate.click(link);

      this.stubPushPathPreserveEditMode.should.not.be.called();
      this.stubTrackOutboundLink.should.not.be.called();
    });
  });
});

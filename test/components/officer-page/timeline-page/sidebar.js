import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';

import SideBar from 'components/officer-page/timeline-page/sidebar';
import Minimap from 'components/officer-page/timeline-page/minimap';
import SideBarButton from 'components/officer-page/timeline-page/sidebar-button';
import { unmountComponentSuppressError } from 'utils/test';


describe('Timeline SideBar component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render SideBarButton and Minimap', function () {
    instance = renderIntoDocument(
      <SideBar/>
    );

    scryRenderedComponentsWithType(instance, SideBarButton).should.have.length(2);
    scryRenderedComponentsWithType(instance, Minimap).should.have.length(1);
  });

  it('should call fetchMinimap on initialization', function () {
    const fetchMinimap = spy();
    const officerId = 1;
    instance = renderIntoDocument(
      <SideBar fetchMinimap={ fetchMinimap } officerId={ officerId }/>
    );

    fetchMinimap.calledWith(officerId).should.be.true();
  });

  it('should display "Sort by oldest first" if sortDescending', function () {
    instance = renderIntoDocument(
      <SideBar sortDescending={ true }/>
    );
    scryRenderedComponentsWithType(instance, SideBarButton)[1].props.children.should.eql('Sort by oldest first');
  });

  it('should display "Sort by oldest first" if not sortDescending', function () {
    instance = renderIntoDocument(
      <SideBar sortDescending={ false }/>
    );
    scryRenderedComponentsWithType(instance, SideBarButton)[1].props.children.should.eql('Sort by newest first');
  });

  it('should flip sort order when click on sort button', function () {
    const flipSortOrder = spy();
    instance = renderIntoDocument(<SideBar flipSortOrder={ flipSortOrder }/>);
    scryRenderedComponentsWithType(instance, SideBarButton)[1].props.onClick();
    flipSortOrder.called.should.be.true();
  });
});

import React from 'react';
import { Provider } from 'react-redux';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { stub, spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import * as DomUtils from 'utils/dom';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import LogOutButton from 'components/log-out-button';
import SlimHeaderContent from 'components/headers/slim-header/slim-header-content';
import Logo from 'components/headers/slim-header/slim-header-content/logo';
import DemoVideo from 'components/headers/slim-header/slim-header-content/demo-video';
import RightLinks from 'components/headers/slim-header/slim-header-content/right-links';
import SearchBox from 'components/headers/slim-header/slim-header-content/search-box';


describe('SlimHeaderContent component', function () {
  let element;
  const storeMock = MockStore()({
    authentication: {},
    cms: {
      pages: {}
    },
    headers: {
      slimHeader: {
        logoSectionEditModeOn: false
      }
    }
  });

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render correctly', function () {
    const openVideoModal = spy();

    element = renderIntoDocument(
      <Provider store={ storeMock } >
        <SlimHeaderContent
          position='top'
          pathname='/'
          editModeOn={ false }
          disableTop={ false }
          className='custom-class-name'
          openVideoModal={ openVideoModal }
          videoThumbnailUrl='https://i.vimeocdn.com/video/797111186_100x75.webp'
        />
      </Provider>
    );

    const header = findRenderedComponentWithType(element, SlimHeaderContent);
    const headerDom = findDOMNode(header);
    headerDom.getAttribute('class').should.eql('custom-class-name');

    const responsiveFluidWidthComponent = findRenderedComponentWithType(header, ResponsiveFluidWidthComponent);

    const logo = findRenderedComponentWithType(responsiveFluidWidthComponent, Logo);
    logo.props.position.should.equal('top');
    logo.props.editModeOn.should.be.false();

    const demoVideo = findRenderedComponentWithType(responsiveFluidWidthComponent, DemoVideo);
    demoVideo.props.position.should.equal('top');
    demoVideo.props.openVideoModal.should.equal(openVideoModal);
    demoVideo.props.videoThumbnailUrl.should.equal('https://i.vimeocdn.com/video/797111186_100x75.webp');

    findRenderedComponentWithType(responsiveFluidWidthComponent, LogOutButton);

    findRenderedComponentWithType(responsiveFluidWidthComponent, RightLinks).props.position.should.equal('top');
    findRenderedComponentWithType(responsiveFluidWidthComponent, SearchBox).props.position.should.equal('top');
  });

  it('should have correct position', function () {
    element = renderIntoDocument(
      <Provider store={ storeMock } >
        <SlimHeaderContent position='bottom'/>
      </Provider>
    );
    const header = findRenderedComponentWithType(element, SlimHeaderContent);
    header.getPosition().should.equal('bottom');
  });

  it('should set position to middle if disabled top', function () {
    element = renderIntoDocument(
      <Provider store={ storeMock } >
        <SlimHeaderContent position='top' disableTop={ true }/>
      </Provider>
    );
    const header = findRenderedComponentWithType(element, SlimHeaderContent);
    header.getPosition().should.equal('middle');
  });

  it('should scroll to top when being clicked and position is bottom', function () {
    const scrollToTopStub = stub(DomUtils, 'scrollToTop');

    element = renderIntoDocument(
      <Provider store={ storeMock } >
        <SlimHeaderContent position='bottom'/>
      </Provider>
    );

    const header = findRenderedComponentWithType(element, SlimHeaderContent);
    Simulate.click(findDOMNode(header));

    scrollToTopStub.should.be.calledOnce();

    scrollToTopStub.restore();
  });

  it('should not scroll to top when being clicked if position is not bottom', function () {
    const scrollToTopStub = stub(DomUtils, 'scrollToTop');

    element = renderIntoDocument(
      <Provider store={ storeMock } >
        <SlimHeaderContent position='top'/>
      </Provider>
    );

    const header = findRenderedComponentWithType(element, SlimHeaderContent);
    Simulate.click(findDOMNode(header));

    scrollToTopStub.should.not.be.called();

    scrollToTopStub.restore();
  });
});

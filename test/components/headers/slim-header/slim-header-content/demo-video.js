import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import DemoVideo from 'components/headers/slim-header/slim-header-content/demo-video';


describe('DemoVideo component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    const openVideoModalStub = stub();
    instance = renderIntoDocument(
      <DemoVideo
        position='top'
        openVideoModal={ openVideoModalStub }
        videoThumbnailUrl='https://i.vimeocdn.com/video/797111186_100x75.webp'/>
    );

    findDOMNode(instance).getAttribute('class').should.containEql('top');
    findRenderedDOMComponentWithClass(instance, 'demo-video-text-upper').textContent.should.eql('WATCH:');
    findRenderedDOMComponentWithClass(instance, 'demo-video-text-lower').textContent.should.eql('What is CPDP?');
    findRenderedDOMComponentWithClass(instance, 'demo-video-thumbnail').getAttribute('src').should.eql(
      'https://i.vimeocdn.com/video/797111186_100x75.webp'
    );
    findRenderedDOMComponentWithClass(instance, 'demo-video-play-button').getAttribute('src').should.eql(
      '/img/video-play-button.svg'
    );
  });

  it('should openVideoModal when clicking on video button', function () {
    const openVideoModalStub = stub();
    const stopPropagationStub = stub();
    instance = renderIntoDocument(
      <DemoVideo
        position='top'
        openVideoModal={ openVideoModalStub }
        videoThumbnailUrl='https://i.vimeocdn.com/video/797111186_100x75.webp'/>
    );
    const videoButton = findRenderedDOMComponentWithClass(instance, 'demo-video-button');

    Simulate.click(videoButton, { stopPropagation: stopPropagationStub });

    openVideoModalStub.should.be.calledOnce();
    stopPropagationStub.should.be.calledOnce();
  });
});

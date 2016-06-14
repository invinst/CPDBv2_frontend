import React from 'react';
import { render, findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import BottomSheet from 'components/bottom-sheet/bottom-sheet';
import { unmountComponentSuppressError } from 'utils/test';
import StoryFactory from 'utils/test/factories/story';
import { STORY_TYPE } from 'actions/landing-page/bottom-sheet';


describe('BottomSheet component', function () {
  let element;
  const story = StoryFactory.build();

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render nothing at first and eventually render bottom sheet when open become true', function (callback) {
    let rootEl = document.createElement('div');

    element = render(
      <BottomSheet open={ false }/>,
      rootEl);

    render(
      <BottomSheet open={ true }/>,
      rootEl, () => {
        rootEl.children[0].children[0].nodeName.should.equal('NOSCRIPT');
        setTimeout(() => {
          rootEl.children[0].children[0].nodeName.should.equal('DIV');
          callback();
        }, 300);
      });
  });

  it('should render bottom sheet at first and eventually render nothing when open become false', function (callback) {
    let rootEl = document.createElement('div');

    element = render(
      <BottomSheet open={ true }/>,
      rootEl);

    render(
      <BottomSheet open={ false }/>,
      rootEl, () => {
        rootEl.children[0].children[0].nodeName.should.equal('DIV');
        setTimeout(() => {
          rootEl.children[0].children[0].nodeName.should.equal('NOSCRIPT');
          callback();
        }, 500);
      });
  });

  it('should render story when received story content', function () {
    element = renderIntoDocument(
      <BottomSheet open={ true } content={ { type: STORY_TYPE, props: { story: story } } }/>
    );
    findDOMNode(element).innerHTML.should.containEql(story.title);
  });

  it('should render previous content when receive null content', function () {
    let rootEl = document.createElement('div');

    render(
      <BottomSheet open={ true } content={ { type: STORY_TYPE, props: { story: story } } }/>,
      rootEl);
    element = render(
      <BottomSheet open={ true } content={ null }/>,
      rootEl);
    findDOMNode(element).innerHTML.should.containEql(story.title);
  });

  it('should trigger onClose when click on overlay', function () {
    BottomSheet.should.triggerCallbackWhenClick('onClose', 'bottom-sheet__overlay', { open: true });
  });

  it('should trigger onClose when click on dismiss button', function () {
    BottomSheet.should.triggerCallbackWhenClick('onClose', 'bottom-sheet__back-btn', { open: true });
  });
});

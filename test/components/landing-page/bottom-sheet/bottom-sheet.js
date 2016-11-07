import React from 'react';
import { render, findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import BottomSheet from 'components/bottom-sheet';
import { unmountComponentSuppressError } from 'utils/test';
import StoryFactory from 'utils/test/factories/story';
import FAQFactory from 'utils/test/factories/faq';
import { STORY_TYPE, FAQ_TYPE } from 'actions/bottom-sheet';


describe('BottomSheet component', function () {
  let element;
  const story = StoryFactory.build();
  const faq = FAQFactory.build();

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
        rootEl.children[0].children.length.should.equal(0);
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
          rootEl.children[0].children.length.should.equal(0);
          callback();
        }, 1000);
      });
  });

  it('should render story when received story content', function () {
    element = renderIntoDocument(
      <BottomSheet open={ true } content={ { type: STORY_TYPE, props: { story: story } } }/>
    );
    findDOMNode(element).innerHTML.should.containEql(story.title);
  });

  it('should render faq when received faq content', function () {
    element = renderIntoDocument(
      <BottomSheet open={ true } content={ { type: FAQ_TYPE, props: { faq: faq } } }/>
    );
    findDOMNode(element).innerHTML.should.containEql(faq.title);
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

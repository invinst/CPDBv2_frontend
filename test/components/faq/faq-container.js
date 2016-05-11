import 'should';
import React from 'react';
import {
  Simulate, renderIntoDocument, scryRenderedDOMComponentsWithClass, findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import 'utils/test/React';
import FAQContainer from 'components/faq/faq-container';
import { unmountComponentSuppressError } from 'utils/test';
import { withAnimationDisabled } from 'utils/test';
import ArticleSmall from 'components/common/article-small';
import ExpandTransition from 'components/animation/expand-transition';
import FAQFactory from 'utils/test/factories/faq';


describe('FAQContainer component', function () {
  let element;
  let faqs = [1, 2, 3].map((id) => (FAQFactory.build({ id: id })));

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render in all screen size', function () {
    FAQContainer.should.be.renderable();
    FAQContainer.should.be.responsiveRenderable();
  });

  it('should update selectedFAQKey depending on which story is expanded', function () {
    withAnimationDisabled(() => {
      element = renderIntoDocument(<FAQContainer faqs={ faqs }/>);
      let smallStory = scryRenderedDOMComponentsWithClass(element, 'article-small')[0];
      Simulate.click(smallStory);
      element.state.selectedFAQKey.should.equal(1);
    });
  });

  it('should set selectedFAQKey to null when story is closed', function () {
    withAnimationDisabled(() => {
      element = renderIntoDocument(<FAQContainer faqs={ faqs }/>);
      let smallStory = scryRenderedComponentsWithType(element, ArticleSmall)[0];
      Simulate.click(smallStory);
      smallStory.props.onClose([null, null]);
      (element.state.selectedFAQKey === null).should.be.true();
    });
  });

  it('should change faqExpanded state when ExpandTransition begin expanding or fully closed', function () {
    withAnimationDisabled(() => {
      element = renderIntoDocument(<FAQContainer faqs={ faqs }/>);
      let transition = findRenderedComponentWithType(element, ExpandTransition);

      transition.props.onFullyClosed(1);
      element.state.faqExpanded.should.deepEqual({ 1: false });

      transition.props.onExpandingBegin(2);
      element.state.faqExpanded.should.deepEqual({ 2: true });
    });
  });
});

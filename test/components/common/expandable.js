import React from 'react';
import {
  renderIntoDocument, findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import Expandable from 'components/common/expandable';
import StoryFull from 'components/stories/story-full';
import { withAnimationDisabled } from 'utils/test';
import { unmountComponentSuppressError } from 'utils/test';
import { TOP, BOTTOM } from 'utils/constants';


describe('Expandable higher order component', function () {
  let element;
  const ExpandableCompoent = Expandable(StoryFull, {});

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render StoryFull first when expandDirection is TOP', function () {
    withAnimationDisabled(() => {
      let siblingText = 'sibling';
      element = renderIntoDocument(
        <ExpandableCompoent expandDirection={ TOP } childKey='1'><p>{ siblingText }</p></ExpandableCompoent>
      );
      findRenderedDOMComponentWithClass(element, 'story-full').nextSibling.textContent.should.equal(siblingText);
    });
  });

  it('should render StoryFull last when expandDirection is BOTTOM', function () {
    withAnimationDisabled(() => {
      let siblingText = 'sibling';
      element = renderIntoDocument(
        <ExpandableCompoent expandDirection={ BOTTOM } childKey='1'><p>{ siblingText }</p></ExpandableCompoent>
      );
      findRenderedDOMComponentWithClass(element, 'story-full').previousSibling.textContent.should.equal(siblingText);
    });
  });
});

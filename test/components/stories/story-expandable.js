import 'should';
import React from 'react';
import {
  renderIntoDocument, findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import StoryExpandable from 'components/stories/story-expandable';
import { withAnimationDisabled } from 'utils/test';
import { unmountComponentSuppressError } from 'utils/test';
import { TOP, BOTTOM } from 'utils/constants';


describe('StoryExpandable component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render StoryFull first when expandDirection is TOP', function () {
    withAnimationDisabled(() => {
      let siblingText = 'sibling';
      element = renderIntoDocument(
        <StoryExpandable expandDirection={ TOP } childKey='1'><p>{ siblingText }</p></StoryExpandable>
      );
      findRenderedDOMComponentWithClass(element, 'story-full').nextSibling.textContent.should.equal(siblingText);
    });
  });

  it('should render StoryFull last when expandDirection is BOTTOM', function () {
    withAnimationDisabled(() => {
      let siblingText = 'sibling';
      element = renderIntoDocument(
        <StoryExpandable expandDirection={ BOTTOM } childKey='1'><p>{ siblingText }</p></StoryExpandable>
      );
      findRenderedDOMComponentWithClass(element, 'story-full').previousSibling.textContent.should.equal(siblingText);
    });
  });
});

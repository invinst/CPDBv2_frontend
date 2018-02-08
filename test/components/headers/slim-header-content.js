import React, { PropTypes } from 'react';
import { unmountComponentSuppressError } from 'utils/test';
import ContextWrapper from 'utils/test/components/context-wrapper';
import {
  bottomLeftLinkStyle,
  bottomRightLinkStyle, bottomSlimHeaderStyle, bottomSubtitleStyle,
  middleLeftLinkStyle, middleRightLinkStyle,
  middleSlimHeaderStyle, middleSubtitleStyle, middleWrapperStyle,
  topLeftLinkStyle, topRightLinkStyle,
  topSlimHeaderStyle, topSubtitleStyle
} from 'components/headers/slim-header/slim-header.style';
import { scrollToTop } from 'utils/dom';
import {
  bottomSearchBoxStyle,
  middleSearchBoxStyle,
  topSearchBoxStyle
} from 'components/landing-page/search-section/search-section.style';
import { accentColor } from 'utils/styles';
import SlimHeaderContent from 'components/headers/slim-header/slim-header-content';

class SlimHeaderContentContextWrapper extends ContextWrapper {
}

SlimHeaderContentContextWrapper.childContextTypes = {
  editModeOn: PropTypes.bool
};

describe('SlimHeaderContent component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('getPositionSpecificStyles should return correct styles', function () {
    SlimHeaderContent.prototype.getPositionSpecificStyles('top', false).should.containEql({
      wrapperStyle: {},
      subtitleStyle: topSubtitleStyle,
      slimHeaderStyle: topSlimHeaderStyle,
      leftLinkStyle: topLeftLinkStyle,
      rightLinkStyle: topRightLinkStyle,
      searchBoxStyle: topSearchBoxStyle,
      magnifyingGlassColor: accentColor,
    });

    SlimHeaderContent.prototype.getPositionSpecificStyles('middle', false).should.containEql({
      wrapperStyle: middleWrapperStyle,
      slimHeaderStyle: middleSlimHeaderStyle,
      leftLinkStyle: middleLeftLinkStyle,
      rightLinkStyle: middleRightLinkStyle,
      subtitleStyle: middleSubtitleStyle,
      searchBoxStyle: middleSearchBoxStyle,
      magnifyingGlassColor: accentColor,
    });

    SlimHeaderContent.prototype.getPositionSpecificStyles('bottom', false).should.eql({
      wrapperStyle: {},
      slimHeaderStyle: bottomSlimHeaderStyle,
      leftLinkStyle: bottomLeftLinkStyle,
      rightLinkStyle: bottomRightLinkStyle,
      subtitleStyle: bottomSubtitleStyle,
      searchBoxStyle: bottomSearchBoxStyle,
      magnifyingGlassColor: 'white',
      handleOnClick: scrollToTop
    });
  });
});

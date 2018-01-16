import React, { PropTypes, Component } from 'react';
import RightLinks from './right-links';
import Logo from './logo';
import {
  bottomLeftLinkStyle,
  bottomRightLinkStyle,
  bottomSlimHeaderStyle,
  bottomSubtitleStyle,
  middleLeftLinkStyle,
  middleRightLinkStyle,
  middleSlimHeaderStyle,
  middleSubtitleStyle,
  verticallyAlignedHeaderItemStyle,
  topLeftLinkStyle,
  topRightLinkStyle,
  topSlimHeaderStyle,
  topSubtitleStyle
} from './slim-header.style';
import {
  bottomSearchBoxStyle, middleSearchBoxStyle,
  topSearchBoxStyle
} from 'components/landing-page/search-section/search-section.style';
import LogOutButtonContainer from 'containers/log-out-container';
import SearchSectionComponent from 'components/landing-page/search-section';
import { accentColor } from 'utils/styles';
import { scrollToTop } from 'utils/dom';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';


const positionSpecificStyles = {
  top: {
    subtitleStyle: topSubtitleStyle,
    slimHeaderStyle: topSlimHeaderStyle,
    leftLinkStyle: topLeftLinkStyle,
    rightLinkStyle: topRightLinkStyle,
    searchBoxStyle: topSearchBoxStyle,
    magnifyingGlassColor: accentColor,
    handleOnClick: () => {},
  },
  middle: {
    slimHeaderStyle: middleSlimHeaderStyle,
    leftLinkStyle: middleLeftLinkStyle,
    rightLinkStyle: middleRightLinkStyle,
    subtitleStyle: middleSubtitleStyle,
    searchBoxStyle: middleSearchBoxStyle,
    magnifyingGlassColor: accentColor,
    handleOnClick: () => {}
  },
  bottom: {
    slimHeaderStyle: bottomSlimHeaderStyle,
    leftLinkStyle: bottomLeftLinkStyle,
    rightLinkStyle: bottomRightLinkStyle,
    subtitleStyle: bottomSubtitleStyle,
    searchBoxStyle: bottomSearchBoxStyle,
    magnifyingGlassColor: 'white',
    handleOnClick: scrollToTop
  }
};

class SlimHeaderContent extends Component {
  getPositionSpecificStyles(position, disableTop) {
    if (disableTop && position === 'top') {
      return positionSpecificStyles.middle;
    }
    return positionSpecificStyles[position];
  }

  render() {
    const { position, pathname, editModeOn, style, disableTop, className } = this.props;

    const {
      slimHeaderStyle,
      leftLinkStyle,
      subtitleStyle,
      searchBoxStyle,
      magnifyingGlassColor,
      rightLinkStyle,
      handleOnClick
    } = this.getPositionSpecificStyles(position, disableTop);

    return (
      <div className={ className } style={ { ...slimHeaderStyle, ...style } } onClick={ handleOnClick }>
        <ResponsiveFluidWidthComponent xPadding={ 16 }>
          <div style={ { height: style.height || slimHeaderStyle.height } }>
            <div style={ verticallyAlignedHeaderItemStyle }>
              <LogOutButtonContainer pathname={ pathname } />
            </div>

            <div style={ verticallyAlignedHeaderItemStyle }>
              <RightLinks rightLinkStyle={ rightLinkStyle } editModeOn={ editModeOn } />
            </div>

            <SearchSectionComponent
              searchBoxStyle={ searchBoxStyle }
              magnifyingGlassColor={ magnifyingGlassColor }
            />

            <Logo editModeOn={ editModeOn } leftLinkStyle={ leftLinkStyle } subtitleStyle={ subtitleStyle } />
          </div>
        </ResponsiveFluidWidthComponent>
      </div>
    );
  }
}

SlimHeaderContent.propTypes = {
  position: PropTypes.string,
  pathname: PropTypes.string,
  editModeOn: PropTypes.bool,
  style: PropTypes.object,
  disableTop: PropTypes.bool,
  className: PropTypes.string
};

SlimHeaderContent.defaultProps = {
  style: {},
  disableTop: false,
  position: 'top',
};

export default SlimHeaderContent;

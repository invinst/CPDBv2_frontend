import React, { PropTypes, Component } from 'react';

import RightLinks from './right-links';
import LogoContainer from 'containers/headers/slim-header/logo-container';
import {
  middleWrapperStyle,
  bottomRightLinkStyle,
  bottomSlimHeaderStyle,
  middleRightLinkStyle,
  middleSlimHeaderStyle,
  verticallyAlignedHeaderItemStyle,
  logoWrapper,
  topRightLinkStyle,
  topSlimHeaderStyle,
  bottomSearchBoxStyle,
  middleSearchBoxStyle,
  topSearchBoxStyle
} from './slim-header-content.style';

import LogOutButtonContainer from 'containers/log-out-container';
import SearchSectionComponent from 'components/landing-page/search-section';
import { accentColor } from 'utils/styles';
import { scrollToTop } from 'utils/dom';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';


const positionSpecificStyles = {
  top: {
    wrapperStyle: {},
    slimHeaderStyle: topSlimHeaderStyle,
    rightLinkStyle: topRightLinkStyle,
    searchBoxStyle: topSearchBoxStyle,
    magnifyingGlassColor: accentColor,
    handleOnClick: () => {},
  },
  middle: {
    wrapperStyle: middleWrapperStyle,
    slimHeaderStyle: middleSlimHeaderStyle,
    rightLinkStyle: middleRightLinkStyle,
    searchBoxStyle: middleSearchBoxStyle,
    magnifyingGlassColor: accentColor,
    handleOnClick: () => {}
  },
  bottom: {
    wrapperStyle: {},
    slimHeaderStyle: bottomSlimHeaderStyle,
    rightLinkStyle: bottomRightLinkStyle,
    searchBoxStyle: bottomSearchBoxStyle,
    magnifyingGlassColor: 'white',
    handleOnClick: scrollToTop
  }
};

class SlimHeaderContent extends Component {
  getPosition() {
    const { position, disableTop } = this.props;
    return (position === 'top' && disableTop) ? 'middle' : position;
  }

  render() {
    const { pathname, editModeOn, style, className } = this.props;
    const position = this.getPosition();

    const {
      wrapperStyle,
      slimHeaderStyle,
      searchBoxStyle,
      magnifyingGlassColor,
      rightLinkStyle,
      handleOnClick
    } = positionSpecificStyles[position];

    return (
      <div className={ className } onClick={ handleOnClick } style={ { ...wrapperStyle, ...style } }>
        <ResponsiveFluidWidthComponent>
          <div style={ slimHeaderStyle }>
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

            <div style={ logoWrapper }>
              <LogoContainer position={ position } editModeOn={ editModeOn } />
            </div>
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
  pathname: '/'
};

export default SlimHeaderContent;

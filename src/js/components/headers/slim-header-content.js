import React, { PropTypes, Component } from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router';

import { editMode } from 'utils/edit-path';
import { FAQ_PATH, ROOT_PATH } from 'utils/constants';
import {
  bottomLeftLinkStyle, bottomRightLinkStyle, bottomSlimHeaderStyle, bottomSubtitleStyle,
  logoWrapperStyle, middleLeftLinkStyle, middleRightLinkStyle, middleSlimHeaderStyle, middleSubtitleStyle,
  rightLinksWrapperStyle,
  topLeftLinkStyle,
  topRightLinkStyle,
  topSlimHeaderStyle,
  topSubtitleStyle
} from 'components/headers/slim-header.style';
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

  renderRightLinks(rightLinkStyle) {
    const { editModeOn } = this.props;
    const links = [
      {
        name: 'Data',
        externalHref: 'https://beta.cpdb.co/'
      },
      {
        name: 'FAQ',
        href: '/' + FAQ_PATH
      },
      {
        name: 'Glossary',
        externalHref: 'https://beta.cpdb.co/glossary/'
      }
    ];

    return links.map((link, index) => {
      if (link.externalHref) {
        return (
          <a
            className='test--right-external-link'
            onClick={ (e) => { e.stopPropagation(); } }
            style={ rightLinkStyle }
            key={ index }
            href={ link.externalHref }
          >
            { link.name }
          </a>
        );
      }

      const href = link.href && (editModeOn ? editMode(link.href) : link.href);

      return (
        <Link
          style={ rightLinkStyle }
          key={ index }
          to={ href }
          onClick={ link.onClick }
        >
          { link.name }
        </Link>
      );
    });
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
        <ResponsiveFluidWidthComponent>
          <div style={ { height: style.height || slimHeaderStyle.height } }>
            <div style={ rightLinksWrapperStyle }>
              { this.renderRightLinks(rightLinkStyle) }
              <LogOutButtonContainer pathname={ pathname } />
            </div>

            <SearchSectionComponent
              searchBoxStyle={ searchBoxStyle }
              magnifyingGlassColor={ magnifyingGlassColor } />

            <div style={ logoWrapperStyle }>
              <MediaQuery minWidth={ 830 }>
                { (matches) => (
                  <Link
                    style={ leftLinkStyle }
                    to={ editModeOn ? editMode(ROOT_PATH) : ROOT_PATH }
                    className='test--header-logo'
                  >
                    { matches ? 'Citizens Police Data Project' : 'CPDP' }
                  </Link>
                ) }
              </MediaQuery>
              <MediaQuery minWidth={ 950 }>
                <div style={ subtitleStyle }>
                  <div> collects and publishes information</div>
                  <div> about police misconduct in Chicago.</div>
                </div>
              </MediaQuery>
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
};

export default SlimHeaderContent;

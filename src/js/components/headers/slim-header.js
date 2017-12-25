import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import MediaQuery from 'react-responsive';


import { recalculateStickyness } from 'components/common/sticky-header';
import { ROOT_PATH, FAQ_PATH } from 'utils/constants';
import { editMode } from 'utils/edit-path';
import ConfiguredRadium from 'utils/configured-radium';
import PropsStateRerender from 'components/common/higher-order/props-state-rerender';
import LogOutButtonContainer from 'containers/log-out-container';
import SearchSectionComponent from 'components/landing-page/search-section';
import {
  topSlimHeaderStyle,
  middleSlimHeaderStyle,
  bottomSlimHeaderStyle,
  topLeftLinkStyle,
  middleLeftLinkStyle,
  bottomLeftLinkStyle,
  topRightLinkStyle,
  middleRightLinkStyle,
  bottomRightLinkStyle,
  rightLinksWrapperStyle,
  bottomSubtitleStyle,
  logoWrapperStyle,
  middleSubtitleStyle,
  topSubtitleStyle
} from './slim-header.style';
import { scrollToTop } from 'utils/dom';
import {
  bottomSearchBoxStyle, middleSearchBoxStyle,
  topSearchBoxStyle
} from 'components/landing-page/search-section/search-section.style';
import { accentColor, clayGray } from 'utils/styles';

export class SlimHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitleStyle: topSubtitleStyle,
      slimHeaderStyle: topSlimHeaderStyle,
      leftLinkStyle: topLeftLinkStyle,
      rightLinkStyle: topRightLinkStyle,
      searchBoxStyle: topSearchBoxStyle,
      magnifyingGlassColor: accentColor,
      handleOnClick: () => {},
    };

    this.handleStateChange = this.handleStateChange.bind(this);
  }

  componentDidMount() {
    addEventListener('scroll', recalculateStickyness);
  }

  componentWillUnmount() {
    removeEventListener('scroll', recalculateStickyness);
  }

  renderRightLinks() {
    const { openLegalDisclaimerModal } = this.props;
    const { editModeOn } = this.context;
    const links = [
      {
        name: 'Data',
        externalHref: 'https://beta.cpdb.co/'
      },
      {
        name: 'Legal Disclaimer',
        onClick: openLegalDisclaimerModal
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
            style={ this.state.rightLinkStyle }
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
          style={ this.state.rightLinkStyle }
          key={ index }
          to={ href }
          onClick={ link.onClick }
        >
          { link.name }
        </Link>
      );
    });
  }

  handleStateChange(isSticky, isAtBottom) {
    // top
    if (!isSticky) {
      this.setState({
        slimHeaderStyle: topSlimHeaderStyle,
        leftLinkStyle: topLeftLinkStyle,
        rightLinkStyle: topRightLinkStyle,
        subtitleStyle: topSubtitleStyle,
        searchBoxStyle: topSearchBoxStyle,
        magnifyingGlassColor: accentColor,
        handleOnClick: () => {
        }
      });
    }
    // middle
    else if (!isAtBottom) {
      this.setState({
        slimHeaderStyle: middleSlimHeaderStyle,
        leftLinkStyle: middleLeftLinkStyle,
        rightLinkStyle: middleRightLinkStyle,
        subtitleStyle: middleSubtitleStyle,
        searchBoxStyle: middleSearchBoxStyle,
        magnifyingGlassColor: clayGray,
        handleOnClick: () => {}
      });
    }
    // bottom
    else {
      this.setState({
        slimHeaderStyle: bottomSlimHeaderStyle,
        leftLinkStyle: bottomLeftLinkStyle,
        rightLinkStyle: bottomRightLinkStyle,
        subtitleStyle: bottomSubtitleStyle,
        searchBoxStyle: bottomSearchBoxStyle,
        magnifyingGlassColor: 'white',
        handleOnClick: scrollToTop
      });
    }
  }

  render() {
    const { show, pathname } = this.props;
    const { editModeOn } = this.context;
    const {
      slimHeaderStyle,
      leftLinkStyle,
      subtitleStyle,
      searchBoxStyle,
      magnifyingGlassColor,
      handleOnClick
    } = this.state;

    if (!show) {
      return null;
    }

    const rightLinks = this.renderRightLinks();

    return (
      <StickyHeader
        wrapperComponent={ ResponsiveFluidWidthComponent }
        className='test--slim-header'
        handleStateChange={ this.handleStateChange }
        onClick={ handleOnClick }
        style={ slimHeaderStyle }
      >
        <div style={ { height: slimHeaderStyle.height } }>
          <div style={ rightLinksWrapperStyle }>
            { rightLinks }
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
      </StickyHeader>

    );
  }
}

SlimHeader.propTypes = {
  show: PropTypes.bool,
  pathname: PropTypes.string,
  openLegalDisclaimerModal: PropTypes.func
};

SlimHeader.defaultProps = {
  show: true
};

SlimHeader.contextTypes = {
  editModeOn: PropTypes.bool
};

export default PropsStateRerender(ConfiguredRadium(SlimHeader));

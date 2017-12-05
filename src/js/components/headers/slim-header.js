import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import StickyHeader, { recalculateStickyness } from 'components/common/sticky-header';
import { ROOT_PATH, FAQ_PATH } from 'utils/constants';
import { editMode } from 'utils/edit-path';
import ConfiguredRadium from 'utils/configured-radium';
import PropsStateRerender from 'components/common/higher-order/props-state-rerender';
import LogOutButtonContainer from 'containers/log-out-container';
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
  outerStyle,
  subtitleStyle,
} from './slim-header.style';
import { scrollToTop } from 'utils/dom';

export class SlimHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubtitle: true,
      slimHeaderStyle: topSlimHeaderStyle,
      leftLinkStyle: topLeftLinkStyle,
      rightLinkStyle: topRightLinkStyle,
      handleOnClick: () => {},
    };

    this.scrollEventListener = this.scrollEventListener.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  componentDidMount() {
    addEventListener('scroll', this.scrollEventListener);
  }

  componentWillUnmount() {
    removeEventListener('scroll', this.scrollEventListener);
  }

  scrollEventListener() {
    recalculateStickyness();
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
          onClick={ link.onClick }>
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
        handleOnClick: () => {}
      });
    }
    // middle
    else if (!isAtBottom) {
      this.setState({
        slimHeaderStyle: middleSlimHeaderStyle,
        leftLinkStyle: middleLeftLinkStyle,
        rightLinkStyle: middleRightLinkStyle,
        handleOnClick: () => {}
      });
    }
    // bottom
    else {
      this.setState({
        slimHeaderStyle: bottomSlimHeaderStyle,
        leftLinkStyle: bottomLeftLinkStyle,
        rightLinkStyle: bottomRightLinkStyle,
        handleOnClick: scrollToTop
      });
    }
  }

  render() {
    const { show, pathname } = this.props;
    const { editModeOn } = this.context;

    if (!show) {
      return null;
    }

    const rightLinks = this.renderRightLinks();

    return (
      <ResponsiveFluidWidthComponent style={ outerStyle }>
        <StickyHeader
          className='test--slim-header__wrapper'
          handleStateChange={ this.handleStateChange }
          onClick={ this.state.handleOnClick }
        >
          <div style={ this.state.slimHeaderStyle } className='test--slim-header'>
            <div style={ rightLinksWrapperStyle }>
              { rightLinks }
              <LogOutButtonContainer pathname={ pathname } />
            </div>

            <Link
              style={ this.state.leftLinkStyle }
              to={ editModeOn ? editMode(ROOT_PATH) : ROOT_PATH }
              className='test--header-logo'
            >
              Citizens Police Data Project
            </Link>
          </div>
        </StickyHeader>
        <div style={ { ...subtitleStyle } }>
          <div> collects and publishes information</div>
          <div> about police misconduct in Chicago. </div>
        </div>

      </ResponsiveFluidWidthComponent>
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

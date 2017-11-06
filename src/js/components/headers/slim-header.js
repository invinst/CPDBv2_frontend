import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import { ROOT_PATH, FAQ_PATH } from 'utils/constants';
import { editMode } from 'utils/edit-path';
import ConfiguredRadium from 'utils/configured-radium';
import PropsStateRerender from 'components/common/higher-order/props-state-rerender';
import LogOutButtonContainer from 'containers/log-out-container';
import FadeMotion from 'components/animation/fade-motion';
import {
  slimHeaderStyle,
  leftLinkStyle,
  rightLinkStyle,
  activeLinkStyle,
  rightLinksWrapperStyle,
  outerStyle,
  subtitleStyle,
  slimHeaderHeight,
} from './slim-header.style';

export class SlimHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubtitle: true
    };
    this.scrollEventListener = this.scrollEventListener.bind(this);
  }

  componentDidMount() {
    addEventListener('scroll', this.scrollEventListener);
  }

  componentWillUnmount() {
    removeEventListener('scroll', this.scrollEventListener);
  }

  scrollEventListener() {
    if (window.scrollY > slimHeaderHeight && this.state.showSubtitle) {
      this.setState({
        showSubtitle: false
      });
    } else if (window.scrollY <= slimHeaderHeight && !this.state.showSubtitle) {
      this.setState({
        showSubtitle: true
      });
    }
  }

  renderRightLinks() {
    const { pathname, openLegalDisclaimerModal } = this.props;
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
            style={ rightLinkStyle }
            key={ index }
            href={ link.externalHref }
          >
            { link.name }
          </a>
        );
      }

      const href = link.href && (editModeOn ? editMode(link.href) : link.href);
      const style = pathname === href ? { ...rightLinkStyle, ...activeLinkStyle } : rightLinkStyle;

      return (
        <Link
          style={ style }
          key={ index }
          to={ href }
          onClick={ link.onClick }>
          { link.name }
        </Link>
      );
    });
  }

  render() {
    const { show, pathname } = this.props;
    const { editModeOn } = this.context;

    if (!show) {
      return null;
    }

    const homeHref = editModeOn ? editMode(ROOT_PATH) : ROOT_PATH;
    const homeLinkStyle = (
      pathname === homeHref ? { ...leftLinkStyle, ...activeLinkStyle } : leftLinkStyle
    );

    const rightLinks = this.renderRightLinks();

    return (
      <ResponsiveFluidWidthComponent style={ outerStyle }>
        <div style={ slimHeaderStyle } className='test--slim-header'>
          <div style={ rightLinksWrapperStyle }>
            { rightLinks }
            <LogOutButtonContainer pathname={ pathname }/>
          </div>

          <Link
            style={ homeLinkStyle }
            to={ editModeOn ? editMode(ROOT_PATH) : ROOT_PATH }
            className='test--header-logo'
          >
            Citizens Police Data Project
          </Link>

          <FadeMotion show={ this.state.showSubtitle }>
            {
              (opacity) => (
                <span style={ { ...subtitleStyle, opacity: opacity } }>
                  collects and publishes
                  <span style={ { whiteSpace: 'nowrap' } }> information about police misconduct in Chicago.</span>
                </span>
              )
            }
          </FadeMotion>
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

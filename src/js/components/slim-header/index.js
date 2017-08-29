import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import { ROOT_PATH, FAQ_PATH, COLLAB_PATH } from 'utils/constants';
import { editMode } from 'utils/edit-path';
import ConfiguredRadium from 'utils/configured-radium';
import PropsStateRerender from 'components/common/higher-order/props-state-rerender';
import LogOutButtonContainer from 'containers/log-out-container';
import {
  slimHeaderStyle,
  leftLinkStyle,
  rightLinkStyle,
  activeLinkStyle,
  rightLinksWrapperStyle,
  outerStyle
} from './slim-header.style';

const links = [
  {
    name: 'Downloads',
    href: '/TODO'
  },
  {
    name: 'Legal Disclaimer',
    href: '/TODO'
  },
  {
    name: 'FAQ',
    href: '/' + FAQ_PATH
  },
  {
    name: 'Glossary',
    href: '/TODO'
  },
  {
    name: 'Collaborate',
    href: '/' + COLLAB_PATH
  },
];

class SlimHeader extends Component {
  render() {
    const { show, pathname } = this.props;
    const { editModeOn } = this.context;

    if (!show) {
      return null;
    }

    const homeHref = editModeOn ? editMode(ROOT_PATH) : ROOT_PATH;
    const homeLinkStyle = (
      window.location.pathname === homeHref ? { ...leftLinkStyle, ...activeLinkStyle } : leftLinkStyle
    );

    const rightLinks = links.map((link, index) => {
      const href = editModeOn ? editMode(link.href) : link.href;
      const style = pathname === href ? { ...rightLinkStyle, ...activeLinkStyle } : rightLinkStyle;

      return (
        <Link
          style={ style }
          key={ index }
          to={ href }>{ link.name }
        </Link>
      );
    });

    return (
      <ResponsiveFixedWidthComponent style={ outerStyle }>
        <div style={ slimHeaderStyle } className='test--slim-header'>
          <Link
            style={ homeLinkStyle }
            to={ editModeOn ? editMode(ROOT_PATH) : ROOT_PATH }
            className='test--header-logo'
          >
            Citizens Police Data Project
          </Link>
          <div style={ rightLinksWrapperStyle }>
            { rightLinks }
            <LogOutButtonContainer pathname={ pathname }/>
          </div>
        </div>
      </ResponsiveFixedWidthComponent>
    );
  }
}

SlimHeader.propTypes = {
  show: PropTypes.bool,
  pathname: PropTypes.string,
};

SlimHeader.defaultProps = {
  show: true
};

SlimHeader.contextTypes = {
  editModeOn: PropTypes.bool
};

export default PropsStateRerender(ConfiguredRadium(SlimHeader));

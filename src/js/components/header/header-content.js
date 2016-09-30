import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import ClosableNavLink from 'components/closable-nav-link';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import { ROOT_PATH, COLLAB_PATH, DATA_PATH, FAQ_PATH, STORIES_PATH } from 'utils/constants';
import {
  navWrapperStyle, navStyle, logoWrapperStyle, logoStyle,
  navWrapperCompactStyle, logoWrapperCompactStyle
} from './header-content.style';
import Link from 'components/common/react-router-link';
import PropsRerender from 'components/common/higher-order/props-rerender';


const links = [
  {
    name: 'Data',
    href: '/' + DATA_PATH
  },
  {
    name: 'Reporting',
    href: '/' + STORIES_PATH
  },
  {
    name: 'FAQ',
    href: '/' + FAQ_PATH
  },
  {
    name: 'Collaborate',
    href: '/' + COLLAB_PATH
  }
];

class HeaderContent extends React.Component {
  goToBasePath() {
    browserHistory.push(ROOT_PATH);
  }

  render() {
    const { compact, pathname } = this.props;
    return (
      <ResponsiveFixedWidthComponent>
        <div style={ compact ? navWrapperCompactStyle : navWrapperStyle }>
          { links.map((link, ind) => (
            <ClosableNavLink
              key={ ind } style={ navStyle } href={ link.href } showCloseBtn={ compact && link.href === pathname }
              onClickClose={ this.goToBasePath }>
              { link.name }
            </ClosableNavLink>
          )) }
        </div>
        <Link to={ ROOT_PATH } style={ compact ? logoWrapperCompactStyle : logoWrapperStyle }>
          <span style={ logoStyle }>CPDP</span>
        </Link>
      </ResponsiveFixedWidthComponent>
    );
  }
}

HeaderContent.propTypes = {
  compact: PropTypes.bool,
  pathname: PropTypes.string
};

export default PropsRerender(HeaderContent);

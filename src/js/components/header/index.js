import React, { PropTypes, Component } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { ROOT_EDIT_REGEX } from 'utils/constants';
import PropsStateRerender from 'components/common/higher-order/props-state-rerender';
import HeaderContent from 'components/header/header-content';
import { spacerStyle } from './header.style';
import CompactHeader from 'components/header/compact-header';


class Header extends Component {
  render() {
    const { pathname, appContent, show } = this.props;
    if (!show) {
      return null;
    }

    const isAtLandingPage = ROOT_EDIT_REGEX.test(appContent);
    return (
      <div>
        { isAtLandingPage ?
          <HeaderContent compact={ false } pathname={ pathname }/> :
          <div style={ spacerStyle }/>
        }
        <CompactHeader pathname={ pathname } show={ !isAtLandingPage }/>
      </div>
    );
  }
}

Header.propTypes = {
  pathname: PropTypes.string,
  show: PropTypes.bool,
  appContent: PropTypes.string
};

Header.defaultProps = {
  show: true
};

export default PropsStateRerender(ConfiguredRadium(Header));

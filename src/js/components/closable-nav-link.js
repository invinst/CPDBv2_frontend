import React, { PropTypes } from 'react';
import Radium from 'radium';

import NavLink from 'components/common/nav-link';
import CloseButton from 'components/common/close-btn';
import { wrapperStyle, closeButtonStyle } from './closable-nav-link.style';


class ClosableNavLink extends React.Component {
  renderCloseButton() {
    const { showCloseBtn, onClickClose } = this.props;
    if (showCloseBtn) {
      return <CloseButton style={ closeButtonStyle } onClick={ onClickClose }/>;
    }
    return null;
  }

  render() {
    return (
      <div style={ [wrapperStyle, this.props.style] }>
        <NavLink href={ this.props.href }>
          { this.props.children }
        </NavLink>
        { this.renderCloseButton() }
      </div>
    );
  }
}

ClosableNavLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  style: PropTypes.object,
  showCloseBtn: PropTypes.bool,
  onClickClose: PropTypes.func
};

export default Radium(ClosableNavLink);

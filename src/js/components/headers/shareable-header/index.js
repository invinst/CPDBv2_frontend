import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as constants from 'utils/constants';
import HeaderButton from 'components/headers/shareable-header/header-button';
import LinkHeaderButton from 'components/headers/shareable-header/link-header-button';
import { calculatePosition } from 'utils/dom';
import styles from './shareable-header.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';
import BreadcrumbContainer from 'containers/breadcrumb';


export default class ShareableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'top',
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.closeShareMenu);
    addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeShareMenu);
    removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const newPosition = calculatePosition();
    if (newPosition !== this.state.position) {
      this.setState({ position: newPosition });
    }
    this.props.updateShareablePageScrollPosition(this.state.position);
  };

  headerButton() {
    const { buttonType, onOpen, onClose, Menu, buttonText, to } = this.props;
    switch (buttonType) {
      case constants.SHAREABLE_HEADER_BUTTON_TYPE.MENU: {
        const { position } = this.state;
        return (
          <HeaderButton
            scrollPosition={ position }
            Menu={ Menu }
            buttonText={ buttonText }
            onOpen={ onOpen }
            onClose={ onClose }
          />
        );
      }
      case constants.SHAREABLE_HEADER_BUTTON_TYPE.LINK:
        return <LinkHeaderButton buttonText={ buttonText } to={ to } />;
      case constants.SHAREABLE_HEADER_BUTTON_TYPE.NONE:
      default:
        return null;
    }
  }

  render() {
    const { customButtons } = this.props;

    return (
      <div className={ `${styles.shareableHeader} no-print` }>
        <div className='shareable-header-header-placeholder'/>
        <div className='shareable-header-outer'>
          <div className={ responsiveContainerStyles.responsiveContainer }>
            <div
              className='shareable-header-nav-bar'
              ref={ el => { this.placeholderElement = el; } }
            >
              { this.headerButton() }
              { customButtons }
              <BreadcrumbContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShareableHeader.propTypes = {
  closeShareMenu: PropTypes.func,
  openShareMenu: PropTypes.func,
  shareMenuIsOpen: PropTypes.bool,
  updateShareablePageScrollPosition: PropTypes.func,
  Menu: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  buttonText: PropTypes.string,
  hasHeaderButton: PropTypes.bool,
  buttonType: PropTypes.string,
  to: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  customButtons: PropTypes.element,
};

ShareableHeader.defaultProps = {
  hasHeaderButton: true,
  buttonType: constants.SHAREABLE_HEADER_BUTTON_TYPE.NONE,
  onOpen: () => {},
  onClose: () => {},
};

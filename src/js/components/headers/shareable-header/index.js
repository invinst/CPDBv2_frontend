import React, { Component, PropTypes } from 'react';
import Breadcrumbs from 'redux-breadcrumb-trail';

import * as constants from 'utils/constants';
import BreadcrumbsItemRendererContainer from 'containers/headers/shareable-header/breadcrumbs-item-renderer-container';
import HeaderButton from 'components/headers/shareable-header/header-button';
import LinkHeaderButton from 'components/headers/shareable-header/link-header-button';
import { calculatePosition } from 'utils/dom';
import styles from './shareable-header.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';

const getHeaderButton = (type, state, props) => {
  switch (type) {
    case constants.SHAREABLE_HEADER_BUTTON_TYPE.MENU: {
      const { onOpen, onClose, Menu, buttonText } = props;
      const { position } = state;
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
      return <LinkHeaderButton buttonText={ props.buttonText } to={ props.to } />;
    case constants.SHAREABLE_HEADER_BUTTON_TYPE.NONE:
    default:
      return null;
  }
};

export default class ShareableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'top',
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.closeShareMenu);
    addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeShareMenu);
    removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const newPosition = calculatePosition();
    if (newPosition !== this.state.position) {
      this.setState({ position: newPosition });
    }
    this.props.updateShareablePageScrollPosition(this.state.position);
  }

  render() {
    const { location, routes, params, buttonType } = this.props;

    const separatorRenderer = <li className='shareable-header-breadcrumb-separator'/>;

    return (
      <div className={ `${styles.shareableHeader} no-print` }>
        <div className='shareable-header-header-placeholder'/>
        <div className='shareable-header-outer'>
          <div className={ responsiveContainerStyles.responsiveContainer }>
            <div
              className='shareable-header-nav-bar'
              ref={ el => { this.placeholderElement = el; } }
            >
              {
                getHeaderButton(buttonType, this.state, this.props)
              }
              <Breadcrumbs
                className='breadcrumbs'
                routes={ routes }
                params={ params }
                location={ location }
                separatorRenderer={ separatorRenderer }
                itemRenderer={ BreadcrumbsItemRendererContainer }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShareableHeader.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
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
};

ShareableHeader.defaultProps = {
  params: {},
  location: {
    pathname: '',
  },
  routes: [],
  hasHeaderButton: true,
  buttonType: constants.SHAREABLE_HEADER_BUTTON_TYPE.NONE,
  onOpen: () => {},
  onClose: () => {},
};

import React, { Component, PropTypes } from 'react';
import Breadcrumbs from 'redux-breadcrumb-trail';

import * as constants from 'utils/constants';
import BreadcrumbsItemRendererContainer from 'containers/headers/shareable-header/breadcrumbs-item-renderer-container';
import HeaderButton from 'components/headers/shareable-header/header-button';
import LinkHeaderButton from 'components/headers/shareable-header/link-header-button';
import { calculatePosition } from 'utils/dom';
import styles from './shareable-header.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';


export default class ShareableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'top'
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
    const { location, routes, params, Menu, buttonText, buttonType, link } = this.props;

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
                buttonType === constants.SHAREABLE_HEADER_BUTTON_TYPE.MENU ?
                  <HeaderButton scrollPosition={ this.state.position } Menu={ Menu } buttonText={ buttonText }/>
                  :
                buttonType === constants.SHAREABLE_HEADER_BUTTON_TYPE.LINK ?
                  <LinkHeaderButton buttonText={ buttonText } link={ link } />
                  :
                null
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
  link: PropTypes.string,
};

ShareableHeader.defaultProps = {
  params: {},
  location: {
    pathname: ''
  },
  routes: [],
  hasHeaderButton: true,
  buttonType: constants.SHAREABLE_HEADER_BUTTON_TYPE.MENU,
};

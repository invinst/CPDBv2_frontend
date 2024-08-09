import React, { Component } from 'react';
import cx from 'classnames';
import config from 'config';
// import { Link } from 'react-router-dom';

import { QA_LINK } from 'utils/constants';
import { pushPathPreserveEditMode } from 'utils/edit-path';
// import styles from './header.sass';
// import responsiveContainerStyles from 'components/common/responsive-container.sass';
import { trackOutboundLink } from 'utils/tracking';

const MENU_ITEMS = [
  {
    name: 'Data',
    url: config.v1Url,
  },
  {
    name: 'Q&A',
    url: QA_LINK,
  },
  {
    name: 'Documents',
    to: '/documents/',
  },
  {
    name: 'Pinboards',
  },
];


export default class Header extends Component {
  handleItemClick(e, item) {
    e.preventDefault();
    if (item.to) {
      pushPathPreserveEditMode(item.to);
    } else if (item.url) {
      trackOutboundLink(item.url);
    }
  }

  renderRightMenu() {
    const items = MENU_ITEMS.map((item) => (
      <div
        key={ item.name }
        className={ cx('menu-item', { 'highlight': item.name === 'Pinboards' }) }
        onClick={ e => this.handleItemClick(e, item) }
      >
        { item.name }
      </div>
    ));

    return (
      <div className='right-menu'>
        { items }
      </div>
    );
  }

  render() {
    return (null);
    // (
    //   <div className={ styles.wrapper } >
    //     <div className={ cx(responsiveContainerStyles.responsiveContainer, 'inner-wrapper') }>
    //       <div className='header-parent'>
    //         <Link className='header-title' to='/'>
    //           cpdp
    //         </Link>
    //         { this.renderRightMenu() }
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}
